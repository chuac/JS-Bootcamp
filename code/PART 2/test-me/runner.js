// most of code for File Collection, calling a function to setup the environment, then execute each file that was found

const fs = require('fs');
const path = require('path');


class Runner {
    constructor() {
        this.testFiles = []; // contains all the files we found with the extension we specified (*.test.js)
    }

    async collectFiles(targetPath) { // breadth-first search (BFS)
        // targetPath === /Users/chris/Documents/projects/movie-fight , for example
        const files = await fs.promises.readdir(targetPath);

        for (let file of files) { // 'file' will be a file or folder, we need to check which it is. 'files' is the BFS array we're iterating over
            const filepath = path.join(targetPath, file); // 'file' would only be the file/folder name, fs.lstat needs the full path to check
            const stats = await fs.promises.lstat(filepath);

            if (stats.isFile() && file.includes('.test.js')) { // check if it's a file (not folder) and has the extension we're looking for
                this.testFiles.push({ name: filepath }); // store the absolute path, in an object
            } else if (stats.isDirectory()) {
                const childFiles = await fs.promises.readdir(filepath); // get all the children from inside this folder

                files.push(...childFiles.map((child) => path.join(file, child))); // spread in all the children of this folder into our BFS's array that we're iterating over
                // ^ each child in childFiles wouldn't have a trace of their immediate-parent folder ('file' here). so we're appending it on before passing it off
            }
        }
    }
};

module.exports = Runner;