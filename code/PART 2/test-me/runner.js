// most of code for File Collection, calling a function to setup the environment, then execute each file that was found

const fs = require('fs');


class Runner {
    constructor() {
        this.files = []; // contains all the files we found
    }

    async collectFiles(targetPath) { // breadth-first search
        // targetPath === /Users/chris/Documents/projects/movie-fight , for example
        const files = await fs.promises.readdir(targetPath);

        return files;
    }
};

module.exports = Runner;