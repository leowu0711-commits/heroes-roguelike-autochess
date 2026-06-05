import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buyExperience,
  buyShopHero,
  createInitialPool,
  createPoolFromHeroes,
  createPlayerState,
  generateShop,
  grantRoundExperience,
  mergeBenchCopies,
  sellBenchHero,
  SHOP_ODDS,
} from "./shop.ts";
import { HEROES } from "./content.ts";

describe("shop and player economy", () => {
  it("generates a 5-slot shop from level odds and finite pool stock", () => {
    const pool = createInitialPool([
      { id: "one", cost: 1, copies: 1 },
      { id: "two", cost: 2, copies: 10 },
    ]);

    const shop = generateShop({ level: 1, pool, randomValues: [0.1, 0.2, 0.3, 0.4, 0.5] });

    assert.equal(shop.length, 1);
    assert.equal(shop[0], "one");
  });

  it("buying and selling updates gold, bench, and pool stock", () => {
    const pool = createInitialPool([{ id: "jing-ke", cost: 1, copies: 45 }]);
    const player = createPlayerState({ gold: 5 });
    const bought = buyShopHero({ player, pool, heroId: "jing-ke", cost: 1 });

    assert.equal(bought.gold, 4);
    assert.equal(bought.bench.length, 1);
    assert.equal(pool["jing-ke"].remaining, 44);

    const sold = sellBenchHero({ player: bought, pool, benchIndex: 0 });

    assert.equal(sold.gold, 5);
    assert.equal(sold.bench.length, 0);
    assert.equal(pool["jing-ke"].remaining, 45);
  });

  it("merges three one-star copies into one two-star copy on the bench", () => {
    const player = createPlayerState({
      bench: [
        { heroId: "jing-ke", star: 1 },
        { heroId: "jing-ke", star: 1 },
        { heroId: "jing-ke", star: 1 },
      ],
    });

    const merged = mergeBenchCopies(player);

    assert.deepEqual(merged.bench, [{ heroId: "jing-ke", star: 2 }]);
  });

  it("grants natural xp and buys 4 xp for 4 gold using the original level curve", () => {
    const player = createPlayerState({ gold: 8, level: 1, xp: 0 });
    const afterRound = grantRoundExperience(player);

    assert.equal(afterRound.level, 2);
    assert.equal(afterRound.xp, 0);

    const afterBuy = buyExperience(afterRound);

    assert.equal(afterBuy.gold, 4);
    assert.equal(afterBuy.level, 4);
    assert.equal(afterBuy.xp, 1);
  });

  it("keeps the v1 shop odds at 1-8 population and 1-4 cost", () => {
    assert.deepEqual(SHOP_ODDS[8], { 1: 24, 2: 30, 3: 30, 4: 16 });
  });

  it("creates the finite pool from configured hero costs", () => {
    const pool = createPoolFromHeroes(HEROES);

    assert.equal(pool["jing-ke"].remaining, 45);
    assert.equal(pool["li-bai"].remaining, 30);
    assert.equal(pool["han-xin"].remaining, 25);
    assert.equal(pool["qin-shihuang"].remaining, 15);
  });
});
