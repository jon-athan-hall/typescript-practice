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

/**
 * Use ? for optional properties.
 */
export type Article = {
  title: string,
  author: string,
  price: number,
  vat: number,
  stock?: number,
  description?: string
}