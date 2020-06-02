module.exports = {
    getError(errors, property) {
        // property === 'email' || 'password' || 'passwordconfirmation'
        try {
            return errors.mapped()[property].msg;
        } catch (err) { // to catch weird errors
            return '';
        }
            /*
                errors.mapped() is and object like below
                {
                    email: {
                        msg: 'Invalid email'
                    },
                    password: {
                        msg: 'Password too short'
                    },
                    passwordConfirmation: {
                        msg: 'Password doesn't match'
                    }
                }
                // then the [property] will match the sub-object, and the .msg will get the msg
            */ 
    }
}