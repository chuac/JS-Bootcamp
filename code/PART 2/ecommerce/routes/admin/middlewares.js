const { validationResult } = require('express-validator');

module.exports = {
    handleErrors(templateFunc) { // middlewares must return functions
        return (req, res, next) => {
            const errors = validationResult(req); // errors is array of objects
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.send(templateFunc({ errors }));
            }

            next(); // everything went well! tells Express to do the next thing
        }
    }
}