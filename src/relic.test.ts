import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createRelicChestOptions, hasRelic } from "./relic.ts";

describe("relics", () => {
  it("creates deterministic 3-choice relic chest options", () => {
    assert.deepEqual(createRelicChestOptions(0), [
      "wealth-basin",
      "recruitment-board",
      "academy-order",
    ]);
    assert.deepEqual(createRelicChestOptions(4), [
      "life-charm",
      "destiny-lot",
      "wealth-basin",
    ]);
  });

  it("detects active relic ids", () => {
    assert.equal(hasRelic(["wealth-basin"], "wealth-basin"), true);
    assert.equal(hasRelic(["wealth-basin"], "life-charm"), false);
  });
});
