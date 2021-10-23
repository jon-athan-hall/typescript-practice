//@ts-check
/** @typedef { import('./types.d').ShipStorage }
ShipStorage */
/** @typedef { import('./types.d').StorageItem }
StorageItem */

/**
 * @type ShipStorage
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

let currentStorage = undefined

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
 * @param {StorageItem} item 
 */
function add(item) {
  if (storage.max - item.weight >= storageUsed()) {
    storage.items.push(item)
    currentStorage += item.weight
  }

  $('#numberOfItems').text(storage.items.length)

  if (isDevelopment) {
    const itemCount = storage.items.length
    console.log(`${itemCount} items`)
    console.log(`${currentStorage}kg total`)
  }
}