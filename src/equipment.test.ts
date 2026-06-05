import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  createEquipmentChestOptions,
  resolveEquipmentReforge,
  type EquipmentItem,
} from "./equipment.ts";

describe("equipment", () => {
  it("creates deterministic 3-choice equipment chest options by level", () => {
    const options = createEquipmentChestOptions(2, 0);

    assert.equal(options.length, 3);
    assert.deepEqual(options.map((item) => item.level), [2, 2, 2]);
    assert.deepEqual(options.map((item) => item.equipmentId), [
      "green-dragon-blade",
      "feather-fan",
      "shanhai-scroll",
    ]);
  });

  it("reforges selected equipment into a capped chest level and options", () => {
    const input: EquipmentItem[] = [
      { equipmentId: "green-dragon-blade", level: 1 },
      { equipmentId: "feather-fan", level: 2 },
      { equipmentId: "shanhai-scroll", level: 4 },
    ];

    const result = resolveEquipmentReforge(input, 1);

    assert.equal(result.level, 4);
    assert.deepEqual(result.options.map((item) => item.equipmentId), [
      "feather-fan",
      "shanhai-scroll",
      "fengshen-register",
    ]);
  });
});
