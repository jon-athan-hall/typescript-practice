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

type Article = {
  title: string,
  author: string,
  price: number,
  vat: number,
  stock: number,
  description: string
}

const bookBackup = {
  title: 'Nine Stories',
  author: 'J.D. Salinger',
  price: 8.99,
  vat: 0.06,
  stock: 900,
  description: 'First collection of short stories.',
  pageCount: 109 
}

/**
 * TypeScript is fine with this, and will drop the excess properties
 * from any auto suggestions, but pageCount is still available at run-time.
 *
 * However, TypeScript will perform an excess property check on direct
 * value assignment, and show an error.
 */
const book: Article = bookBackup;

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
 * Custom Object type definitions can be used in parameters.
 * TypeScript will be happy with anything passed in that fits
 * the type structure.
 * An inline object type declaration is also possible:
 * article: { title: string, price: number, vat: number }
 * @param article 
 * @returns 
 */
function createArticleElement(article: Article): string {
  const title = article.title
  const price = addVAT(article.price, article.vat)
  return `<h2>Buy ${title} for ${price}</h2>`
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