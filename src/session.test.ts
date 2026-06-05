import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buyFromShopSlot,
  buyXp,
  claimEquipmentChest,
  claimRelicChest,
  createGameSession,
  equipInventoryItemToBoard,
  moveBoardToBench,
  moveBenchToBoard,
  refreshShop,
  reforgeInventoryEquipment,
  resolveCurrentBattle,
  sellBenchSlot,
  unequipBoardItem,
} from "./session.ts";

describe("game session flow", () => {
  it("runs the first playable loop from shop to battle settlement", () => {
    let session = createGameSession({ gold: 1, shopRandomValues: [0.01, 0.11, 0.21, 0.31, 0.41] });

    assert.equal(session.stageNumber, 1);
    assert.equal(session.player.hp, 100);
    assert.equal(session.shop.length, 5);

    session = buyFromShopSlot(session, 0);
    session = moveBenchToBoard(session, 0);
    assert.equal(session.player.board.length, 1);
    session = resolveCurrentBattle(session);

    assert.equal(session.stageNumber, 2);
    assert.equal(session.player.level, 2);
    assert.equal(session.player.gold, 2);
    assert.equal(session.lastBattle?.won, true);
    assert.equal(session.pendingRewards.length, 1);
    assert.equal(session.pendingRewards[0].type, "equipmentChest");
  });

  it("deducts hp on failed normal stages and still grants interest plus natural xp", () => {
    let session = createGameSession({ stageNumber: 4, gold: 39, shopRandomValues: [0.01, 0.11, 0.21, 0.31, 0.41] });

    session = resolveCurrentBattle(session);

    assert.equal(session.stageNumber, 5);
    assert.equal(session.player.hp, 90);
    assert.equal(session.player.gold, 42);
    assert.equal(session.lastBattle?.won, false);
  });

  it("supports preparation actions: refresh, buy xp, sell, auto merge, and move back to bench", () => {
    let session = createGameSession({ gold: 12, shopRandomValues: [0.01, 0.11, 0.21, 0.31, 0.41] });

    session = buyXp(session);
    assert.equal(session.player.gold, 8);
    assert.equal(session.player.level, 4);
    assert.equal(session.player.xp, 0);

    const firstShop = [...session.shop];
    session = refreshShop(session, [0.99, 0.98, 0.01, 0.02, 0.03]);
    assert.equal(session.player.gold, 6);
    assert.notDeepEqual(session.shop, firstShop);

    session = { ...session, shop: ["jing-ke", "jing-ke", "jing-ke"] };
    session = buyFromShopSlot(session, 0);
    session = buyFromShopSlot(session, 0);
    session = buyFromShopSlot(session, 0);
    assert.equal(session.player.bench.length, 1);
    assert.equal(session.player.bench[0].star, 2);

    session = moveBenchToBoard(session, 0);
    assert.equal(session.player.board.length, 1);
    session = moveBoardToBench(session, 0);
    assert.equal(session.player.board.length, 0);
    assert.equal(session.player.bench.length, 1);

    session = sellBenchSlot(session, 0);
    assert.equal(session.player.bench.length, 0);
    assert.equal(session.player.gold, 6);
  });

  it("claims equipment chests, equips up to three items, and unequips back to inventory", () => {
    let session = createGameSession({ gold: 1, shopRandomValues: [0.01, 0.11, 0.21, 0.31, 0.41] });

    session = buyFromShopSlot(session, 0);
    session = moveBenchToBoard(session, 0);
    session = {
      ...session,
      pendingRewards: [{ type: "equipmentChest", level: 1 }],
    };

    session = claimEquipmentChest(session, 0, 0);
    session = claimEquipmentChest({ ...session, pendingRewards: [{ type: "equipmentChest", level: 1 }] }, 0, 1);
    session = claimEquipmentChest({ ...session, pendingRewards: [{ type: "equipmentChest", level: 1 }] }, 0, 2);
    session = claimEquipmentChest({ ...session, pendingRewards: [{ type: "equipmentChest", level: 1 }] }, 0, 0);

    assert.equal(session.player.equipmentInventory.length, 4);

    session = equipInventoryItemToBoard(session, 0, 0);
    session = equipInventoryItemToBoard(session, 0, 0);
    session = equipInventoryItemToBoard(session, 0, 0);
    session = equipInventoryItemToBoard(session, 0, 0);

    assert.equal(session.player.boardEquipment[0].length, 3);
    assert.equal(session.player.equipmentInventory.length, 1);

    session = unequipBoardItem(session, 0, 0);
    assert.equal(session.player.boardEquipment[0].length, 2);
    assert.equal(session.player.equipmentInventory.length, 2);
  });

  it("shanhai scroll changes the equipped hero skill damage type to mythic", () => {
    let withoutScroll = createGameSession({ stageNumber: 10 });
    withoutScroll = {
      ...withoutScroll,
      player: {
        ...withoutScroll.player,
        board: [{ heroId: "guan-yu", star: 1 }],
      },
    };
    withoutScroll = resolveCurrentBattle(withoutScroll);

    let withScroll = createGameSession({ stageNumber: 10 });
    withScroll = {
      ...withScroll,
      player: {
        ...withScroll.player,
        board: [{ heroId: "guan-yu", star: 1 }],
        boardEquipment: {
          0: [{ equipmentId: "shanhai-scroll", level: 1 }],
        },
      },
    };
    withScroll = resolveCurrentBattle(withScroll);

    assert.ok((withScroll.lastBattle?.score ?? 0) > (withoutScroll.lastBattle?.score ?? 0));
  });

  it("reforges inventory equipment once into a new chest choice", () => {
    let session = createGameSession();
    session = {
      ...session,
      canReforge: true,
      player: {
        ...session.player,
        equipmentInventory: [
          { equipmentId: "green-dragon-blade", level: 1 },
          { equipmentId: "feather-fan", level: 2 },
          { equipmentId: "shanhai-scroll", level: 4 },
        ],
      },
    };

    session = reforgeInventoryEquipment(session, [0, 1, 2], 1, 0);

    assert.equal(session.canReforge, false);
    assert.deepEqual(session.player.equipmentInventory, [
      { equipmentId: "feather-fan", level: 4 },
    ]);

    const unchanged = reforgeInventoryEquipment(session, [0], 0, 0);
    assert.deepEqual(unchanged.player.equipmentInventory, session.player.equipmentInventory);
  });

  it("claims relic chests and applies economy and survival relic effects", () => {
    let session = createGameSession({ stageNumber: 4, gold: 39 });
    session = {
      ...session,
      pendingRewards: [{ type: "relicChest" }],
    };

    session = claimRelicChest(session, 0, 0);
    assert.deepEqual(session.player.relics, ["wealth-basin"]);

    session = {
      ...session,
      player: {
        ...session.player,
        relics: ["wealth-basin", "academy-order", "life-charm"],
      },
    };
    session = resolveCurrentBattle(session);

    assert.equal(session.player.gold, 43);
    assert.equal(session.player.level, 3);
    assert.equal(session.player.xp, 0);
    assert.equal(session.player.hp, 92);
  });

  it("uses recruitment board to discount the first refresh each stage only", () => {
    let session = createGameSession({ gold: 10 });
    session = {
      ...session,
      player: {
        ...session.player,
        relics: ["recruitment-board"],
      },
    };

    session = refreshShop(session, [0.01, 0.02, 0.03, 0.04, 0.05]);
    assert.equal(session.player.gold, 9);

    session = refreshShop(session, [0.11, 0.12, 0.13, 0.14, 0.15]);
    assert.equal(session.player.gold, 7);
  });
});
