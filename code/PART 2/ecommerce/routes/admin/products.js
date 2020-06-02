const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer'); // multer also parses our data so need to use it before the validator middleware

const productsRepo = require('../../repositories/products'); // import in from our UsersRepo we created
const productsNewTemplate = require('../../views/admin/products/new');
const { requireTitle,
        requirePrice
} = require('./validators') // moved our chain validators to another file

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


//list different products
router.get('/admin/products', (req, res) => {

});


router.get('/admin/products/new', (req, res) => {
    res.send(productsNewTemplate({  }));
});

router.post('/admin/products/new', 
    upload.single('image'), // 'image' is the form field's name. access at req.file. put this middleware before the validator middlewares
    [
        requireTitle,
        requirePrice
    ],
    async (req, res) => {
        const errors = validationResult(req); // errors is array of objects
        if (!errors.isEmpty()) {
            //console.log(errors);
            return res.send(productsNewTemplate({ req, errors }));
        }
        
        const image = req.file.buffer.toString('base64');
        const { title, price } = req.body;
        await productsRepo.create({ title, price, image });

        res.send('submitted');
    })

module.exports = router;