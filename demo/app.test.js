import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  getPlayableHeroes,
  getSynergyCatalog,
  getSynergyDefinitions,
  getSynergyMultiplier,
  calculateBoardScore,
  groupHeroesByCost,
  groupHeroesForCompendium,
  heroMatchesTraitFilter,
  getHeroSynergyTags,
  getBattleOutcomeTitle,
  getTraitTone,
  getCostRarity,
  getInterestGold,
  getStageStartGold,
  getXpNeededForLevel,
  buildScoreBursts,
  buildScoreComboSteps,
  getBattleRevealDelayMs,
  createRewardChoices,
  getStageRewards,
  getOwnedHeroCount,
  getSynergyBadges,
  buildRosterFeedbackEvents,
  getRollableShopHeroes,
  resolveRoundIncome,
  getSellValue,
  applyShopBuyState,
  mergeRosterCopies,
  moveBoardHeroToBench,
  moveShopHeroToBench,
  shouldRollWildcard,
  settleHp,
} from "./app.js";

test("does not leak malformed html fragments into rendered UI templates", () => {
  const source = readFileSync(new URL("./app.js", import.meta.url), "utf8");

  assert.doesNotMatch(source, /\?\/(?:span|div|button|strong|h4)>/);
  assert.doesNotMatch(source, /閲\?\//);
});

test("renders a readable score chain panel for battle settlement", () => {
  const source = readFileSync(new URL("./app.js", import.meta.url), "utf8");

  assert.match(source, /score-chain/);
  assert.match(source, /score-chain-row/);
  assert.match(source, /runningTotal/);
});

test("uses the expanded 62 hero roster with thirteen races and ten jobs", () => {
  const heroes = getPlayableHeroes();
  const races = new Set(heroes.map((hero) => hero.race));
  const jobs = new Set(heroes.map((hero) => hero.job));
  const costs = Object.fromEntries([1, 2, 3, 4, 5].map((cost) => [
    cost,
    heroes.filter((hero) => hero.cost === cost).length,
  ]));

  assert.equal(heroes.length, 62);
  assert.equal(races.size, 13);
  assert.equal(jobs.size, 10);
  assert.deepEqual(costs, { 1: 14, 2: 17, 3: 13, 4: 7, 5: 11 });
});

test("uses clearer two-character dynasty race names", () => {
  const raceNames = new Set(getPlayableHeroes().map((hero) => hero.race));

  assert.equal(raceNames.has("春秋"), true);
  assert.equal(raceNames.has("西楚"), true);
  assert.equal(raceNames.has("大唐"), true);
  assert.equal(raceNames.has("大隋"), true);
  assert.equal(raceNames.has("\u5148\u79e6"), false);
  assert.equal(raceNames.has("\u695a\u6c49"), false);
  assert.equal(raceNames.has("\u76db\u5510"), false);
  assert.equal(raceNames.has("\u968b\u5510"), false);
});

test("supports low-population reroll cores with one and two cost heroes", () => {
  const lowCostHeroes = getPlayableHeroes().filter((hero) => hero.cost <= 2);

  assert.equal(lowCostHeroes.filter((hero) => hero.race === "秦汉").length, 6);
  assert.ok(lowCostHeroes.filter((hero) => hero.race === "秦汉" && hero.job === "文臣").length >= 3);

  assert.ok(lowCostHeroes.filter((hero) => hero.race === "春秋").length >= 4);
  assert.equal(lowCostHeroes.filter((hero) => hero.race === "春秋" && hero.job === "工匠").length, 2);

  assert.equal(lowCostHeroes.filter((hero) => hero.race === "大唐").length, 5);
  assert.ok(lowCostHeroes.filter((hero) => hero.race === "大唐" && ["刺客", "射手"].includes(hero.job)).length >= 2);
  assert.ok(lowCostHeroes.filter((hero) => hero.job === "刺客").length >= 4);
});

test("makes six tang reachable without a five-piece tier", () => {
  const tangHeroes = getPlayableHeroes().filter((hero) => hero.race === "大唐");

  assert.equal(tangHeroes.length >= 6, true);
  assert.deepEqual(getSynergyDefinitions()["大唐"].tiers.map((tier) => tier.count), [2, 4, 6]);
});

test("gives nine sanguo a three-wenchen and two-emperor profession core", () => {
  const sanguo = getPlayableHeroes().filter((hero) => hero.race === "三国");

  assert.equal(sanguo.length, 10);
  assert.equal(sanguo.filter((hero) => hero.job === "文臣").length, 3);
  assert.equal(sanguo.filter((hero) => hero.job === "帝王").length, 2);
  assert.equal(sanguo.some((hero) => hero.name === "荀彧" && hero.job === "文臣"), true);
  assert.equal(sanguo.some((hero) => hero.name === "周瑜" && hero.job === "方士"), true);
});

test("keeps mingqing as a two-piece shooter support race", () => {
  const mingqing = getPlayableHeroes().filter((hero) => hero.race === "明清");
  const tiers = getSynergyDefinitions()["明清"].tiers;

  assert.equal(mingqing.length, 2);
  assert.deepEqual(tiers.map((tier) => tier.count), [2]);
  assert.equal(mingqing.every((hero) => hero.job === "射手"), true);
  assert.equal(mingqing.some((hero) => hero.cost <= 2), true);
  assert.equal(mingqing.some((hero) => hero.cost === 5 && hero.name === "郑和"), true);
  assert.match(tiers[0].text, /射手|连击|矮人/);
});

test("uses dynasty-appropriate replacements outside the mingqing shooter package", () => {
  const heroes = getPlayableHeroes();

  assert.equal(heroes.some((hero) => hero.name === "谢安" && hero.race === "魏晋" && hero.job === "文臣"), true);
  assert.equal(heroes.some((hero) => hero.name === "狄青" && hero.race === "大宋" && hero.job === "步兵"), true);
  assert.equal(heroes.some((hero) => ["刘伯温", "戚继光"].includes(hero.name) && hero.race !== "明清"), false);
});

test("keeps five cost heroes as high-population finishers instead of reroll cores", () => {
  const fiveCostHeroes = getPlayableHeroes().filter((hero) => hero.cost === 5);
  const jobsWithFiveCost = new Set(fiveCostHeroes.map((hero) => hero.job));

  assert.equal(fiveCostHeroes.length, 11);
  for (const job of Object.keys(getSynergyDefinitions()).filter((name) => getSynergyDefinitions()[name].kind === "职业")) {
    if (job === "异士") continue;
    assert.equal(jobsWithFiveCost.has(job), true, `${job} should have a five-cost finisher`);
  }
  assert.equal(jobsWithFiveCost.has("异士"), false);
  assert.equal(fiveCostHeroes.some((hero) => hero.race === "神话"), true);
  assert.equal(fiveCostHeroes.some((hero) => hero.race === "明清"), true);
});

test("keeps yishi as a low and mid-cost utility profession without a five-cost finisher", () => {
  const yishi = getPlayableHeroes().filter((hero) => hero.job === "异士");

  assert.deepEqual(yishi.map((hero) => hero.cost).sort((a, b) => a - b), [1, 1, 2, 3]);
  assert.equal(yishi.some((hero) => hero.name === "鬼谷子" && hero.race === "春秋"), true);
  assert.equal(yishi.some((hero) => hero.name === "嵇康" && hero.cost === 3), true);
  assert.equal(yishi.some((hero) => hero.cost === 5), false);
});

test("uses varied synergy tiers instead of one shared threshold ladder", () => {
  const definitions = getSynergyDefinitions();

  assert.deepEqual(definitions["秦汉"].tiers.map((tier) => tier.count), [3, 6]);
  assert.deepEqual(definitions["三国"].tiers.map((tier) => tier.count), [3, 6, 9]);
  assert.deepEqual(definitions["大唐"].tiers.map((tier) => tier.count), [2, 4, 6]);
  assert.deepEqual(definitions["妖族"].tiers.map((tier) => tier.count), [1, 2]);
  assert.deepEqual(definitions["帝王"].tiers.map((tier) => tier.count), [2, 4]);
  assert.deepEqual(definitions["刺客"].tiers.map((tier) => tier.count), [3, 6]);
});

test("exposes all synergy effects for the compendium", () => {
  const catalog = getSynergyCatalog();

  assert.equal(catalog.filter((item) => item.kind === "种族").length, 13);
  assert.equal(catalog.filter((item) => item.kind === "职业").length, 10);
  assert.deepEqual(catalog.find((item) => item.name === "秦汉").tiers.map((tier) => tier.count), [3, 6]);
  assert.equal(catalog.find((item) => item.name === "三国").tiers[2].text.includes("连携"), true);
});

test("separates strategist, mana engine, and physical multiplier identities", () => {
  const definitions = getSynergyDefinitions();
  const textOf = (name) => definitions[name].tiers.map((tier) => tier.text).join(" ");

  assert.match(textOf("秦汉"), /破阵|易伤|军势/);
  assert.doesNotMatch(textOf("秦汉"), /文臣|回蓝/);

  assert.match(textOf("文臣"), /复制|计策|结算/);
  assert.doesNotMatch(textOf("文臣"), /回蓝|返还法力/);

  assert.match(textOf("仙门"), /法力|连续施法|返还法力/);
  assert.match(textOf("三国"), /协同|连携|复制/);
});

test("defines infantry as a star baseline engine and cavalry as charge burst", () => {
  const definitions = getSynergyDefinitions();
  const textOf = (name) => definitions[name].tiers.map((tier) => tier.text).join(" ");

  assert.match(textOf("步兵"), /基础分|三星|阵线/);
  assert.doesNotMatch(textOf("步兵"), /后排|护阵/);

  assert.match(textOf("骑兵"), /冲锋|开局|再结算/);
  assert.doesNotMatch(textOf("骑兵"), /攻速|防御/);
});

test("gives major build paths readable multiplier hooks", () => {
  const definitions = getSynergyDefinitions();
  const textOf = (name) => definitions[name].tiers.map((tier) => tier.text).join(" ");

  for (const name of ["大唐", "刺客", "春秋", "工匠", "神话", "方士", "帝王"]) {
    assert.match(textOf(name), /×|倍率|最终|乘算/);
  }
});

test("multiplies every active synergy tier instead of adding them", () => {
  const multiplier = getSynergyMultiplier([
    { active: true, bonus: 0.25 },
    { active: true, bonus: 0.75 },
    { active: false, bonus: 9 },
    { active: true, bonus: 1 },
  ]);

  assert.equal(multiplier, 1.25 * 1.75 * 2);
});

test("sets reroll assassin tang core near the 9-population power target", () => {
  const definitions = getSynergyDefinitions();
  const rows = [
    ...definitions["大唐"].tiers,
    ...definitions["刺客"].tiers,
  ].map((tier) => ({ active: true, bonus: tier.bonus }));
  const multiplier = getSynergyMultiplier(rows);

  assert.ok(multiplier >= 14);
  assert.ok(multiplier <= 16);
});

test("lets reroll assassin tang three-star boards create late exponential scoring", () => {
  const board = [
    { id: "jing-ke", star: 3 },
    { id: "diaochan", star: 3 },
    { id: "li-bai", star: 3 },
    { id: "nezha", star: 3 },
    { id: "sun-wukong", star: 3 },
    { id: "jiuweihu", star: 3 },
    { id: "qin-qiong", star: 2 },
    { id: "xue-rengui", star: 2 },
    { id: "li-shimin", star: 2 },
  ];

  const result = calculateBoardScore({ board, playerHp: 100, equipmentCount: 0 });

  assert.ok(result.score >= 10_000_000);
  assert.ok(result.steps.filter((step) => step.kind === "multiplier").length >= 8);
  assert.ok(result.steps.some((step) => step.title.includes("大唐") && step.title.includes("追击")));
  assert.ok(result.steps.some((step) => step.title.includes("刺客") && step.title.includes("暴击")));
});

test("keeps three assassin plus four tang from triggering explosive chains", () => {
  const board = [
    { id: "qin-qiong", star: 3 },
    { id: "jing-ke", star: 3 },
    { id: "nezha", star: 3 },
    { id: "li-bai", star: 3 },
    { id: "li-shimin", star: 3 },
    { id: "xue-rengui", star: 2 },
    { id: "bao-zheng", star: 2 },
    { id: "zhang-liang", star: 2 },
  ];

  const result = calculateBoardScore({ board, playerHp: 100, equipmentCount: 0 });

  assert.ok(result.score < 250_000);
  assert.equal(result.steps.some((step) => step.title.includes("全队暴击")), false);
  assert.equal(result.steps.some((step) => step.title.includes("三星暴击")), false);
});

test("makes six assassin a global crit rule instead of assassin-only bonus", () => {
  const board = [
    { id: "jing-ke", star: 2 },
    { id: "diaochan", star: 2 },
    { id: "li-bai", star: 2 },
    { id: "nezha", star: 2 },
    { id: "sun-wukong", star: 2 },
    { id: "jiuweihu", star: 2 },
    { id: "qin-qiong", star: 2 },
  ];

  const result = calculateBoardScore({ board, playerHp: 100, equipmentCount: 0 });

  assert.ok(result.steps.some((step) => step.heroId === "qin-qiong" && step.title.includes("全队暴击")));
});

test("lets wenchen copy the strongest physical output event as a neutral support", () => {
  const result = calculateBoardScore({
    board: [
      { id: "guan-yu", star: 2 },
      { id: "zhang-liang", star: 1 },
      { id: "xiao-he", star: 1 },
    ],
    playerHp: 100,
    equipmentCount: 0,
  });
  const copyStep = result.steps.find((step) => step.title.includes("文臣") && step.title.includes("复制"));

  assert.ok(copyStep);
  assert.equal(copyStep.kind, "copy");
  assert.equal(copyStep.heroId, "guan-yu");
  assert.match(copyStep.detail, /物理/);
  assert.ok(result.score > calculateBoardScore({
    board: [{ id: "guan-yu", star: 2 }],
    playerHp: 100,
    equipmentCount: 0,
  }).score);
});

test("lets qinhan stack vulnerability as a physical support race", () => {
  const result = calculateBoardScore({
    board: [
      { id: "jing-ke", star: 3 },
      { id: "li-guang", star: 3 },
      { id: "huo-qubing", star: 3 },
      { id: "han-xin", star: 3 },
      { id: "zhang-liang", star: 3 },
      { id: "xiao-he", star: 3 },
    ],
    playerHp: 100,
    equipmentCount: 0,
  });
  const qinhanStep = result.steps.find((step) => step.title.includes("秦汉") && step.title.includes("易伤"));

  assert.ok(qinhanStep);
  assert.equal(qinhanStep.kind, "multiplier");
  assert.match(qinhanStep.detail, /12层/);
  assert.ok(qinhanStep.multiplier > 1.4);
  assert.ok(qinhanStep.multiplier < 1.5);
});

test("lets infantry add star baseline events instead of defensive-only value", () => {
  const result = calculateBoardScore({
    board: [
      { id: "lian-po", star: 3 },
      { id: "cao-ren", star: 3 },
      { id: "bai-qi", star: 3 },
      { id: "di-qing", star: 2 },
      { id: "jing-ke", star: 3 },
    ],
    playerHp: 100,
    equipmentCount: 0,
  });

  assert.ok(result.steps.some((step) => step.title.includes("步兵") && step.title.includes("基础")));
  assert.ok(result.steps.some((step) => step.title.includes("步兵") && step.title.includes("三星")));
  assert.equal(result.steps.some((step) => step.title.includes("后排")), false);
});

test("lets cavalry create opening charge events that can be amplified", () => {
  const result = calculateBoardScore({
    board: [
      { id: "huo-qubing", star: 2 },
      { id: "wu-zetian", star: 2 },
      { id: "hua-mulan", star: 2 },
      { id: "han-xin", star: 2 },
      { id: "li-jing", star: 2 },
      { id: "zhang-liang", star: 1 },
      { id: "xiao-he", star: 1 },
    ],
    playerHp: 100,
    equipmentCount: 0,
  });

  assert.ok(result.steps.some((step) => step.title.includes("骑兵") && step.title.includes("冲锋")));
  assert.ok(result.steps.some((step) => step.title.includes("骑兵") && step.title.includes("再结算")));
  assert.ok(result.steps.some((step) => step.title.includes("文臣") && step.heroId === "li-jing"));
});

test("uses player missing health for xichu last-stand scoring", () => {
  const board = [
    { id: "xiang-yu", star: 3 },
    { id: "yu-ji", star: 2 },
  ];
  const healthy = calculateBoardScore({ board, playerHp: 100, equipmentCount: 0 });
  const wounded = calculateBoardScore({ board, playerHp: 40, equipmentCount: 0 });

  assert.ok(wounded.score > healthy.score * 2);
  assert.ok(wounded.steps.some((step) => step.title.includes("西楚") && step.title.includes("破釜")));
});

test("uses a per-level population experience curve", () => {
  assert.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9].map(getXpNeededForLevel), [1, 1, 4, 8, 16, 32, 48, 56, 64]);
});

test("counts owned copies across board and bench for shop chase highlights", () => {
  assert.equal(getOwnedHeroCount("jing-ke", [
    { id: "jing-ke", star: 1 },
    { id: "guan-yu", star: 2 },
  ], [
    { id: "jing-ke", star: 2 },
  ]), 4);
});

test("does not roll shop copies for heroes already owned at three stars", () => {
  const candidates = getRollableShopHeroes(1, [], [{ id: "jing-ke", star: 3 }]);

  assert.equal(candidates.some((hero) => hero.id === "jing-ke"), false);
  assert.equal(candidates.some((hero) => hero.cost === 1), true);
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
  assert.equal(counts.find((item) => item.name === "刺客").heroCount >= 6, true);
  assert.equal(heroes.some((hero) => hero.cost === 5 && hero.job === "刺客"), true);
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

test("does not spend gold or remove the shop hero when a full bench cannot merge", () => {
  const state = {
    gameOver: false,
    lastResult: null,
    gold: 10,
    shop: [{ id: "li-bai", cost: 2 }],
    board: [],
    bench: [
      { id: "jing-ke", star: 1 },
      { id: "zhang-liang", star: 1 },
      { id: "qin-qiong", star: 1 },
      { id: "yang-yuhuan", star: 1 },
      { id: "bao-zheng", star: 1 },
      { id: "xin-qiji", star: 1 },
      { id: "daji", star: 1 },
      { id: "li-guang", star: 1 },
    ],
  };

  const result = applyShopBuyState(state, 0);

  assert.equal(result.bought, false);
  assert.equal(result.state.gold, 10);
  assert.deepEqual(result.state.shop, state.shop);
  assert.equal(result.state.bench.length, 8);
});

test("allows buying shop heroes while the round result is waiting for next stage", () => {
  const state = {
    gameOver: false,
    lastResult: { won: true },
    gold: 10,
    shop: [{ id: "li-bai", cost: 2 }],
    board: [],
    bench: [],
  };

  const result = applyShopBuyState(state, 0);

  assert.equal(result.bought, true);
  assert.equal(result.state.gold, 8);
  assert.deepEqual(result.state.shop, []);
  assert.deepEqual(result.state.bench, [{ id: "li-bai", star: 1 }]);
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

test("uses a one-star wildcard with two matching one-star heroes to make a two-star hero", () => {
  const roster = mergeRosterCopies({
    board: [{ id: "guan-yu", star: 1 }],
    bench: [
      { id: "guan-yu", star: 1 },
      { id: "wildcard", star: 1 },
    ],
  });

  assert.deepEqual(roster.board, [{ id: "guan-yu", star: 2 }]);
  assert.deepEqual(roster.bench, []);
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

test("builds feedback events for star upgrades and newly activated synergies", () => {
  const events = buildRosterFeedbackEvents(
    {
      board: [{ id: "jing-ke", star: 1 }, { id: "zhang-liang", star: 1 }],
      bench: [{ id: "jing-ke", star: 1 }, { id: "jing-ke", star: 1 }],
    },
    {
      board: [{ id: "jing-ke", star: 2 }, { id: "zhang-liang", star: 1 }, { id: "li-guang", star: 1 }],
      bench: [],
    },
  );

  assert.deepEqual(events.map((event) => event.kind), ["star", "synergy"]);
  assert.equal(events[0].title, "荆轲 升至 ★★");
  assert.equal(events[1].title, "秦汉 3 已激活");
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
  assert.equal(getSellValue({ id: "li-jing", star: 1 }), 2);
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
  assert.deepEqual(bursts.map((burst) => burst.delayMs), [0, 1000]);
  assert.deepEqual(bursts.map((burst) => burst.durationMs), [1000, 1000]);
  assert.deepEqual(bursts.map((burst) => burst.totalDelayMs), [2000, 3500]);
  assert.equal(bursts.every((burst) => burst.totalDurationMs === 1500), true);
  assert.equal(bursts.every((burst) => burst.amount > 0), true);
  assert.equal(bursts.every((burst) => ["普攻", "发动技能"].includes(burst.actionLabel)), true);
});

test("reveals battle result after hero bursts plus a full score check", () => {
  assert.equal(getBattleRevealDelayMs(0), 3000);
  assert.equal(getBattleRevealDelayMs(2), 5000);
  assert.equal(getBattleRevealDelayMs(5), 8000);
});

test("builds balatro-style combo steps from heroes, synergies, and equipment", () => {
  const bursts = [
    { heroName: "关羽", amount: 1200, runningTotal: 1200, delayMs: 0, durationMs: 1000 },
    { heroName: "诸葛亮", amount: 1800, runningTotal: 3000, delayMs: 1000, durationMs: 1000 },
  ];
  const steps = buildScoreComboSteps({
    bursts,
    activeSynergies: [
      { name: "武将", threshold: 3, bonus: 0.3 },
      { name: "三国", threshold: 3, bonus: 0.15 },
    ],
    equipmentCount: 2,
    score: 4400,
    target: 4000,
  });

  assert.deepEqual(steps.map((step) => step.kind), ["hero", "hero", "synergy", "synergy", "equipment", "final"]);
  assert.deepEqual(steps.map((step) => step.operator), ["+", "+", "×", "×", "×", "="]);
  assert.equal(steps[0].title, "关羽");
  assert.equal(steps[2].title, "武将 3");
  assert.equal(steps[4].title, "装备加成");
  assert.equal(steps.at(-1).title, "破阵成功");
  assert.equal(steps.at(-1).runningTotal, 4400);
  assert.ok(steps.slice(2, 5).every((step) => step.runningTotal > steps[1].runningTotal));
});

test("renders calculated multiplier chain steps in battle settlement", () => {
  const bursts = [
    { heroName: "李白", amount: 2000, runningTotal: 2000, delayMs: 0, durationMs: 1000 },
  ];
  const steps = buildScoreComboSteps({
    bursts,
    chainSteps: [
      { title: "刺客 全队暴击", detail: "李白获得6刺客全局暴击乘区", multiplier: 1.45, runningTotal: 2900 },
      { title: "大唐 追击", detail: "李白暴击后追击", multiplier: 1.7, runningTotal: 4930 },
    ],
    equipmentCount: 0,
    score: 4930,
    target: 4000,
  });

  assert.deepEqual(steps.map((step) => step.kind), ["hero", "multiplier", "multiplier", "final"]);
  assert.equal(steps[1].title, "刺客 全队暴击");
  assert.equal(steps[1].amountText, "×1.45");
  assert.equal(steps[2].runningTotal, 4930);
});

test("creates three choices for equipment and relic rewards", () => {
  assert.equal(createRewardChoices({ type: "equipment", level: 2, seed: 0 }).length, 3);
  assert.equal(createRewardChoices({ type: "relic", seed: 0 }).length, 3);
});

test("grants the third creep round a level two equipment chest", () => {
  assert.deepEqual(getStageRewards(1, true), [
    { type: "equipment", level: 1, title: "1级装备宝箱", text: "装备三选一" },
  ]);
  assert.deepEqual(getStageRewards(2, true), [
    { type: "equipment", level: 1, title: "1级装备宝箱", text: "装备三选一" },
  ]);
  assert.deepEqual(getStageRewards(3, true), [
    { type: "equipment", level: 2, title: "2级装备宝箱", text: "装备三选一" },
  ]);
});

test("equipment choices describe universal effects before class-specific specials", () => {
  const choices = [1, 2, 3, 4].flatMap((level) => createRewardChoices({ type: "equipment", level, seed: 0 }));
  const text = choices.map((choice) => choice.join(" ")).join(" ");

  assert.doesNotMatch(text, /适合/);
  assert.doesNotMatch(text, /(刺客|武将|文臣|射手|骑兵|神话|山海)(暴击率|普攻分|技能分|物理输出|输出|额外 \+)/);
  assert.equal(choices.every((choice) => choice[1].includes("通用：")), true);
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
    baseGold: 0,
    creepGold: 0,
    winGold: 0,
    streakGold: 2,
    interest: 3,
    relicGold: 0,
    total: 5,
    nextStreak: { type: "loss", count: 4 },
  });
});

test("uses stage-start gold plus global settlement economy", () => {
  assert.deepEqual([1, 2, 3, 4, 5, 6, 7].map(getStageStartGold), [1, 1, 2, 4, 5, 5, 5]);

  let gold = getStageStartGold(1);
  let previousStreak = { type: "none", count: 0 };

  for (let stage = 1; stage <= 7; stage += 1) {
    const income = resolveRoundIncome({
      stage,
      won: true,
      goldBeforeIncome: gold,
      previousStreak,
      creepGold: stage === 1 ? 2 : stage === 2 ? 3 : stage === 3 ? 6 : 0,
      relicGold: 0,
    });
    gold += income.total;
    previousStreak = income.nextStreak;
    if (stage < 7) gold += getStageStartGold(stage + 1);
  }

  assert.equal(gold, 50);
});

test("pays normal win gold and resets streak direction when result changes", () => {
  const income = resolveRoundIncome({
    stage: 8,
    won: true,
    goldBeforeIncome: 8,
    previousStreak: { type: "loss", count: 4 },
    creepGold: 2,
    relicGold: 1,
  });

  assert.equal(income.streakGold, 0);
  assert.equal(income.winGold, 1);
  assert.deepEqual(income.nextStreak, { type: "win", count: 1 });
  assert.equal(income.total, 5);
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

test("groups heroes by cost, job, and race for the formation compendium", () => {
  const heroes = [
    { name: "甲", cost: 1, race: "秦汉", job: "刺客" },
    { name: "乙", cost: 5, race: "秦汉", job: "骑兵" },
    { name: "丙", cost: 2, race: "大唐", job: "刺客" },
  ];

  assert.deepEqual(groupHeroesForCompendium(heroes, "cost").map((group) => group.title), ["1费", "2费", "5费"]);
  assert.deepEqual(groupHeroesForCompendium(heroes, "job").map((group) => group.title), ["刺客", "骑兵"]);
  assert.deepEqual(groupHeroesForCompendium(heroes, "race").map((group) => group.title), ["秦汉", "大唐"]);
});

test("matches hero cards against a clicked race or job filter", () => {
  const hero = { race: "秦汉", job: "刺客" };

  assert.equal(heroMatchesTraitFilter(hero, null), true);
  assert.equal(heroMatchesTraitFilter(hero, { kind: "job", name: "刺客" }), true);
  assert.equal(heroMatchesTraitFilter(hero, { kind: "race", name: "秦汉" }), true);
  assert.equal(heroMatchesTraitFilter(hero, { kind: "job", name: "骑兵" }), false);
});

test("uses race and job colors for hero trait tags", () => {
  assert.equal(getTraitTone("神话", "race"), "#6d5794");
  assert.equal(getTraitTone("刺客", "job"), "#8f5fcb");
});

test("uses distinct rarity colors and labels for hero costs", () => {
  assert.deepEqual([1, 2, 3, 4, 5].map((cost) => getCostRarity(cost)), [
    { className: "cost-1", label: "1费", color: "#e8ece5" },
    { className: "cost-2", label: "2费", color: "#64c87a" },
    { className: "cost-3", label: "3费", color: "#5ba7ff" },
    { className: "cost-4", label: "4费", color: "#b47cff" },
    { className: "cost-5", label: "5费", color: "#ffad3b" },
  ]);
});

test("shows a hero race and job synergy progress", () => {
  const tags = getHeroSynergyTags(
    { race: "三国", job: "武将" },
    [
      { race: "三国", job: "武将" },
      { race: "大唐", job: "武将" },
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
