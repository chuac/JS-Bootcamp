const express = require('express');
const bodyParser = require('body-parser');

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


app.post('/', bodyParser.urlencoded({ extended: true} ), (req, res) => { // we could add our bodyParser Middleware here or up above in 'app.use'!
    
    console.log(req.body);
    res.send('Account created');
});


app.listen(3000, () => { // access at 'localhost:3000'
    console.log('Listening');
})