#!/usr/bin/env node
// ^ required comment to tell the computer to use Node to execute this file

//// https://nodejs.org/api/fs.html
const fs = require('fs'); // File System module in Node is abbreviated as fs
// the Process module is automatically included in every file


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

    for (let filename of filenames) {
        try {
            const stats = await lstat(filename);

            console.log(filename, stats.isFile());
        } catch (err) {
            console.log(err);
        }
    }
 
});

