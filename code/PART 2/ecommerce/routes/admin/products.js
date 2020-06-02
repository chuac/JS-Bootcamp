const express = require('express');
const multer = require('multer'); // multer also parses our data so need to use it before the validator middleware

const { handleErrors, requireAuth } = require('./middlewares');
const productsRepo = require('../../repositories/products'); // import in from our UsersRepo we created
const productsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');
const productsEditTemplate = require('../../views/admin/products/edit');
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


router.get('/admin/products/:id/edit', requireAuth, async (req, res) => { // :id is called a wildcard, anything in that path will be captured
    console.log(req.params.id);
    const product = await productsRepo.getOne(req.params.id);

    if (!product) { // didn't find product
        return res.send('Product not found');
    }

    res.send(productsEditTemplate({ product }));
}) 

router.post('/admin/products/:id/edit', 
    requireAuth, 
    [
        requireTitle,
        requirePrice
    ],
    handleErrors(productsEditTemplate, async (req) => { // if form fails, we need to keep track of which product ID we were at, to show the user again
        const product = await productsRepo.getOne(req.params.id);
        return { product };
    }),
    upload.single('image'),
    async (req, res) => {
        const changes = req.body;

        if (req.file) { // if file was provided in this form submission
            changes.image = req.file.buffer.toString('base64');
        }

        try {
            await productsRepo.update(req.params.id, changes);
        } catch (err) {
            return res.send('Could not find item');
        }

        res.redirect('/admin/products');
})

module.exports = router;