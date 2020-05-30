const express = require('express');

const app = express();

app.get('/', (req, res) => { // request, response...at the root route
    res.send('hi there');
});

app.listen(3000, () => { // access at 'localhost:3000'
    console.log('Listening');
})