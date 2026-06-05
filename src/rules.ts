export type DamageType = "physical" | "magic" | "mythic";

export type DamageHit = {
  amount: number;
  type: DamageType;
  crit?: boolean;
  critMultiplier?: number;
};

export type DamageContext = {
  physicalReduction: number;
  magicReduction: number;
};

export type HeroInstance = {
  id: string;
  race: string;
  job: string;
};

export type ActiveSynergy = {
  count: number;
  tier: number;
};

export type SynergyState = {
  raceCounts: Record<string, number>;
  jobCounts: Record<string, number>;
  yishiThresholdReduction: number;
  activeSynergies: Record<string, ActiveSynergy>;
};

export type SkillConfig = {
  damage: number;
  type: DamageType;
};

export type BattleHero = {
  id: string;
  race?: string;
  job?: string;
  maxHp: number;
  attackDamage: number;
  attackInterval: number;
  manaPerAttack: number;
  manaMax: number;
  critChance?: number;
  critMultiplier?: number;
  skill: SkillConfig;
};

export type HazardConfig = {
  type: "meteor" | "earthquake" | "chill" | "skyfire" | "poison";
  startAt: number;
  interval: number;
  damage: number;
  duration?: number;
  targetRule: "slot" | "all";
  slotIndex?: number;
};

export type BattleStage = {
  targetScore: number;
  physicalReduction: number;
  magicReduction: number;
  hazards: HazardConfig[];
  creepDeaths?: Array<{ at: number }>;
};

export type BattleInput = {
  duration: number;
  heroes: BattleHero[];
  stage: BattleStage;
};

export type BattleHeroResult = {
  hp: number;
  dead: boolean;
};

export type BattleResult = {
  score: number;
  heroResults: Record<string, BattleHeroResult>;
};

const SYNERGY_TIERS: Record<string, number[]> = {
  "绉︽眽": [2, 4],
  "涓夊浗": [2, 4],
  "鐩涘攼": [2, 4],
  "澶у畫": [2, 4],
  "绁炶瘽": [2, 4],
  "灞辨捣": [2, 4],
  "姝﹀皢": [2, 4, 6],
  "鏂囪嚕": [2, 4],
  "甯濈帇": [2, 4],
  "鍒哄": [2, 3],
  "寮傚＋": [2],
};

export function applyDamage(hit: DamageHit, context: DamageContext): number {
  const critMultiplier = hit.crit ? hit.critMultiplier ?? 2 : 1;
  const raw = hit.amount * critMultiplier;

  if (hit.type === "physical") {
    return Math.round(raw * (1 - context.physicalReduction));
  }

  if (hit.type === "magic") {
    return Math.round(raw * (1 - context.magicReduction));
  }

  return Math.round(raw);
}

export function computeSynergyState(heroes: HeroInstance[]): SynergyState {
  const raceCounts = countBy(heroes.map((hero) => hero.race));
  const jobCounts = countBy(heroes.map((hero) => hero.job));
  const yishiThresholdReduction = (jobCounts["寮傚＋"] ?? 0) >= 2 ? 1 : 0;
  const activeSynergies: Record<string, ActiveSynergy> = {};

  for (const [name, count] of Object.entries({ ...raceCounts, ...jobCounts })) {
    const tiers = SYNERGY_TIERS[name];
    if (!tiers) continue;

    const reduction = name === "寮傚＋" ? 0 : yishiThresholdReduction;
    const activeTier = highestActiveTier(count, tiers, reduction);
    if (activeTier > 0) {
      activeSynergies[name] = { count, tier: activeTier };
    }
  }

  return { raceCounts, jobCounts, yishiThresholdReduction, activeSynergies };
}

export function runBattle(input: BattleInput): BattleResult {
  const synergyState = computeSynergyState(
    input.heroes
      .filter((hero) => hero.race && hero.job)
      .map((hero) => ({ id: hero.id, race: hero.race!, job: hero.job! })),
  );
  const battleBonuses = getBattleBonuses(synergyState);
  const fighters = input.heroes.map((hero) => ({
    hero,
    hp: hero.maxHp,
    mana: battleBonuses.openingMana,
    dead: false,
  }));
  let score = 0;
  let killDamageMultiplier = 1;

  for (let second = 1; second <= input.duration; second += 1) {
    for (const hazard of input.stage.hazards) {
      if (hazardTriggers(hazard, second)) {
        applyHazard(hazard, fighters, battleBonuses);
      }
    }

    for (const fighter of fighters) {
      if (fighter.dead) continue;
      if (second % fighter.hero.attackInterval !== 0) continue;

      const attackHit = buildAttackHit(fighter.hero, battleBonuses, killDamageMultiplier);
      score += applyDamage(attackHit, input.stage);
      fighter.mana += fighter.hero.manaPerAttack * battleBonuses.manaMultiplier;

      if (fighter.mana >= fighter.hero.manaMax) {
        const skillHit = buildSkillHit(fighter.hero, battleBonuses, killDamageMultiplier);
        score += applyDamage(skillHit, input.stage);
        fighter.mana = 0;
      }
    }

    const creepDeathsThisSecond = input.stage.creepDeaths?.filter((death) => death.at === second).length ?? 0;
    killDamageMultiplier += creepDeathsThisSecond * battleBonuses.shanhaiKillDamageBonus;
  }

  return {
    score,
    heroResults: Object.fromEntries(
      fighters.map((fighter) => [
        fighter.hero.id,
        { hp: fighter.hp, dead: fighter.dead },
      ]),
    ),
  };
}

type BattleBonuses = {
  warriorAttackMultiplier: number;
  warriorSkillPhysicalMultiplier: number;
  critChanceBonus: number;
  critDamageBonus: number;
  physicalDamageMultiplier: number;
  manaMultiplier: number;
  finalDamageMultiplier: number;
  openingMana: number;
  environmentDamageMultiplier: number;
  shanhaiKillDamageBonus: number;
};

function getBattleBonuses(state: SynergyState): BattleBonuses {
  const qinhanTier = state.activeSynergies["绉︽眽"]?.tier ?? 0;
  const dasongTier = state.activeSynergies["澶у畫"]?.tier ?? 0;
  const mythicTier = state.activeSynergies["绁炶瘽"]?.tier ?? 0;
  const shanhaiTier = state.activeSynergies["灞辨捣"]?.tier ?? 0;
  const warriorTier = state.activeSynergies["姝﹀皢"]?.tier ?? 0;
  const wenchenTier = state.activeSynergies["鏂囪嚕"]?.tier ?? 0;
  const emperorTier = state.activeSynergies["甯濈帇"]?.tier ?? 0;
  const shengtangTier = state.activeSynergies["鐩涘攼"]?.tier ?? 0;
  const assassinTier = state.activeSynergies["鍒哄"]?.tier ?? 0;

  return {
    warriorAttackMultiplier: warriorTier >= 6 ? 1.8 : warriorTier >= 4 ? 1.45 : warriorTier >= 2 ? 1.2 : 1,
    warriorSkillPhysicalMultiplier: warriorTier >= 6 ? 1.4 : warriorTier >= 4 ? 1.225 : warriorTier >= 2 ? 1.1 : 1,
    critChanceBonus: (shengtangTier >= 2 ? 0.08 : 0) + (assassinTier >= 3 ? 0.3 : assassinTier >= 2 ? 0.15 : 0),
    critDamageBonus: shengtangTier >= 4 ? 0.35 : 0,
    physicalDamageMultiplier: qinhanTier >= 4 ? 1.2 : qinhanTier >= 2 ? 1.1 : 1,
    manaMultiplier: wenchenTier >= 4 ? 1.35 : wenchenTier >= 2 ? 1.15 : 1,
    finalDamageMultiplier: emperorTier >= 4 ? 1.25 : emperorTier >= 2 ? 1.1 : 1,
    openingMana: mythicTier >= 4 ? 40 : mythicTier >= 2 ? 25 : 0,
    environmentDamageMultiplier: dasongTier >= 4 ? 0.76 : dasongTier >= 2 ? 0.88 : 1,
    shanhaiKillDamageBonus: shanhaiTier >= 4 ? 0.06 : shanhaiTier >= 2 ? 0.03 : 0,
  };
}

function buildAttackHit(hero: BattleHero, bonuses: BattleBonuses, killDamageMultiplier: number): DamageHit {
  const isWarrior = hero.job === "姝﹀皢";
  const amount = scaleDamage(
    hero.attackDamage * (isWarrior ? bonuses.warriorAttackMultiplier : 1),
    "physical",
    bonuses,
    killDamageMultiplier,
  );
  return {
    amount,
    type: "physical",
    crit: shouldCrit(hero, bonuses),
    critMultiplier: getCritMultiplier(hero, bonuses),
  };
}

function buildSkillHit(hero: BattleHero, bonuses: BattleBonuses, killDamageMultiplier: number): DamageHit {
  const isWarriorPhysicalSkill = hero.job === "姝﹀皢" && hero.skill.type === "physical";
  const amount = scaleDamage(
    hero.skill.damage * (isWarriorPhysicalSkill ? bonuses.warriorSkillPhysicalMultiplier : 1),
    hero.skill.type,
    bonuses,
    killDamageMultiplier,
  );
  return {
    amount,
    type: hero.skill.type,
    crit: shouldCrit(hero, bonuses),
    critMultiplier: getCritMultiplier(hero, bonuses),
  };
}

function scaleDamage(
  amount: number,
  type: DamageType,
  bonuses: BattleBonuses,
  killDamageMultiplier: number,
): number {
  const physicalMultiplier = type === "physical" ? bonuses.physicalDamageMultiplier : 1;
  return amount * physicalMultiplier * bonuses.finalDamageMultiplier * killDamageMultiplier;
}

function shouldCrit(hero: BattleHero, bonuses: BattleBonuses): boolean {
  return (hero.critChance ?? 0) + bonuses.critChanceBonus >= 1;
}

function getCritMultiplier(hero: BattleHero, bonuses: BattleBonuses): number {
  return (hero.critMultiplier ?? 2) + bonuses.critDamageBonus;
}

function countBy(values: string[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const value of values) {
    counts[value] = (counts[value] ?? 0) + 1;
  }
  return counts;
}

function highestActiveTier(count: number, tiers: number[], reduction: number): number {
  let active = 0;
  for (const tier of tiers) {
    if (count >= Math.max(1, tier - reduction)) {
      active = tier;
    }
  }
  return active;
}

function hazardTriggers(hazard: HazardConfig, second: number): boolean {
  if (second < hazard.startAt) return false;
  return (second - hazard.startAt) % hazard.interval === 0;
}

function applyHazard(
  hazard: HazardConfig,
  fighters: Array<{ hp: number; dead: boolean }>,
  bonuses: BattleBonuses,
): void {
  const damage = Math.round(hazard.damage * bonuses.environmentDamageMultiplier);

  if (hazard.targetRule === "all") {
    for (const fighter of fighters) {
      damageFighter(fighter, damage);
    }
    return;
  }

  const target = fighters[hazard.slotIndex ?? 0];
  if (target) {
    damageFighter(target, damage);
  }
}

function damageFighter(fighter: { hp: number; dead: boolean }, damage: number): void {
  if (fighter.dead) return;
  fighter.hp = Math.max(0, fighter.hp - damage);
  if (fighter.hp === 0) {
    fighter.dead = true;
  }
}
