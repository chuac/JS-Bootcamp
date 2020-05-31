const layout = require('../layout');

module.exports = ({ req }) => { // assuming we'll pass in an object that has the req property
    const content = `
        <div>
            Your ID is: ${req.session.userId}
            <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <input name="passwordConfirmation" placeholder="password confirmation" />
                <button>Sign Up</button>
            </form>
        </div>
    `;
    return layout({ content });
};