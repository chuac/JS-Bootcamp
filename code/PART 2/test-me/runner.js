// most of code for File Collection, calling a function to setup the environment, then execute each file that was found

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const render = require('./render');

const forbiddenDirs = ['node_modules']; // we don't want to search these folders for test files

class Runner {
    constructor() {
        this.testFiles = []; // contains all the files we found with the extension we specified (*.test.js)
    }

    async runTests() {
        for (let file of this.testFiles) { // 'file' is an object with a 'name' key
            console.log(chalk.gray(`TESTING --> ${file.name}`));
            global.render = render; // render will now be available to other files/projects
            const beforeEaches = [];
            global.beforeEach = (func) => {
                beforeEaches.push(func); // grab any functions from beforeEach and store them into that array for 'it' to use
            }

            global.it = (desc, func) => { // "inject" the 'it' function into the file we're about to require
                beforeEaches.forEach((fn) => fn()); // for each function inside beforeEaches, run them now. before we run our test

                try {
                    func(); // run the 'it' test function
                    console.log(chalk.green.bold(`\tOK - ${desc}`)); // won't be run if func() returns an error, it'll skip this line and go into the catch
                } catch (err) {
                    const message = err.message.replace(/\n/g, '\n\t\t'); // regex to indent the whole error message
                    console.log(chalk.red.bold(`\tX - ${desc}`));
                    console.log(chalk.red.bold('\t', message));
                }
                
            };
            try {
                require(file.filepath); // Node will require that file, and execute all the code inside! no need for childProcesses
            } catch (err) {
                const message = err.message.replace(/\n/g, '\n\t\t');
                console.log(chalk.red.bold(message));
            }
            
        }
    }

    async collectFiles(targetPath) { // breadth-first search (BFS)
        // targetPath === /Users/chris/Documents/projects/movie-fight , for example
        const files = await fs.promises.readdir(targetPath);

        for (let file of files) { // 'file' will be a file or folder, we need to check which it is. 'files' is the BFS array we're iterating over
            const filepath = path.join(targetPath, file); // 'file' would only be the file/folder name, fs.lstat needs the full path to check
            const stats = await fs.promises.lstat(filepath);

            if (stats.isFile() && file.includes('.test.js')) { // check if it's a file (not folder) and has the extension we're looking for
                this.testFiles.push({ filepath, name: file }); // store the absolute path, in an object. and also store the short path (relative to the cwd)
            } else if (stats.isDirectory() && !forbiddenDirs.includes(file)) { // check if folder and isn't included in our forbiddenDirs array
                const childFiles = await fs.promises.readdir(filepath); // get all the children from inside this folder

                files.push(...childFiles.map((child) => path.join(file, child))); // spread in all the children of this folder into our BFS's array that we're iterating over
                // ^ each child in childFiles wouldn't have a trace of their immediate-parent folder ('file' here). so we're appending it on before passing it off
            }
        }
    }
};

module.exports = Runner;