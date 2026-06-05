import { RELICS } from "./content.ts";

export type RelicId = string;

export function createRelicChestOptions(startIndex = 0): RelicId[] {
  return [0, 1, 2].map((offset) => RELICS[(startIndex + offset) % RELICS.length].id);
}

export function hasRelic(relics: RelicId[] | undefined, relicId: RelicId): boolean {
  return (relics ?? []).includes(relicId);
}
