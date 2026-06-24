import assert from "node:assert/strict";
import test from "node:test";

import {
  getPlayableHeroes,
  getSynergyDefinitions,
  groupHeroesByCost,
  getHeroSynergyTags,
  getBattleOutcomeTitle,
  getTraitTone,
  getInterestGold,
  resolveRoundIncome,
  getSellValue,
  mergeRosterCopies,
  moveBoardHeroToBench,
  moveShopHeroToBench,
  shouldRollWildcard,
  settleHp,
} from "./app.js";

test("uses the expanded 52 hero roster with thirteen races and ten jobs", () => {
  const heroes = getPlayableHeroes();
  const races = new Set(heroes.map((hero) => hero.race));
  const jobs = new Set(heroes.map((hero) => hero.job));
  const costs = Object.fromEntries([1, 2, 3, 4, 5].map((cost) => [
    cost,
    heroes.filter((hero) => hero.cost === cost).length,
  ]));

  assert.equal(heroes.length, 52);
  assert.equal(races.size, 13);
  assert.equal(jobs.size, 10);
  assert.deepEqual(costs, { 1: 14, 2: 13, 3: 11, 4: 8, 5: 6 });
});

test("uses varied synergy tiers instead of one shared threshold ladder", () => {
  const definitions = getSynergyDefinitions();

  assert.deepEqual(definitions["秦汉"].tiers.map((tier) => tier.count), [3, 6, 9]);
  assert.deepEqual(definitions["三国"].tiers.map((tier) => tier.count), [3, 6, 9]);
  assert.deepEqual(definitions["妖族"].tiers.map((tier) => tier.count), [1, 2, 4]);
  assert.deepEqual(definitions["帝王"].tiers.map((tier) => tier.count), [2, 4]);
  assert.deepEqual(definitions["刺客"].tiers.map((tier) => tier.count), [3, 6]);
});

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

test("merges three one-star wildcard pieces into one two-star wildcard", () => {
  const roster = mergeRosterCopies({
    board: [],
    bench: [
      { id: "wildcard", star: 1 },
      { id: "wildcard", star: 1 },
      { id: "wildcard", star: 1 },
    ],
  });

  assert.deepEqual(roster.bench, [{ id: "wildcard", star: 2 }]);
});

test("uses a two-star wildcard with two matching two-star heroes to make a three-star hero", () => {
  const roster = mergeRosterCopies({
    board: [{ id: "guan-yu", star: 2 }],
    bench: [
      { id: "guan-yu", star: 2 },
      { id: "wildcard", star: 2 },
    ],
  });

  assert.deepEqual(roster.board, [{ id: "guan-yu", star: 3 }]);
  assert.deepEqual(roster.bench, []);
});

test("rolls wildcard shop appearance at one percent per refresh", () => {
  assert.equal(shouldRollWildcard(0), true);
  assert.equal(shouldRollWildcard(0.0099), true);
  assert.equal(shouldRollWildcard(0.01), false);
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

test("labels instant battle outcomes clearly", () => {
  assert.equal(getBattleOutcomeTitle(true), "胜利");
  assert.equal(getBattleOutcomeTitle(false), "失败");
});

test("groups heroes by cost for the compendium", () => {
  const groups = groupHeroesByCost([
    { name: "甲", cost: 2 },
    { name: "乙", cost: 1 },
    { name: "丙", cost: 2 },
  ]);

  assert.deepEqual(groups, [
    { cost: 1, heroes: [{ name: "乙", cost: 1 }] },
    { cost: 2, heroes: [{ name: "甲", cost: 2 }, { name: "丙", cost: 2 }] },
  ]);
});

test("uses race and job colors for hero trait tags", () => {
  assert.equal(getTraitTone("神话", "race"), "#6d5794");
  assert.equal(getTraitTone("刺客", "job"), "#8f5fcb");
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
    { name: "三国", count: 1, threshold: 3, active: false },
    { name: "武将", count: 2, threshold: 3, active: false },
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
