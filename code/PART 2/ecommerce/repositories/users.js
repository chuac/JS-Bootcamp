const fs = require('fs');
const crypto = require('crypto');
const util = require('util');

const Repository = require('./repository'); // our parent class

const scrypt = util.promisify(crypto.scrypt); // since the regular scrypt deals with callback functions, we'll wrap it with promisify

class UsersRepository extends Repository { // extend our parent (base) class
    async comparePasswords(saved, supplied) {
        // saved -> password saved in our db. in the form of 'hashed.salt'
        // supplied -> plain text password provided from the form data
        const [hashed, salt] = saved.split('.'); // destructuring from split()'s output

        const buffer = await scrypt(supplied, salt, 64);
        const suppliedHashed = buffer.toString('hex');

        return (hashed === suppliedHashed);
    }

    async create(attrs) { // attrs is an attributes object of the new user. like {email: '', password:''}
        attrs.id = this.randomId();

        const salt = crypto.randomBytes(8).toString('hex'); // random numbers and letters for our pw salt
        const buffer = await scrypt(attrs.password, salt, 64);
        const hashed = buffer.toString('hex');
        
        const records = await this.getAll();
        const record = {
            ...attrs, // spread attrs into this new object but..
            password: `${hashed}.${salt}` // ..also replace the password key: value that was in attrs with this new value
        };
        records.push(record); // push this new record object that has the properly hashed/salted password

        await this.writeAll(records);

        return record;
    }
}

module.exports = new UsersRepository('users.json'); // export an Instance of our class to be used elsewhere
