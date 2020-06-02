const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session'); // also a middleware function

const authRouter = require('./routes/admin/auth'); // authRouter will be used below
const productsRouter = require('./routes/admin/products');

const app = express();

app.use(express.static('public')); // look inside our cwd, and the public folder and make it available to the world
app.use(bodyParser.urlencoded({ extended: true} )); // now every single route handler will be parsed by this. only handles url-encoded form data!
app.use(cookieSession({
    keys: ['eagsgdsfjdgaifieaflayaaq']
})); // cookie-session will encrypt the info we store in the cookie, when we provide a key string

app.use(authRouter); // this has to be after our middleware initialisations just above!!
app.use(productsRouter);


app.listen(3000, () => { // access at 'localhost:3000'
    console.log('Listening');
})