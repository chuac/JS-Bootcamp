#!/usr/bin/env node

//// in terminal, try running 'watchit test.js' or 'watchit -h' for help

//// https://nodejs.org/api/fs.html
const fs = require('fs');
//// https://nodejs.org/api/child_process.html
const { spawn } = require('child_process');
//// https://www.npmjs.com/package/chokidar
const chokidar = require('chokidar');
//// https://www.npmjs.com/package/lodash.debounce
const debounce = require('lodash.debounce');
//// https://www.npmjs.com/package/caporal
const program = require('caporal'); // the use of name 'program' is recommended in the Caporal docs
//// https://www.npmjs.com/package/chalk
const chalk = require('chalk');


program
    .version('0.0.1')
    .argument('[filename]', 'Name of a file to execute')
    .action(async ({ filename }) => { // destructure filename out of args
        const name = filename || 'index.js'; // default to index.js if no filename provided
        
        try {
            await fs.promises.access(name); // check if file exists
        } catch (err) {
            throw new Error(`Could not find the file ${name}`);
        }
        let proc;
        const start = debounce(() => {
            if (proc) { // check if proc (spawn object) already exists, then kill it before starting a new spawn
                proc.kill();
            }
            console.log(chalk.green.bold('>>>> Starting process...'));
            proc = spawn('node', [name], { stdio: 'inherit' });
        }, 500);

        chokidar.watch('.')
            .on('add', start)
            .on('change', start)
            .on('unlink', start)
    });

program.parse(process.argv);
