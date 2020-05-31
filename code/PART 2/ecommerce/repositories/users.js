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

    async getAll() {
        // open the file @ this.filename
        return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
    }

    async create(attrs) { // attrs is an attributes object of the new user
        const records = await this.getAll();
        records.push(attrs);

        await fs.promises.writeFile(this.filename, JSON.stringify(records));
    }
}

const test = async () => {
    const repo = new UsersRepository('users.json');

    await repo.create({
        email: "test@test.com",
        password: "password"
    })
    
    const users = await repo.getAll();

    console.log(users);
}
test();

