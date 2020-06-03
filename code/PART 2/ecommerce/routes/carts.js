const express = require('express');

const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');

const router = express.Router();


// receive a POST request to add an item to a cart
router.post('/cart/products', async (req, res) => {
    //console.log(req.body.productId);

    let cart;
    if (!req.session.cartId) { // no cart found in the user's cookies
        cart = await cartsRepo.create({ items: [] }); // create a new cart for the user
        req.session.cartId = cart.id; // add the cart ID into user's cookies
    } else {
        cart = await cartsRepo.getOne(req.session.cartId); // otherwise, get their cart from the db
    }
    console.log(cart);

    // either increment quantity for existing product
    // or add new product into the cart

    res.send('Product added to cart');
})

// receive a GET request to show all items in cart

// receive a POST request to delete an item from a cart

module.exports = router;