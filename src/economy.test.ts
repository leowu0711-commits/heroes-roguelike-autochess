import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  calculateInterest,
  resolveCombatIncome,
  resolveReforgeChest,
  STAGES,
} from "./economy.ts";

describe("economy", () => {
  it("pays normal win gold, no loss gold, and capped interest", () => {
    assert.deepEqual(resolveCombatIncome({ goldBeforeInterest: 39, won: true, stage: STAGES[4] }), {
      winGold: 1,
      creepGold: 0,
      interestGold: 4,
      totalGold: 5,
    });
    assert.deepEqual(resolveCombatIncome({ goldBeforeInterest: 39, won: false, stage: STAGES[4] }), {
      winGold: 0,
      creepGold: 0,
      interestGold: 3,
      totalGold: 3,
    });
    assert.equal(calculateInterest(55), 4);
  });

  it("pays creep gold per killed creep and does not add normal win gold on creep rounds", () => {
    assert.deepEqual(resolveCombatIncome({ goldBeforeInterest: 0, won: true, stage: STAGES[1] }), {
      winGold: 0,
      creepGold: 2,
      interestGold: 0,
      totalGold: 2,
    });
    assert.deepEqual(resolveCombatIncome({ goldBeforeInterest: 20, won: true, stage: STAGES[15] }), {
      winGold: 0,
      creepGold: 7,
      interestGold: 2,
      totalGold: 9,
    });
  });

  it("defines boss reward nodes and reforge chest levels", () => {
    assert.equal(STAGES[10].reward.type, "relicChest");
    assert.equal(STAGES[15].reward.type, "equipmentChest");
    assert.equal(STAGES[15].reward.level, 2);
    assert.equal(resolveReforgeChest([1, 1, 2]), 2);
    assert.equal(resolveReforgeChest([4, 4, 4]), 4);
  });
});
