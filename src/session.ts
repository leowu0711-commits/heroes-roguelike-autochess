import { HEROES, type HeroConfig } from "./content.ts";
import { resolveCombatIncome, STAGES, type StageReward } from "./economy.ts";
import {
  createEquipmentChestOptions,
  hasEquipment,
  resolveEquipmentReforge,
  type EquipmentItem,
} from "./equipment.ts";
import { createRelicChestOptions, hasRelic, type RelicId } from "./relic.ts";
import { runBattle, type BattleHero, type BattleResult, type BattleStage } from "./rules.ts";
import {
  buyExperience,
  buyShopHero,
  createPlayerState,
  createPoolFromHeroes,
  generateShop,
  grantRoundExperience,
  mergeBenchCopies,
  sellBenchHero,
  type HeroPool,
  type OwnedHero,
  type PlayerState,
} from "./shop.ts";

export type PendingReward = Exclude<StageReward, { type: "none" }>;

export type LastBattleSummary = {
  score: number;
  targetScore: number;
  won: boolean;
  hpLost: number;
  battle: BattleResult;
};

export type GameSession = {
  stageNumber: number;
  player: PlayerState & {
    hp: number;
    equipmentInventory: EquipmentItem[];
    boardEquipment: Record<number, EquipmentItem[]>;
    relics: RelicId[];
  };
  pool: HeroPool;
  shop: string[];
  pendingRewards: PendingReward[];
  canReforge: boolean;
  discountedRefreshUsed: boolean;
  lastBattle?: LastBattleSummary;
};

export type CreateSessionInput = {
  stageNumber?: number;
  gold?: number;
  shopRandomValues?: number[];
};

export type ResolveBattleInput = {
  extraDropRoll?: number;
  extraDropLevelRoll?: number;
};

export function createGameSession(input: CreateSessionInput = {}): GameSession {
  const pool = createPoolFromHeroes(HEROES);
  const player = {
    ...createPlayerState({ gold: input.gold ?? 0 }),
    hp: 100,
    equipmentInventory: [],
    boardEquipment: {},
    relics: [],
  };
  const shop = generateShop({
    level: player.level,
    pool,
    randomValues: input.shopRandomValues ?? defaultShopRandomValues(),
  });

  return {
    stageNumber: input.stageNumber ?? 1,
    player,
    pool,
    shop,
    pendingRewards: [],
    canReforge: false,
    discountedRefreshUsed: false,
  };
}

export function buyFromShopSlot(session: GameSession, slotIndex: number): GameSession {
  const heroId = session.shop[slotIndex];
  if (!heroId) return session;

  const hero = getHero(heroId);
  const player = mergeBenchCopies(buyShopHero({
    player: session.player,
    pool: session.pool,
    heroId,
    cost: hero.cost,
  }));

  return {
    ...session,
    player: { ...session.player, ...player, hp: session.player.hp },
    shop: session.shop.filter((_, index) => index !== slotIndex),
  };
}

export function refreshShop(session: GameSession, randomValues: number[] = defaultShopRandomValues()): GameSession {
  const refreshCost = getRefreshCost(session);
  if (session.player.gold < refreshCost) return session;

  return {
    ...session,
    discountedRefreshUsed: session.discountedRefreshUsed || refreshCost < 2,
    player: { ...session.player, gold: session.player.gold - refreshCost },
    shop: generateShop({
      level: session.player.level,
      pool: session.pool,
      randomValues,
    }),
  };
}

export function buyXp(session: GameSession): GameSession {
  const player = buyExperience(session.player);
  return { ...session, player: { ...session.player, ...player, hp: session.player.hp } };
}

export function sellBenchSlot(session: GameSession, benchIndex: number): GameSession {
  const player = sellBenchHero({
    player: session.player,
    pool: session.pool,
    benchIndex,
  });
  return { ...session, player: { ...session.player, ...player, hp: session.player.hp } };
}

export function claimEquipmentChest(
  session: GameSession,
  rewardIndex: number,
  choiceIndex: number,
): GameSession {
  const reward = session.pendingRewards[rewardIndex];
  if (!reward || reward.type !== "equipmentChest") return session;

  const options = createEquipmentChestOptions(reward.level);
  const chosen = options[choiceIndex];
  if (!chosen) return session;

  return {
    ...session,
    pendingRewards: session.pendingRewards.filter((_, index) => index !== rewardIndex),
    player: {
      ...session.player,
      equipmentInventory: [...session.player.equipmentInventory, chosen],
    },
  };
}

export function claimRelicChest(
  session: GameSession,
  rewardIndex: number,
  choiceIndex: number,
): GameSession {
  const reward = session.pendingRewards[rewardIndex];
  if (!reward || reward.type !== "relicChest") return session;

  const options = createRelicChestOptions();
  const chosen = options[choiceIndex];
  if (!chosen) return session;

  return {
    ...session,
    pendingRewards: session.pendingRewards.filter((_, index) => index !== rewardIndex),
    player: {
      ...session.player,
      relics: session.player.relics.includes(chosen)
        ? session.player.relics
        : [...session.player.relics, chosen],
    },
  };
}

export function equipInventoryItemToBoard(
  session: GameSession,
  inventoryIndex: number,
  boardIndex: number,
): GameSession {
  const item = session.player.equipmentInventory[inventoryIndex];
  const boardHero = session.player.board[boardIndex];
  if (!item || !boardHero) return session;

  const equipped = session.player.boardEquipment[boardIndex] ?? [];
  if (equipped.length >= 3) return session;

  return {
    ...session,
    player: {
      ...session.player,
      equipmentInventory: session.player.equipmentInventory.filter((_, index) => index !== inventoryIndex),
      boardEquipment: {
        ...session.player.boardEquipment,
        [boardIndex]: [...equipped, item],
      },
    },
  };
}

export function unequipBoardItem(
  session: GameSession,
  boardIndex: number,
  equipmentIndex: number,
): GameSession {
  const equipped = session.player.boardEquipment[boardIndex] ?? [];
  const item = equipped[equipmentIndex];
  if (!item) return session;

  const remaining = equipped.filter((_, index) => index !== equipmentIndex);

  return {
    ...session,
    player: {
      ...session.player,
      equipmentInventory: [...session.player.equipmentInventory, item],
      boardEquipment: {
        ...session.player.boardEquipment,
        [boardIndex]: remaining,
      },
    },
  };
}

export function reforgeInventoryEquipment(
  session: GameSession,
  inventoryIndices: number[],
  optionStartIndex: number,
  choiceIndex: number,
): GameSession {
  if (!session.canReforge) return session;

  const selected = inventoryIndices
    .map((index) => session.player.equipmentInventory[index])
    .filter((item): item is EquipmentItem => Boolean(item));
  if (selected.length === 0) return session;

  const result = resolveEquipmentReforge(selected, optionStartIndex);
  const chosen = result.options[choiceIndex];
  if (!chosen) return session;

  const selectedSet = new Set(inventoryIndices);
  return {
    ...session,
    canReforge: false,
    player: {
      ...session.player,
      equipmentInventory: [
        ...session.player.equipmentInventory.filter((_, index) => !selectedSet.has(index)),
        chosen,
      ],
    },
  };
}

export function moveBenchToBoard(session: GameSession, benchIndex: number): GameSession {
  const hero = session.player.bench[benchIndex];
  if (!hero) return session;
  if (session.player.board.length >= session.player.level) return session;

  return {
    ...session,
    player: {
      ...session.player,
      bench: session.player.bench.filter((_, index) => index !== benchIndex),
      board: [...session.player.board, hero],
    },
  };
}

export function moveBoardToBench(session: GameSession, boardIndex: number): GameSession {
  const hero = session.player.board[boardIndex];
  if (!hero) return session;
  if (session.player.bench.length >= 8) return session;

  return {
    ...session,
    player: {
      ...session.player,
      board: session.player.board.filter((_, index) => index !== boardIndex),
      bench: [...session.player.bench, hero],
      boardEquipment: shiftBoardEquipmentAfterRemoval(session.player.boardEquipment, boardIndex),
    },
  };
}

export function resolveCurrentBattle(session: GameSession, input: ResolveBattleInput = {}): GameSession {
  const stageDefinition = STAGES[session.stageNumber] ?? createGeneratedNormalStage(session.stageNumber);
  const stage = createBattleStage(session.stageNumber);
  const battleHeroes = session.player.board.map((owned, index) => toBattleHero(
    owned,
    session.player.boardEquipment[index] ?? [],
  ));
  const battle = runBattle({
    duration: 30,
    heroes: battleHeroes,
    stage,
  });
  const won = battle.score >= stage.targetScore;
  const hpLost = won ? 0 : applyHpLossRelics(
    calculateHpLoss(battle.score, stage.targetScore),
    session.player.relics,
  );
  const income = resolveCombatIncome({
    goldBeforeInterest: session.player.gold,
    won,
    stage: stageDefinition,
  });
  const playerAfterIncome = {
    ...session.player,
    gold: session.player.gold + income.totalGold + getExtraSettlementGold(session.player.relics),
    hp: Math.max(0, session.player.hp - hpLost),
  };
  const playerAfterXp = grantRoundExperience(
    hasRelic(session.player.relics, "academy-order")
      ? grantRoundExperience(playerAfterIncome)
      : playerAfterIncome,
  );
  const pendingReward = stageDefinition.reward.type === "none" ? [] : [stageDefinition.reward];
  const extraDropReward = resolveExtraDropReward(stageDefinition, input);

  return {
    ...session,
    stageNumber: session.stageNumber + 1,
    player: { ...session.player, ...playerAfterXp, hp: playerAfterIncome.hp },
    pendingRewards: [...session.pendingRewards, ...pendingReward, ...extraDropReward],
    canReforge: stageDefinition.kind === "boss",
    discountedRefreshUsed: false,
    lastBattle: {
      score: battle.score,
      targetScore: stage.targetScore,
      won,
      hpLost,
      battle,
    },
  };
}

export function mergePlayerBench(session: GameSession): GameSession {
  const player = mergeBenchCopies(session.player);
  return { ...session, player: { ...session.player, ...player, hp: session.player.hp } };
}

function toBattleHero(owned: OwnedHero, equipment: EquipmentItem[] = []): BattleHero {
  const hero = getHero(owned.heroId);
  const starMultiplier = owned.star === 1 ? 1 : owned.star === 2 ? 1.8 : 3.2;
  const skillType = hasEquipment(equipment, "shanhai-scroll") ? "mythic" : hero.skill.type;
  return {
    id: hero.id,
    race: hero.race,
    job: hero.job,
    maxHp: Math.round(hero.maxHp * starMultiplier),
    attackDamage: Math.round(hero.attackDamage * starMultiplier),
    attackInterval: hero.attackInterval,
    manaPerAttack: hero.manaPerAttack,
    manaMax: hero.manaMax,
    skill: {
      damage: Math.round(hero.skill.damage * starMultiplier),
      type: skillType,
    },
  };
}

function createBattleStage(stageNumber: number): BattleStage {
  return {
    targetScore: getTargetScore(stageNumber),
    physicalReduction: stageNumber >= 10 ? 0.1 : 0,
    magicReduction: stageNumber >= 10 ? 0.1 : 0,
    hazards: stageNumber >= 4
      ? [{ type: "meteor", startAt: 8, interval: 10, damage: 30 + stageNumber * 2, targetRule: "slot", slotIndex: 0 }]
      : [],
  };
}

function getTargetScore(stageNumber: number): number {
  if (stageNumber <= 3) return 100;
  return Math.round(120 * 1.18 ** (stageNumber - 1));
}

function calculateHpLoss(score: number, targetScore: number): number {
  if (score >= targetScore) return 0;
  return Math.max(1, Math.min(10, Math.ceil(((targetScore - score) / targetScore) * 10)));
}

function createGeneratedNormalStage(stageNumber: number) {
  return { stage: stageNumber, kind: "normal" as const, creepGold: [], reward: { type: "none" as const } };
}

function getHero(id: string): HeroConfig {
  const hero = HEROES.find((candidate) => candidate.id === id);
  if (!hero) {
    throw new Error(`Unknown hero: ${id}`);
  }
  return hero;
}

function defaultShopRandomValues(): number[] {
  return [0.01, 0.21, 0.41, 0.61, 0.81];
}

function getRefreshCost(session: GameSession): number {
  if (hasRelic(session.player.relics, "recruitment-board") && !session.discountedRefreshUsed) {
    return 1;
  }
  return 2;
}

function getExtraSettlementGold(relics: RelicId[]): number {
  return hasRelic(relics, "wealth-basin") ? 1 : 0;
}

function applyHpLossRelics(hpLost: number, relics: RelicId[]): number {
  if (!hasRelic(relics, "life-charm")) return hpLost;
  return Math.max(1, hpLost - 2);
}

function resolveExtraDropReward(
  stageDefinition: (typeof STAGES)[number],
  input: ResolveBattleInput,
): PendingReward[] {
  const extraDrop = stageDefinition.extraDrop;
  if (!extraDrop) return [];

  const dropRoll = input.extraDropRoll ?? Math.random();
  if (dropRoll >= extraDrop.chance) return [];

  const levelRoll = input.extraDropLevelRoll ?? Math.random();
  const levelIndex = Math.min(
    extraDrop.equipmentLevels.length - 1,
    Math.floor(levelRoll * extraDrop.equipmentLevels.length),
  );

  return [{ type: "equipmentChest", level: extraDrop.equipmentLevels[levelIndex] }];
}

function shiftBoardEquipmentAfterRemoval(
  boardEquipment: Record<number, EquipmentItem[]>,
  removedIndex: number,
): Record<number, EquipmentItem[]> {
  const shifted: Record<number, EquipmentItem[]> = {};
  for (const [key, value] of Object.entries(boardEquipment)) {
    const index = Number(key);
    if (index === removedIndex) continue;
    shifted[index > removedIndex ? index - 1 : index] = value;
  }
  return shifted;
}
