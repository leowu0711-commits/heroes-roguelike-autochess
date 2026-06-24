export type HeroCost = 1 | 2 | 3 | 4;

export type PoolEntryInput = {
  id: string;
  cost: HeroCost;
  copies: number;
};

export type HeroCostSource = {
  id: string;
  cost: HeroCost;
};

export type PoolEntry = {
  id: string;
  cost: HeroCost;
  total: number;
  remaining: number;
};

export type HeroPool = Record<string, PoolEntry>;

export type OwnedHero = {
  heroId: string;
  star: 1 | 2 | 3;
};

export type PlayerState = {
  gold: number;
  level: number;
  xp: number;
  bench: OwnedHero[];
  board: OwnedHero[];
};

export type ShopOdds = Record<HeroCost, number>;

export const SHOP_ODDS: Record<number, ShopOdds> = {
  1: { 1: 100, 2: 0, 3: 0, 4: 0 },
  2: { 1: 70, 2: 30, 3: 0, 4: 0 },
  3: { 1: 60, 2: 35, 3: 5, 4: 0 },
  4: { 1: 50, 2: 35, 3: 15, 4: 0 },
  5: { 1: 40, 2: 35, 3: 23, 4: 2 },
  6: { 1: 33, 2: 30, 3: 30, 4: 7 },
  7: { 1: 30, 2: 30, 3: 30, 4: 10 },
  8: { 1: 24, 2: 30, 3: 30, 4: 16 },
};

const XP_TO_NEXT_LEVEL: Record<number, number> = {
  1: 1,
  2: 1,
  3: 2,
  4: 4,
  5: 24,
  6: 16,
  7: 40,
};

export function createInitialPool(entries: PoolEntryInput[]): HeroPool {
  return Object.fromEntries(
    entries.map((entry) => [
      entry.id,
      { id: entry.id, cost: entry.cost, total: entry.copies, remaining: entry.copies },
    ]),
  );
}

export function createPoolFromHeroes(heroes: HeroCostSource[]): HeroPool {
  return createInitialPool(
    heroes.map((hero) => ({
      id: hero.id,
      cost: hero.cost,
      copies: copiesForCost(hero.cost),
    })),
  );
}

export function createPlayerState(overrides: Partial<PlayerState> = {}): PlayerState {
  return {
    gold: 0,
    level: 1,
    xp: 0,
    bench: [],
    board: [],
    ...overrides,
  };
}

export function generateShop(input: {
  level: number;
  pool: HeroPool;
  randomValues: number[];
}): string[] {
  const shop: string[] = [];
  const odds = SHOP_ODDS[Math.min(8, Math.max(1, input.level))];

  for (const randomValue of input.randomValues.slice(0, 5)) {
    const cost = pickCost(odds, randomValue);
    const candidate = Object.values(input.pool).find(
      (entry) => entry.cost === cost && entry.remaining > 0 && !shop.includes(entry.id),
    );
    if (candidate) {
      shop.push(candidate.id);
    }
  }

  return shop;
}

export function buyShopHero(input: {
  player: PlayerState;
  pool: HeroPool;
  heroId: string;
  cost: number;
}): PlayerState {
  const entry = input.pool[input.heroId];
  if (!entry || entry.remaining <= 0) return input.player;
  if (input.player.gold < input.cost) return input.player;
  if (input.player.bench.length >= 8) return input.player;

  entry.remaining -= 1;
  return {
    ...input.player,
    gold: input.player.gold - input.cost,
    bench: [...input.player.bench, { heroId: input.heroId, star: 1 }],
  };
}

export function sellBenchHero(input: {
  player: PlayerState;
  pool: HeroPool;
  benchIndex: number;
}): PlayerState {
  const owned = input.player.bench[input.benchIndex];
  if (!owned) return input.player;

  const entry = input.pool[owned.heroId];
  if (entry) {
    entry.remaining = Math.min(entry.total, entry.remaining + copiesForStar(owned.star));
  }

  return {
    ...input.player,
    gold: input.player.gold + sellValue(entry?.cost ?? 1, owned.star),
    bench: input.player.bench.filter((_, index) => index !== input.benchIndex),
  };
}

export function mergeBenchCopies(player: PlayerState): PlayerState {
  let bench = [...player.bench];
  let changed = true;

  while (changed) {
    changed = false;
    for (const star of [1, 2] as const) {
      const ids = [...new Set(bench.filter((hero) => hero.star === star).map((hero) => hero.heroId))];
      const mergeId = ids.find((id) => bench.filter((hero) => hero.heroId === id && hero.star === star).length >= 3);
      if (!mergeId) continue;

      let removed = 0;
      bench = bench.filter((hero) => {
        if (hero.heroId === mergeId && hero.star === star && removed < 3) {
          removed += 1;
          return false;
        }
        return true;
      });
      bench.push({ heroId: mergeId, star: (star + 1) as 2 | 3 });
      changed = true;
      break;
    }
  }

  return { ...player, bench };
}

export function grantRoundExperience(player: PlayerState): PlayerState {
  return applyExperience(player, 1);
}

export function buyExperience(player: PlayerState): PlayerState {
  if (player.gold < 5) return player;
  return applyExperience({ ...player, gold: player.gold - 5 }, 4);
}

function applyExperience(player: PlayerState, amount: number): PlayerState {
  let level = player.level;
  let xp = player.xp + amount;

  while (level < 8) {
    const needed = XP_TO_NEXT_LEVEL[level];
    if (xp < needed) break;
    xp -= needed;
    level += 1;
  }

  return { ...player, level, xp: level >= 8 ? 0 : xp };
}

function pickCost(odds: ShopOdds, randomValue: number): HeroCost {
  const roll = randomValue * 100;
  let cumulative = 0;
  for (const cost of [1, 2, 3, 4] as const) {
    cumulative += odds[cost];
    if (roll < cumulative) return cost;
  }
  return 4;
}

function copiesForStar(star: 1 | 2 | 3): number {
  return star === 1 ? 1 : star === 2 ? 3 : 9;
}

function sellValue(cost: number, star: 1 | 2 | 3): number {
  return Math.max(1, Math.floor((cost * copiesForStar(star)) / 2));
}

function copiesForCost(cost: HeroCost): number {
  return cost === 1 ? 45 : cost === 2 ? 30 : cost === 3 ? 25 : 15;
}
