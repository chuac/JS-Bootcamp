const express = require('express');
const { check, validationResult } = require('express-validator');

const usersRepo = require('../../repositories/users'); // import in from our UsersRepo we created
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

const router = express.Router(); // instead of app, this Router will link it back to where app is created in index.js

router.get('/signup', (req, res) => { // request, response...at the root route
    res.send(signupTemplate({ req })); // signup template needs req object
});

router.post('/signup', 
    [
        check('email')
            .trim()
            .normalizeEmail()
            .isEmail()
            .withMessage('Must be a valid email')
            .custom(async (email) => {
                const existingUser = await usersRepo.getOneBy({ email }); // key and variable value are the same so can write short-hand
                if (existingUser) {
                    throw new Error('Email already in use');
                }
            }),
        check('password')
            .trim()
            .isLength({ min: 4, max: 20})
            .withMessage('Must be between 4 and 20 characters'),
        check('passwordConfirmation')
            .trim()
            .isLength({ min: 4, max: 20})
            .withMessage('Must be between 4 and 20 characters')
            .custom((passwordConfirmation, { req }) => {
                if (passwordConfirmation != req.body.password) {
                    throw new Error('Passwords must match');
                }
            })
    ], 
    async (req, res) => { // we could add our bodyParser Middleware here or up above in 'router.use'!
        const errors = validationResult(req); // errors is array of objects
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(422).json({ errors: errors.array() });
        }
        
        const { email, password, passwordConfirmation } = req.body; // all form data is contained inside req.body


        // Create a user in our user repo to represent this person
        const user = await usersRepo.create({ email, password });
        // Store the id of that user inside the users cookie
        req.session.userId = user.id; // req.session is an object added by cookie-session library!
        res.send('Account created');
});


router.get('/signout', (req, res) => {
    req.session = null; // clear out any cookie data the user has
    res.send('You are logged out');
});


router.get('/signin', (req, res) => {
    res.send(signinTemplate());
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await usersRepo.getOneBy({ email }); // the user object from our db (if user exists!)

    if (!user) { // user object is undefined, i.e, user not found
        return res.send('Email not found');
    }

    const validPassword = await usersRepo.comparePasswords(user.password, password);
    if (!validPassword) {
        return res.send('Invalid password');
    }

    req.session.userId = user.id;
    res.send('You are signed in!');
});

module.exports = router;