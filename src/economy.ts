export type StageReward =
  | { type: "none" }
  | { type: "equipmentChest"; level: 1 | 2 | 3 | 4 }
  | { type: "relicChest" };

export type StageDefinition = {
  stage: number;
  kind: "normal" | "creep" | "boss";
  creepGold: number[];
  reward: StageReward;
  extraDrop?: {
    chance: number;
    equipmentLevels: Array<1 | 2 | 3 | 4>;
  };
};

export type CombatIncomeInput = {
  goldBeforeInterest: number;
  won: boolean;
  stage: StageDefinition;
};

export type CombatIncome = {
  winGold: number;
  creepGold: number;
  interestGold: number;
  totalGold: number;
};

export const STAGES: Record<number, StageDefinition> = {
  1: creep(1, [1, 1], { type: "equipmentChest", level: 1 }),
  2: creep(2, [1, 1, 1], { type: "equipmentChest", level: 1 }),
  3: creep(3, [1, 1, 1, 1, 1, 1], { type: "none" }),
  4: normal(4),
  5: normal(5),
  6: normal(6),
  7: normal(7),
  8: normal(8),
  9: normal(9),
  10: boss(10, [2, 2, 2], { type: "relicChest" }, [1]),
  15: boss(15, [1, 1, 1, 1, 1, 2], { type: "equipmentChest", level: 2 }, [1, 2]),
  20: boss(20, [3, 3], { type: "relicChest" }, [1, 2]),
  25: boss(25, [3, 3], { type: "equipmentChest", level: 3 }, [1, 2, 3]),
  30: boss(30, [1, 1, 1, 1, 1, 1, 2, 2], { type: "relicChest" }, [1, 2, 3]),
  35: boss(35, [3], { type: "equipmentChest", level: 4 }, [1, 2, 3, 4]),
  40: boss(40, [1, 1, 1, 1, 1, 1, 1, 1, 3, 3], { type: "relicChest" }, [1, 2, 3, 4]),
};

export function calculateInterest(gold: number): number {
  return Math.min(4, Math.floor(gold / 10));
}

export function resolveCombatIncome(input: CombatIncomeInput): CombatIncome {
  const creepGold = input.stage.creepGold.reduce((sum, gold) => sum + gold, 0);
  const winGold = input.stage.kind === "normal" && input.won ? 1 : 0;
  const interestGold = calculateInterest(input.goldBeforeInterest + winGold + creepGold);

  return {
    winGold,
    creepGold,
    interestGold,
    totalGold: winGold + creepGold + interestGold,
  };
}

export function resolveReforgeChest(equipmentLevels: number[]): 1 | 2 | 3 | 4 {
  const sum = equipmentLevels.reduce((total, level) => total + level, 0);
  return clampChestLevel(Math.ceil(sum / 2));
}

function normal(stage: number): StageDefinition {
  return { stage, kind: "normal", creepGold: [], reward: { type: "none" } };
}

function creep(stage: number, creepGold: number[], reward: StageReward): StageDefinition {
  return { stage, kind: "creep", creepGold, reward };
}

function boss(
  stage: number,
  creepGold: number[],
  reward: StageReward,
  equipmentLevels: Array<1 | 2 | 3 | 4>,
): StageDefinition {
  return {
    stage,
    kind: "boss",
    creepGold,
    reward,
    extraDrop: { chance: 0.1, equipmentLevels },
  };
}

function clampChestLevel(level: number): 1 | 2 | 3 | 4 {
  if (level <= 1) return 1;
  if (level === 2) return 2;
  if (level === 3) return 3;
  return 4;
}
