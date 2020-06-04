const express = require('express');

const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');

const router = express.Router();


// receive a POST request to add an item to a cart. Our Add to Cart button is wrapped inside an input
router.post('/cart/products', async (req, res) => {
    //console.log(`Item ID: ${req.body.productId}`);

    let cart;
    if (!req.session.cartId) { // no cart found in the user's cookies
        cart = await cartsRepo.create({ items: [] }); // create a new cart for the user
        req.session.cartId = cart.id; // add the cart ID into user's cookies
    } else {
        cart = await cartsRepo.getOne(req.session.cartId); // otherwise, get their cart from the db
    }
    //console.log(cart);

    // either increment quantity for existing product
    // or add new product into the cart
    const existingItem = cart.items.find((item) => { // cart.items is an array of item objects that each cart has
        return item.id === req.body.productId;
    });
    if (existingItem) {
        existingItem.quantity++; // update the property of one item in cart.items
    } else {
        cart.items.push({
            id: req.body.productId,
            quantity: 1
        }); // add a whole new item into cart.items
    }
    //console.log(`cart.items: ${cart.items}`);
    await cartsRepo.update(cart.id, {
        items: cart.items
    }); // we update the repo with this updated cart.items array of objects

    res.redirect('/cart');
})


// receive a GET request to show all items in cart
router.get('/cart', async (req, res) => {
    if (!req.session.cartId) { // no cart found in user's cookies
        return res.redirect('/');
    }

    const cart = await cartsRepo.getOne(req.session.cartId);

    for (let item of cart.items) { // iterate over the items array that holds these item objects
        const product = await productsRepo.getOne(item.id);

        item.product = product; // append the product to the item's object. we won't save this to the db but will pass it to the template for display
    }

    res.send(cartShowTemplate({ items: cart.items })); // pass in a list of our items
})


// receive a POST request to delete an item from a cart
router.post('/cart/products/delete', async (req, res) => {
    // Check if user has a cartId in their cookies?

    const { itemId } = req.body;
    const cart = await cartsRepo.getOne(req.session.cartId);

    const items = cart.items.filter((item) => item.id !== itemId); // keep all the items that DON'T match what we want to delete
    
    await cartsRepo.update(req.session.cartId, { items });

    res.redirect('/cart');
})


module.exports = router;