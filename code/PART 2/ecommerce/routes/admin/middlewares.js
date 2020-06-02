const { validationResult } = require('express-validator');

module.exports = {
    handleErrors(templateFunc) { 
        return (req, res, next) => { // middlewares must return functions
            const errors = validationResult(req); // errors is array of objects
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.send(templateFunc({ errors }));
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