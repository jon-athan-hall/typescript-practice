/**
 * Instead of JSDoc comments, use the TypeScript syntax for
 * declaring types.
 */
export type StorageItem = {
  weight: number
}

export type ShipStorage = {
  max: number,
  items: StorageItem[]
}