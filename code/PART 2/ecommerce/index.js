const express = require('express');
const bodyParser = require('body-parser');

const usersRepo = require('./repositories/users'); // import in from our UsersRepo we created

const app = express();

app.use(bodyParser.urlencoded({ extended: true} )); // now every single route handler will be parsed by this

app.get('/', (req, res) => { // request, response...at the root route
    res.send(`
        <div>
            <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <input name="passwordConfirmation" placeholder="password confirmation" />
                <button>Sign Up</button>
            </form>
        </div>
    `);
});


app.post('/', async (req, res) => { // we could add our bodyParser Middleware here or up above in 'app.use'!
    const { email, password, passwordConfirmation } = req.body;

    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
        return res.send('Email already in use');
    }

    if (password !== passwordConfirmation) {
        return res.send('Passwords must match');
    }
    console.log(req.body);
    res.send('Account created');
});


app.listen(3000, () => { // access at 'localhost:3000'
    console.log('Listening');
})