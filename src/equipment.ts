import { EQUIPMENT } from "./content.ts";
import { resolveReforgeChest } from "./economy.ts";

export type EquipmentLevel = 1 | 2 | 3 | 4;

export type EquipmentItem = {
  equipmentId: string;
  level: EquipmentLevel;
};

export type EquipmentReforgeResult = {
  level: EquipmentLevel;
  options: EquipmentItem[];
};

export function createEquipmentChestOptions(
  level: EquipmentLevel,
  startIndex = 0,
): EquipmentItem[] {
  return [0, 1, 2].map((offset) => {
    const equipment = EQUIPMENT[(startIndex + offset) % EQUIPMENT.length];
    return { equipmentId: equipment.id, level };
  });
}

export function resolveEquipmentReforge(
  items: EquipmentItem[],
  startIndex = 0,
): EquipmentReforgeResult {
  const level = resolveReforgeChest(items.map((item) => item.level));
  return {
    level,
    options: createEquipmentChestOptions(level, startIndex),
  };
}

export function hasEquipment(
  items: EquipmentItem[] | undefined,
  equipmentId: string,
): boolean {
  return (items ?? []).some((item) => item.equipmentId === equipmentId);
}
