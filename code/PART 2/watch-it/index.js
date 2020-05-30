#!/usr/bin/env node

//// https://nodejs.org/api/fs.html
const fs = require('fs');
//// https://www.npmjs.com/package/chokidar
const chokidar = require('chokidar');
//// https://www.npmjs.com/package/lodash.debounce
const debounce = require('lodash.debounce');
//// https://www.npmjs.com/package/caporal
const program = require('caporal'); // the use of name 'program' is recommended in the Caporal docs


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
        
        console.log(args);
    });

program.parse(process.argv);


const start = debounce(() => {
    console.log('starting program');
}, 100);

chokidar.watch('.')
    .on('add', start)
    .on('change', start)
    .on('unlink', start)