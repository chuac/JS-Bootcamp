const fs = require('fs');

class UsersRepository {
    constructor(filename) { // not allowed to have async code in here
        if (!filename) {
            throw new Error('Creating a repository requires a filename');
        }

        this.filename = filename;
        try { // check if file exists
            fs.accessSync(this.filename); // sync functions pause the code while running
        } catch (err) { // create file
            fs.writeFileSync(this.filename, '[]'); // create a new file with 2nd argument in there
        }
        
    }
    getAll() {
        // open the file @ this.filename

        // read contents

        // parse the json contents

        // return the parsed data
    }
}

new UsersRepository('users.json');