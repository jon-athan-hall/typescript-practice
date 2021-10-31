class Discount {
    constructor(isPercentage, amount) {
        this.isPercentage = isPercentage;
        this.amount = amount;
    }
    apply(article) {
        if (this.isPercentage) {
            article.price = article.price - (article.price * this.amount);
        }
        else {
            article.price = article.price - this.amount;
        }
    }
}
const discount = new Discount(false, 10);
discount.apply({
    title: 'Nine Stories',
    author: 'J.D. Salinger',
    price: 8.99,
    vat: 0.06,
});
/**
 * Regularly generated objects can now use the class Discount type declaration,
 * or vice versa, create an object type declaration and create a new object with a constructor.
 */
let allProductsTwentyBucks = {
    isPercentage: false,
    amount: 20,
    apply(article) {
        article.price = 20;
    }
};
let disco = new Discount(true, 0.2);
/**
 * Extended classes sometimes have the same shape, so their type declarations
 * are interchangeable. But be careful when extended classes get more properties
 * or methods added to them.
 */
class TwentyPercentDiscount extends Discount {
    constructor() {
        super(true, 0.2);
    }
    apply(article) {
        if (article.price <= 40) {
            super.apply(article);
        }
    }
}
let disco1 = new TwentyPercentDiscount();
let disco2 = new Discount(true, 0.3);
export {};
/**
 * TypeScript also has public and private keywords for more object
 * oriented programming. Use a # in front of class #properties for
 * private too.
 *
 * Abstract classes are also available to implement
 * much of a class, but leave out details for real classes.
 *
 * TypeScript even has enum for collecting a few types together.
 */ 
