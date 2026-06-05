import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { EQUIPMENT, HEROES, RELICS } from "./content.ts";

describe("content configuration", () => {
  it("keeps the v1 roster size, cost spread, and yishi count fixed", () => {
    assert.equal(HEROES.length, 24);
    assert.deepEqual(countBy(HEROES.map((hero) => hero.cost)), {
      1: 10,
      2: 6,
      3: 5,
      4: 3,
    });
    assert.equal(HEROES.filter((hero) => hero.job === "异士").length, 3);
  });

  it("gives every hero one race, one job, and a concrete skill damage type", () => {
    for (const hero of HEROES) {
      assert.ok(hero.race);
      assert.ok(hero.job);
      assert.match(hero.skill.type, /^(physical|magic|mythic)$/);
      assert.ok(hero.skill.damage > 0);
    }
  });

  it("keeps equipment and relic pools at the v1 target size", () => {
    assert.equal(EQUIPMENT.length, 10);
    assert.equal(RELICS.length, 6);
    assert.equal(EQUIPMENT.find((item) => item.id === "shanhai-scroll")?.role, "技能伤害类型变为神话");
    assert.doesNotMatch(JSON.stringify(EQUIPMENT), /神话增伤|神话伤害加深/);
  });
});

function countBy(values: Array<string | number>): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const value of values) {
    counts[String(value)] = (counts[String(value)] ?? 0) + 1;
  }
  return counts;
}
