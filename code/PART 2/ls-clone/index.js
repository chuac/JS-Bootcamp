#!/usr/bin/env node
// ^ required comment to tell the computer to use Node to execute this file

//// https://nodejs.org/api/fs.html
const fs = require('fs'); // File System module in Node is abbreviated as fs

//// We use the Process module below but it is automatically included in every file

//// https://www.npmjs.com/package/chalk
const chalk = require('chalk');

//// https://nodejs.org/api/path.html
const path = require('path');

//// Method #1 of using Promises. Wrapping lstat inside a Promise
// const lstat = (filename) => {
//     return new Promise((resolve, reject) => {
//         fs.lstat(filename, (err, stats) => {
//             if (err) {
//                 reject(err);
//             }

//             resolve(stats);
//         })
//     })
// }

//// Method #2 of using Promises, util.promisify
// const util = require('util');

// const lstat = util.promisify(fs.lstat);

//// Method #3 of using Promises, using built in Promises API with fs
//// https://nodejs.org/api/fs.html#fs_fspromises_lstat_path_options
const { lstat } = fs.promises; 

const targetDir = process.argv[2] || process.cwd(); // if argv[2] exists, otherwise just default to cwd()

//// https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback
fs.readdir(targetDir, async (err, filenames) => {
    if (err) { // if it is an err object, handle it. err would be null otherwise
        console.log(err);
    }

    const statPromises = filenames.map((filename) => { // array that contains Promises of each lstat call
        return lstat(path.join(targetDir, filename)); // send all the requests for lstat. use path.join to join all path segments together (great cross-platform support)
        ////  https://nodejs.org/api/path.html#path_path_join_paths
    });

    const allStats = await Promise.all(statPromises); // wait for all the Promises to (hopefully) resolve, and save their resolved data in an array

    for (let stats of allStats) { // iterate over the resolved data
        const index = allStats.indexOf(stats); // get an index to access filenames

        if (stats.isFile()) {
            console.log(chalk.white.bold(filenames[index]));
        } else if (stats.isDirectory()) {
            console.log(chalk.green.bold(filenames[index])); // using chalk library to show folders as green and bold
        }
    }
 
});

