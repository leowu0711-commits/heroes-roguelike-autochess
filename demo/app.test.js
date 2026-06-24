import assert from "node:assert/strict";
import test from "node:test";

import {
  getBattleSecondsRemaining,
  getHeroSynergyTags,
  getInterestGold,
  resolveRoundIncome,
  getSellValue,
  mergeRosterCopies,
  moveBoardHeroToBench,
  moveShopHeroToBench,
  shouldAutoStartBattle,
  settleHp,
} from "./app.js";

test("merges three matching heroes across board and bench", () => {
  const roster = mergeRosterCopies({
    board: [{ id: "jing-ke", star: 1 }],
    bench: [{ id: "jing-ke", star: 1 }, { id: "jing-ke", star: 1 }],
  });

  assert.deepEqual(roster.board, [{ id: "jing-ke", star: 2 }]);
  assert.deepEqual(roster.bench, []);
});

test("allows unfielding into a full bench when it immediately creates a three star", () => {
  const roster = moveBoardHeroToBench({
    board: [{ id: "jing-ke", star: 2 }],
    bench: [
      { id: "jing-ke", star: 2 },
      { id: "jing-ke", star: 2 },
      { id: "zhang-liang", star: 1 },
      { id: "qin-qiong", star: 1 },
      { id: "yang-yuhuan", star: 1 },
      { id: "bao-zheng", star: 1 },
      { id: "xin-qiji", star: 1 },
      { id: "daji", star: 1 },
    ],
  }, 0);

  assert.deepEqual(roster.board, []);
  assert.ok(roster.bench.some((owned) => owned.id === "jing-ke" && owned.star === 3));
  assert.equal(roster.bench.length, 7);
});

test("allows buying into a full bench when it immediately creates a two star", () => {
  const roster = moveShopHeroToBench({
    bench: [
      { id: "jing-ke", star: 1 },
      { id: "jing-ke", star: 1 },
      { id: "zhang-liang", star: 1 },
      { id: "qin-qiong", star: 1 },
      { id: "yang-yuhuan", star: 1 },
      { id: "bao-zheng", star: 1 },
      { id: "xin-qiji", star: 1 },
      { id: "daji", star: 1 },
    ],
    board: [],
  }, { id: "jing-ke", star: 1 });

  assert.ok(roster.bench.some((owned) => owned.id === "jing-ke" && owned.star === 2));
  assert.equal(roster.bench.length, 7);
});

test("sells upgraded heroes for the value of their copies", () => {
  assert.equal(getSellValue({ id: "jing-ke", star: 1 }), 1);
  assert.equal(getSellValue({ id: "jing-ke", star: 2 }), 3);
  assert.equal(getSellValue({ id: "jing-ke", star: 3 }), 9);
  assert.equal(getSellValue({ id: "guan-yu", star: 2 }), 9);
});

test("caps interest at four gold", () => {
  assert.equal(getInterestGold(9), 0);
  assert.equal(getInterestGold(10), 1);
  assert.equal(getInterestGold(39), 3);
  assert.equal(getInterestGold(45), 4);
});

test("pays base gold, streak gold, and interest even on a loss", () => {
  assert.deepEqual(resolveRoundIncome({
    won: false,
    goldBeforeIncome: 29,
    previousStreak: { type: "loss", count: 3 },
    creepGold: 0,
    relicGold: 0,
  }), {
    baseGold: 5,
    creepGold: 0,
    streakGold: 2,
    interest: 3,
    relicGold: 0,
    total: 10,
    nextStreak: { type: "loss", count: 4 },
  });
});

test("resets streak direction when result changes", () => {
  const income = resolveRoundIncome({
    won: true,
    goldBeforeIncome: 8,
    previousStreak: { type: "loss", count: 4 },
    creepGold: 2,
    relicGold: 1,
  });

  assert.equal(income.streakGold, 0);
  assert.deepEqual(income.nextStreak, { type: "win", count: 1 });
  assert.equal(income.total, 9);
});

test("ends the game when hp reaches zero", () => {
  assert.deepEqual(settleHp(3, 5), { hp: 0, gameOver: true });
  assert.deepEqual(settleHp(8, 3), { hp: 5, gameOver: false });
});

test("counts battle seconds down from thirty", () => {
  assert.equal(getBattleSecondsRemaining(30000, 0), 30);
  assert.equal(getBattleSecondsRemaining(30000, 1200), 29);
  assert.equal(getBattleSecondsRemaining(30000, 30000), 0);
  assert.equal(getBattleSecondsRemaining(30000, 35000), 0);
});

test("auto-starts battle when preparation timer reaches zero and board is not empty", () => {
  assert.equal(shouldAutoStartBattle({
    gameOver: false,
    isBattling: false,
    hasResult: false,
    prepRemaining: 0,
    boardCount: 1,
  }), true);
  assert.equal(shouldAutoStartBattle({
    gameOver: false,
    isBattling: false,
    hasResult: false,
    prepRemaining: 0,
    boardCount: 0,
  }), false);
});

test("shows a hero race and job synergy progress", () => {
  const tags = getHeroSynergyTags(
    { race: "三国", job: "武将" },
    [
      { race: "三国", job: "武将" },
      { race: "盛唐", job: "武将" },
    ],
  );

  assert.deepEqual(tags.map((tag) => ({
    name: tag.name,
    count: tag.count,
    threshold: tag.threshold,
    active: tag.active,
  })), [
    { name: "三国", count: 1, threshold: 2, active: false },
    { name: "武将", count: 2, threshold: 2, active: true },
  ]);
});

test("does not count duplicate copies of the same hero twice for synergies", () => {
  const tags = getHeroSynergyTags(
    { race: "三国", job: "武将" },
    [
      { id: "guan-yu", race: "三国", job: "武将" },
      { id: "guan-yu", race: "三国", job: "武将" },
      { id: "cao-cao", race: "三国", job: "帝王" },
    ],
  );

  assert.equal(tags.find((tag) => tag.name === "三国").count, 2);
});
