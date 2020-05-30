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

app.post('/', (req, res) => {
    req.on('data', (data) => { // 'on' can be thought of as an addEventListener listening on the 'data' event
        const parsed = data.toString('utf8').split('&');; // 'data' is just a data Buffer, need to convert it
        const formData = {};
        for (let pair of parsed) {
            const [key, value] = pair.split('='); // destructuring split output into key and value variables
            formData[key] = value;
        }
        console.log(formData);
    })
    
    res.send('Account created');
});

app.listen(3000, () => { // access at 'localhost:3000'
    console.log('Listening');
})