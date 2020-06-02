const layout = require('../layout');

const getError = (errors, property) => {
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

module.exports = ({ req, errors }) => { // assuming we'll pass in an object that has the req property
    const content = `
        <div>
            Your ID is: ${req.session.userId}
            <form method="POST">
                <input name="email" placeholder="email" />
                ${getError(errors, 'email')}
                <input name="password" placeholder="password" />
                ${getError(errors, 'password')}
                <input name="passwordConfirmation" placeholder="password confirmation" />
                ${getError(errors, 'passwordConfirmation')}
                <button>Sign Up</button>
            </form>
        </div>
    `;
    return layout({ content });
};