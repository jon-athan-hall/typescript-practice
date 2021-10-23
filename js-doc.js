//@ts-check

/**
 * Types and Object shapes can be declared with JSDoc comments.
 */

/**
 * @typedef {Object} StockItem
 * @property {number} weight
 */

/**
 * @typedef {Object} TruckStorage
 * @property {number} max
 * @property {StockItem[]} items
 */

/**
 * @type TruckStorage
 */
const storage = {
  max: undefined,
  items: []
}

/**
 * TypeScript makes sure the correct names for things are used; this is
 * called a type check. Hit Ctrl + Space inside object to get suggestions
 * for expected parameters.
 */
Object.defineProperty(storage, 'max', { writable: false, value: 5000 })

let currentTruckStorage = undefined

function storageUsed() {
  if (currentStorage) {
    return currentStorage
  }

  /**
   * TypeScript looks at the usage of variables to determine what values
   * can be accepted; this is called type inference.
   */
  currentStorage = 0

  /**
   * TypeScript also performs semantic checks for misused or incorrect syntax.
   */
  for (let i = 0; i < storage.items.length; i++) {
    currentStorage += storage.items[i].weight
  }

  return currentStorage
}

/**
 * @param {StockItem} item 
 */
function add(item) {
  if (storage.max - item.weight >= storageUsed()) {
    storage.items.push(item)
    currentStorage += item.weight
  }
}