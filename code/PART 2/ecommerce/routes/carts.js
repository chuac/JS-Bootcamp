const express = require('express');

const cartsRepo = require('../repositories/carts');

const router = express.Router();


// receive a POST request to add an item to a cart
router.post('/cart/products', (req, res) => {
    console.log(req.body.productId);

    res.send('Product added to cart');
})

// receive a GET request to show all items in cart

// receive a POST request to delete an item from a cart

module.exports = router;