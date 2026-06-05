import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  applyDamage,
  computeSynergyState,
  runBattle,
  type BattleHero,
  type DamageHit,
  type HeroInstance,
} from "./rules.ts";

describe("damage types", () => {
  it("applies physical and magic reductions, but mythic ignores both and can crit", () => {
    const physical: DamageHit = { amount: 100, type: "physical" };
    const magic: DamageHit = { amount: 100, type: "magic" };
    const mythicCrit: DamageHit = {
      amount: 100,
      type: "mythic",
      crit: true,
      critMultiplier: 2,
    };

    assert.equal(applyDamage(physical, { physicalReduction: 0.3, magicReduction: 0.5 }), 70);
    assert.equal(applyDamage(magic, { physicalReduction: 0.3, magicReduction: 0.5 }), 50);
    assert.equal(applyDamage(mythicCrit, { physicalReduction: 0.3, magicReduction: 0.5 }), 200);
  });
});

describe("synergies", () => {
  it("2 yishi lowers all non-yishi synergy thresholds by one while yishi still keeps race tags", () => {
    const heroes: HeroInstance[] = [
      { id: "li-bai", race: "鐩涘攼", job: "鍒哄" },
      { id: "li-shimin", race: "鐩涘攼", job: "甯濈帇" },
      { id: "yang-yuhuan", race: "鐩涘攼", job: "寮傚＋" },
      { id: "daji", race: "绁炶瘽", job: "寮傚＋" },
    ];

    const state = computeSynergyState(heroes);

    assert.equal(state.yishiThresholdReduction, 1);
    assert.equal(state.raceCounts["鐩涘攼"], 3);
    assert.equal(state.jobCounts["寮傚＋"], 2);
    assert.equal(state.activeSynergies["鐩涘攼"].tier, 4);
  });
});

describe("battle simulation", () => {
  it("kills fragile heroes for this battle only, reducing later output", () => {
    const heroes: BattleHero[] = [
      {
        id: "jing-ke",
        maxHp: 60,
        attackDamage: 30,
        attackInterval: 1,
        manaPerAttack: 10,
        manaMax: 100,
        skill: { damage: 100, type: "physical" },
      },
      {
        id: "guan-yu",
        maxHp: 200,
        attackDamage: 30,
        attackInterval: 1,
        manaPerAttack: 10,
        manaMax: 100,
        skill: { damage: 100, type: "physical" },
      },
    ];

    const result = runBattle({
      duration: 5,
      heroes,
      stage: {
        targetScore: 999,
        physicalReduction: 0,
        magicReduction: 0,
        hazards: [
          {
            type: "meteor",
            startAt: 2,
            interval: 999,
            damage: 80,
            targetRule: "slot",
            slotIndex: 0,
          },
        ],
      },
    });

    assert.equal(result.heroResults["jing-ke"].dead, true);
    assert.equal(result.heroResults["guan-yu"].dead, false);
    assert.equal(result.score, 180);
  });

  it("applies warrior damage bonuses during battle", () => {
    const heroes: BattleHero[] = [
      {
        id: "a",
        race: "绉︽眽",
        job: "姝﹀皢",
        maxHp: 100,
        attackDamage: 100,
        attackInterval: 1,
        manaPerAttack: 100,
        manaMax: 100,
        skill: { damage: 100, type: "physical" },
      },
      {
        id: "b",
        race: "涓夊浗",
        job: "姝﹀皢",
        maxHp: 100,
        attackDamage: 100,
        attackInterval: 1,
        manaPerAttack: 0,
        manaMax: 100,
        skill: { damage: 100, type: "physical" },
      },
    ];

    const result = runBattle({
      duration: 1,
      heroes,
      stage: { targetScore: 999, physicalReduction: 0, magicReduction: 0, hazards: [] },
    });

    assert.equal(result.score, 350);
  });

  it("lets yishi reduce thresholds so 3 shengtang triggers the 4-tier crit damage bonus", () => {
    const heroes: BattleHero[] = [
      critHero("li-bai", "鐩涘攼", "鍒哄"),
      critHero("li-shimin", "鐩涘攼", "甯濈帇"),
      critHero("yang-yuhuan", "鐩涘攼", "寮傚＋"),
      critHero("daji", "绁炶瘽", "寮傚＋"),
    ];

    const result = runBattle({
      duration: 1,
      heroes,
      stage: { targetScore: 999, physicalReduction: 0, magicReduction: 0, hazards: [] },
    });

    assert.equal(result.score, 1036);
  });

  it("applies qinhan physical, wenchen mana, emperor final, and mythic opening mana bonuses", () => {
    const heroes: BattleHero[] = [
      taggedHero("qin-a", "绉︽眽", "甯濈帇", {
        attackDamage: 100,
        manaPerAttack: 100,
        skill: { damage: 100, type: "physical" },
      }),
      taggedHero("qin-b", "绉︽眽", "甯濈帇", {
        attackDamage: 100,
        skill: { damage: 100, type: "physical" },
      }),
      taggedHero("wen-a", "澶у畫", "鏂囪嚕", {
        attackDamage: 0,
        manaPerAttack: 87,
        skill: { damage: 100, type: "magic" },
      }),
      taggedHero("wen-b", "澶у畫", "鏂囪嚕", {
        attackDamage: 0,
        skill: { damage: 0, type: "magic" },
      }),
      taggedHero("shen-a", "绁炶瘽", "鍒哄", {
        attackDamage: 0,
        manaPerAttack: 75,
        skill: { damage: 100, type: "mythic" },
      }),
      taggedHero("shen-b", "绁炶瘽", "寮傚＋", {
        attackDamage: 0,
        skill: { damage: 0, type: "mythic" },
      }),
    ];

    const result = runBattle({
      duration: 1,
      heroes,
      stage: { targetScore: 999, physicalReduction: 0, magicReduction: 0, hazards: [] },
    });

    assert.equal(result.score, 583);
  });

  it("applies dasong environment reduction and shanhai kill scaling", () => {
    const heroes: BattleHero[] = [
      taggedHero("song-a", "澶у畫", "姝﹀皢", { maxHp: 100, attackDamage: 0, skill: { damage: 0, type: "physical" } }),
      taggedHero("song-b", "澶у畫", "鏂囪嚕", { maxHp: 100, attackDamage: 0, skill: { damage: 0, type: "magic" } }),
      taggedHero("hai-a", "灞辨捣", "甯濈帇", { attackDamage: 100, skill: { damage: 0, type: "mythic" } }),
      taggedHero("hai-b", "灞辨捣", "鍒哄", { attackDamage: 0, skill: { damage: 0, type: "mythic" } }),
    ];

    const result = runBattle({
      duration: 2,
      heroes,
      stage: {
        targetScore: 999,
        physicalReduction: 0,
        magicReduction: 0,
        hazards: [
          { type: "meteor", startAt: 1, interval: 999, damage: 100, targetRule: "slot", slotIndex: 0 },
        ],
        creepDeaths: [{ at: 1 }],
      },
    });

    assert.equal(result.heroResults["song-a"].dead, false);
    assert.equal(result.heroResults["song-a"].hp, 12);
    assert.equal(result.score, 203);
  });
});

function critHero(id: string, race: string, job: string): BattleHero {
  return {
    id,
    race,
    job,
    maxHp: 100,
    attackDamage: 100,
    attackInterval: 1,
    manaPerAttack: 0,
    manaMax: 100,
    critChance: 1,
    critMultiplier: 2,
    skill: { damage: 0, type: "physical" },
  };
}

function taggedHero(
  id: string,
  race: string,
  job: string,
  overrides: Partial<BattleHero>,
): BattleHero {
  return {
    id,
    race,
    job,
    maxHp: overrides.maxHp ?? 100,
    attackDamage: overrides.attackDamage ?? 100,
    attackInterval: overrides.attackInterval ?? 1,
    manaPerAttack: overrides.manaPerAttack ?? 0,
    manaMax: overrides.manaMax ?? 100,
    skill: overrides.skill ?? { damage: 0, type: "physical" },
  };
}
