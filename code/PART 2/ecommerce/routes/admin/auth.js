const express = require('express');
const usersRepo = require('../../repositories/users'); // import in from our UsersRepo we created

const router = express.Router(); // instead of app, this Router will link it back to where app is created in index.js

router.get('/signup', (req, res) => { // request, response...at the root route
    res.send(`
        <div>
            Your ID is: ${req.session.userId}
            <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <input name="passwordConfirmation" placeholder="password confirmation" />
                <button>Sign Up</button>
            </form>
        </div>
    `);
});

router.post('/signup', async (req, res) => { // we could add our bodyParser Middleware here or up above in 'router.use'!
    const { email, password, passwordConfirmation } = req.body; // all form data is contained inside req.body

    const existingUser = await usersRepo.getOneBy({ email }); // key and variable value are the same so can write short-hand
    if (existingUser) {
        return res.send('Email already in use');
    }

    if (password !== passwordConfirmation) {
        return res.send('Passwords must match');
    }
    console.log(req.body);

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
    res.send(`
        <div>
            <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <button>Sign In</button>
            </form>
        </div>
    `);
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