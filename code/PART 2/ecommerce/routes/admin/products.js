const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');

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
    [
        requireTitle,
        requirePrice
    ],
    upload.single('image'), // 'image' is the form field's name. access at req.file
    (req, res) => {
        const errors = validationResult(req); // errors is array of objects
        // if (!errors.isEmpty()) {
        //     console.log(errors);
        //     return res.send(signupTemplate({ req, errors }));
        // }
        //console.log(req.body);
        
        console.log(req.file);

        res.send('submitted');
    })

module.exports = router;