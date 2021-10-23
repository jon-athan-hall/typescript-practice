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
    price: 8.99,
    vat: 0.06,
});
