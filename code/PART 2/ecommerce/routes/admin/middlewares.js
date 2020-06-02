const { validationResult } = require('express-validator');

module.exports = {
    handleErrors(templateFunc, dataCallback) { 
        return async (req, res, next) => { // middlewares must return functions
            const errors = validationResult(req); // errors is array of objects
            if (!errors.isEmpty()) {
                let data = {}; // if our templateFunc needs some data, we'll store it in this object
                if (dataCallback) {
                    data = await dataCallback(req); // run the function given to us (grab the data they need)
                }
                
                console.log(errors);
                return res.send(templateFunc({ errors, ...data })); // spread the data and return it back to them
            }

            next(); // everything went well! tells Express to do the next thing
        }
    },
    requireAuth(req, res, next) {
        if (!req.session.userId) { // if user not signed in (they don't have userId in their session cookies)
            return res.redirect('/signin');
        }

        next(); // everything was okay, tell Express to continue on
    }
}