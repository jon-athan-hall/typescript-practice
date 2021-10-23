import { Article } from "./types"

class Discount {
  isPercentage: boolean
  amount: number

  constructor(isPercentage: boolean, amount: number) {
    this.isPercentage = isPercentage
    this.amount = amount
  }

  apply(article: Article) {
    if (this.isPercentage) {
      article.price = article.price - (article.price * this.amount)
    } else {
      article.price = article.price - this.amount
    }
  }
}

const discount: Discount = new Discount(false, 10)
discount.apply({
  title: 'Nine Stories',
  author: 'J.D. Salinger',
  price: 8.99,
  vat: 0.06,
})

/**
 * Regularly generated objects can now use the class Discount type declaration,
 * or vice versa, create an object type declaration and create a new object with a constructor.
 */
let allProductsTwentyBucks: Discount = {
  isPercentage: false,
  amount: 20,
  apply(article) {
    article.price = 20
  }
}

type DiscountType = {
  isPercentage: boolean,
  amount: number,
  apply(article: Article): void
}

let disco: DiscountType = new Discount(true, 0.2)

/**
 * Extended classes sometimes have the same shape, so their type declarations
 * are interchangeable. But be careful when extended classes get more properties
 * or methods added to them.
 */
class TwentyPercentDiscount extends Discount {
  constructor() {
    super(true, 0.2)
  }

  apply(article: Article) {
    if (article.price <= 40) {
      super.apply(article)
    }
  }
}

let disco1: Discount = new TwentyPercentDiscount()
let disco2: TwentyPercentDiscount = new Discount(true, 0.3)