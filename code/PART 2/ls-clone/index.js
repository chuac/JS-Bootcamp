#!/usr/bin/env node
// ^ required comment to tell the computer to use Node to execute this file

//// https://nodejs.org/api/fs.html
const fs = require('fs'); // File System module in Node is abbreviated as fs
// the Process module is automatically included in every file

//// https://www.npmjs.com/package/chalk
const chalk = require('chalk');


//// Method #1. Wrapping lstat inside a Promise
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

//// Method #2, util.promisify
// const util = require('util');

// const lstat = util.promisify(fs.lstat);

//// Method #3, using built in Promises API with fs
//// https://nodejs.org/api/fs.html#fs_fspromises_lstat_path_options
const { lstat } = fs.promises; 

//// https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback
fs.readdir(process.cwd(), async (err, filenames) => {
    // EITHER
    // err === an error object, which means something went wrong
    // OR
    // err === null, which means everything is OK

    if (err) { // if it even is defined (which would be if it's an error object)
        console.log(err);
    }

    const statPromises = filenames.map((filename) => { // array that contains Promises of each lstat call
        return lstat(filename); // send all the requests for lstat
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

