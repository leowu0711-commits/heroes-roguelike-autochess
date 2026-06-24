import assert from "node:assert/strict";
import test from "node:test";

import {
  getPlayableHeroes,
  getSynergyCatalog,
  getSynergyDefinitions,
  groupHeroesByCost,
  getHeroSynergyTags,
  getBattleOutcomeTitle,
  getTraitTone,
  getInterestGold,
  getXpNeededForLevel,
  buildScoreBursts,
  getOwnedHeroCount,
  getSynergyBadges,
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

  assert.deepEqual(definitions["秦汉"].tiers.map((tier) => tier.count), [3, 6, 8]);
  assert.deepEqual(definitions["三国"].tiers.map((tier) => tier.count), [3, 6, 9]);
  assert.deepEqual(definitions["妖族"].tiers.map((tier) => tier.count), [1, 2]);
  assert.deepEqual(definitions["帝王"].tiers.map((tier) => tier.count), [2, 4]);
  assert.deepEqual(definitions["刺客"].tiers.map((tier) => tier.count), [3, 6]);
});

test("exposes all synergy effects for the compendium", () => {
  const catalog = getSynergyCatalog();

  assert.equal(catalog.filter((item) => item.kind === "种族").length, 13);
  assert.equal(catalog.filter((item) => item.kind === "职业").length, 10);
  assert.deepEqual(catalog.find((item) => item.name === "秦汉").tiers.map((tier) => tier.count), [3, 6, 8]);
  assert.equal(catalog.find((item) => item.name === "三国").tiers[2].text.includes("连携"), true);
});

test("uses the auto chess population experience curve", () => {
  assert.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9].map(getXpNeededForLevel), [1, 1, 2, 4, 24, 16, 40, 56, 64]);
});

test("counts owned copies across board and bench for shop chase highlights", () => {
  assert.equal(getOwnedHeroCount("jing-ke", [
    { id: "jing-ke", star: 1 },
    { id: "guan-yu", star: 2 },
  ], [
    { id: "jing-ke", star: 2 },
  ]), 4);
});

test("summarizes current synergies as compact badges", () => {
  const badges = getSynergyBadges([
    { name: "刺客", count: 4, threshold: 3, active: true, bonus: 0.18, text: "one" },
    { name: "刺客", count: 4, threshold: 6, active: false, bonus: 0.42, text: "two" },
    { name: "三国", count: 2, threshold: 3, active: false, bonus: 0.15, text: "three" },
  ]);

  assert.deepEqual(badges.map((badge) => ({
    name: badge.name,
    count: badge.count,
    active: badge.active,
    label: badge.label,
  })), [
    { name: "刺客", count: 4, active: true, label: "4/6" },
    { name: "三国", count: 2, active: false, label: "2/3" },
  ]);
});

test("every displayed synergy tier is reachable by real unique heroes", () => {
  const heroes = getPlayableHeroes();
  const counts = getSynergyCatalog().map((item) => ({
    name: item.name,
    maxTier: item.tiers.at(-1).count,
    heroCount: heroes.filter((hero) => hero.race === item.name || hero.job === item.name).length,
  }));

  assert.deepEqual(counts.filter((item) => item.heroCount < item.maxTier), []);
  assert.equal(counts.find((item) => item.name === "刺客").heroCount, 6);
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

test("sells heroes for half of their copy value with a one gold floor", () => {
  assert.equal(getSellValue({ id: "jing-ke", star: 1 }), 1);
  assert.equal(getSellValue({ id: "huo-qubing", star: 1 }), 1);
  assert.equal(getSellValue({ id: "guan-yu", star: 1 }), 1);
  assert.equal(getSellValue({ id: "wu-zetian", star: 1 }), 2);
  assert.equal(getSellValue({ id: "jing-ke", star: 2 }), 1);
  assert.equal(getSellValue({ id: "jing-ke", star: 3 }), 4);
  assert.equal(getSellValue({ id: "guan-yu", star: 2 }), 4);
});

test("caps interest at four gold", () => {
  assert.equal(getInterestGold(9), 0);
  assert.equal(getInterestGold(10), 1);
  assert.equal(getInterestGold(39), 3);
  assert.equal(getInterestGold(45), 4);
  assert.equal(getInterestGold(50), 4);
  assert.equal(getInterestGold(70), 4);
});

test("builds staged score bursts for fielded heroes", () => {
  const bursts = buildScoreBursts([
    { id: "jing-ke", star: 1 },
    { id: "guan-yu", star: 2 },
  ], 1);

  assert.equal(bursts.length, 2);
  assert.deepEqual(bursts.map((burst) => burst.heroName), ["荆轲", "关羽"]);
  assert.deepEqual(bursts.map((burst) => burst.slotIndex), [0, 1]);
  assert.equal(bursts[0].runningTotal, bursts[0].amount);
  assert.equal(bursts[1].runningTotal, bursts[0].amount + bursts[1].amount);
  assert.equal(bursts.every((burst) => burst.amount > 0), true);
});

test("pays staged base gold, loss streak, and interest on a loss", () => {
  assert.deepEqual(resolveRoundIncome({
    stage: 4,
    won: false,
    goldBeforeIncome: 29,
    previousStreak: { type: "loss", count: 3 },
    creepGold: 0,
    relicGold: 0,
  }), {
    baseGold: 4,
    creepGold: 0,
    winGold: 0,
    streakGold: 2,
    interest: 3,
    relicGold: 0,
    total: 9,
    nextStreak: { type: "loss", count: 4 },
  });
});

test("pays normal win gold and resets streak direction when result changes", () => {
  const income = resolveRoundIncome({
    stage: 6,
    won: true,
    goldBeforeIncome: 8,
    previousStreak: { type: "loss", count: 4 },
    creepGold: 2,
    relicGold: 1,
  });

  assert.equal(income.streakGold, 0);
  assert.equal(income.winGold, 1);
  assert.deepEqual(income.nextStreak, { type: "win", count: 1 });
  assert.equal(income.total, 10);
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
