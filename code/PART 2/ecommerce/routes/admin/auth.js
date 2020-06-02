const express = require('express');
const { check, validationResult } = require('express-validator');

const usersRepo = require('../../repositories/users'); // import in from our UsersRepo we created
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const { requireEmail, 
        requirePassword, 
        requirePasswordConfirmation,
        requireEmailExists,
        requireValidPasswordForUser
    } = require('./validators') // moved our chain validators to another file

const router = express.Router(); // instead of app, this Router will link it back to where app is created in index.js

router.get('/signup', (req, res) => { // request, response...at the root route
    res.send(signupTemplate({ req })); // signup template needs req object
});

router.post('/signup', 
    [
        requireEmail,
        requirePassword,
        requirePasswordConfirmation
    ], 
    async (req, res) => { // we could add our bodyParser Middleware here or up above in 'router.use'!
        const errors = validationResult(req); // errors is array of objects
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.send(signupTemplate({ req, errors }));
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
    res.send(signinTemplate({})); // pass in empty object because we expect an errors object sometimes
});

router.post('/signin', 
    [
        requireEmailExists,
        requireValidPasswordForUser
    ], 
    async (req, res) => {
        const errors = validationResult(req); // errors is array of objects
        if (!errors.isEmpty()) {
            return res.send(signinTemplate({ errors })); // pass our errors to the template to be displayed to user
        }

        const { email } = req.body;

        const user = await usersRepo.getOneBy({ email }); // the user object from our db (if user exists!)

        req.session.userId = user.id; // attached user's ID to their cookie data to keep them signed in
        res.send('You are signed in!');
});

module.exports = router;