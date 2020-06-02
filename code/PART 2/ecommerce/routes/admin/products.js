const express = require('express');
const multer = require('multer'); // multer also parses our data so need to use it before the validator middleware

const { handleErrors, requireAuth } = require('./middlewares');
const productsRepo = require('../../repositories/products'); // import in from our UsersRepo we created
const productsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');
const { requireTitle,
        requirePrice
} = require('./validators') // moved our chain validators to another file

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


//list different products
router.get('/admin/products', requireAuth, async (req, res) => {
    const products = await productsRepo.getAll();

    res.send(productsIndexTemplate({ products }));
});


router.get('/admin/products/new', requireAuth, (req, res) => {
    res.send(productsNewTemplate({  }));
});

router.post('/admin/products/new', 
    requireAuth,
    upload.single('image'), // 'image' is the form field's name. access at req.file. put this middleware before the validator middlewares
    [
        requireTitle,
        requirePrice
    ],
    handleErrors(productsNewTemplate), // notice no parenthesis for our template, because we're passing in a reference to that function, not calling it
    async (req, res) => {
        const image = req.file.buffer.toString('base64');
        const { title, price } = req.body;
        await productsRepo.create({ title, price, image });

        res.redirect('/admin/products'); // now redirects to the products index
    })

module.exports = router;