const express = require('express');

const app = express();

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

const bodyParser = (req, res, next) => {
    if (req.method === 'POST') { // the method property inside the req object
        req.on('data', (data) => { // 'on' can be thought of as an addEventListener listening on the 'data' event
        const parsed = data.toString('utf8').split('&');; // 'data' is just a data Buffer, need to convert it
        const formData = {};
        for (let pair of parsed) {
            const [key, value] = pair.split('='); // destructuring split output into key and value variables
            formData[key] = value;
        }
        req.body = formData;
        next(); // Express callback function given to us. Tell Express we are done here with our Middleware
        });
    } else {
        next();
    }
    
}

app.post('/', bodyParser, (req, res) => {
    
    console.log(req.body);
    res.send('Account created');
});


app.listen(3000, () => { // access at 'localhost:3000'
    console.log('Listening');
})