const Repository = require('./repository'); // our parent class

class ProductsRepository extends Repository {
}

module.exports = new ProductsRepository('products.json'); // export an Instance of our class to be used elsewhere