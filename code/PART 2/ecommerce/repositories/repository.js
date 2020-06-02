const fs = require('fs');
const crypto = require('crypto');

// our parent class for User and Products to extend
module.exports = class Respository {
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
    async create(attrs) { // generic create method. attrs is an attributes object of the new record
        attrs.id = this.randomId();

        const records = await this.getAll();
        records.push(attrs);
        await this.writeAll(records);

        return attrs;
    }

    async getAll() {
        // open the file @ this.filename
        return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
    }

    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2)); // stringify takes arguments to make the JSON file easier to read
    }

    randomId() { 
        return crypto.randomBytes(4).toString('hex'); // https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
    }

    async getOne(id) {
        const records = await this.getAll();

        return records.find((record) => record.id === id);
    }

    async delete(id) {
        const records = await this.getAll();

        const filteredRecords = records.filter((record) => record.id !== id); // get a records data object that doesn't contain where record.id === id

        await this.writeAll(filteredRecords); // write the data without this removed user back into the .json file
    }

    async update(id, attrs) { // attrs is an object of all the updated attributes for this target record
        const records = await this.getAll();
        const record = records.find((record) => record.id === id);

        if (!record) {
            throw new Error(`Record with id ${id} not found`);
        }

        Object.assign(record, attrs); // takes all properties (key: value pairs) from attrs and copies them over into record

        await this.writeAll(records);
    }

    async getOneBy(filters) { // filters is an object containing key: value pairs to match by
        const records = await this.getAll();

        for (let record of records) { // for-of loop iterating over array
            let found = true; // flag
            for (let key in filters) { // for-in loop iterating over object
                if (record[key] !== filters[key]) { // if key:value pair at this record doesn't match the filter(s)
                    found = false; // flip flag
                }
            }

            if (found) { // if flag never flipped to false that means there was a match
                return record;
            }
        }
    }
}