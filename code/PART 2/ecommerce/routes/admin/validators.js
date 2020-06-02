const { check } = require('express-validator');
const usersRepo = require('../../repositories/users'); // import in from our UsersRepo we created

module.exports = {
    requireEmail: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async (email) => {
            const existingUser = await usersRepo.getOneBy({ email }); // key and variable value are the same so can write short-hand
            if (existingUser) {
                throw new Error('Email already in use');
            }
        }),
    requirePassword: check('password')
        .trim()
        .isLength({ min: 4, max: 20})
        .withMessage('Must be between 4 and 20 characters'),
    requirePasswordConfirmation: check('passwordConfirmation')
        .trim()
        .isLength({ min: 4, max: 20})
        .withMessage('Must be between 4 and 20 characters')
        .custom((passwordConfirmation, { req }) => {
            if (passwordConfirmation != req.body.password) {
                throw new Error('Passwords must match');
            }
        }),
    requireEmailExists: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must provide a valid email')
        .custom(async (email) => {
            const user = await usersRepo.getOneBy({ email });
            if (!user) { // user of that email does not exist
                throw new Error('Email not found');
            }
        }),
    requireValidPasswordForUser: check('password')
        .trim()
        .custom(async (password, { req }) => {
            const user = await usersRepo.getOneBy({ email: req.body.email });
            if (!user) {
                throw new Error('Invalid password'); // check if user exists, but we return invalid password error
            }

            const validPassword = await usersRepo.comparePasswords(user.password, password);
            if (!validPassword) {
                throw new Error('Invalid password');
            }
        }),
}