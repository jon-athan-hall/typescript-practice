/**
 * Default values can help TypeScript with type inference.
 * @param price
 * @param vat
 * @returns
 */
function addVAT(price: number, vat: number = 0.2): number {
  return price * (1 + vat)
}

const vatPrice = addVAT(30, 0.2)
const deliveryAddresses = []

console.log(vatPrice)

let deliveryAddress: any = '842 Main Street, 08863'

function selectDeliveryAddress(addressOrIndex: unknown): string {
    /**
     * Type guard performed at run-time to check type. Add more type
     * checking to make the type unknown happy.
     */
    if (typeof addressOrIndex === 'number' &&
        addressOrIndex < deliveryAddresses.length) {
        /**
         * TypeScript is cool with this number-specific method
         * because it's smart enough to infer with the use of typeof;
         * this is called type narrowing.
         */
        console.log(addressOrIndex.toFixed(2))
        return deliveryAddresses[addressOrIndex]
    } else if (typeof addressOrIndex === 'string') {
      return addressOrIndex
    }

    return ''
}

/**
 * Use `tsc` to compile the TypeScript into JavaScript.
 * Use `tsc --watch` to constantly compile on file changes.
 * Update tsconfig.json file's target value to get free transpiles
 * from modern JavaScript to older ECMAScript versions.
 *
 * Left-hand typing declares types explicitly with variable creation.
 * Right-hand typing declares types with type inference based on value.
 */