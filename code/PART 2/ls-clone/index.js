#!/usr/bin/env node
// ^ required comment to tell the computer to use Node to execute this file

//// https://nodejs.org/api/fs.html
const fs = require('fs'); // File System module in Node is abbreviated as fs
// the Process module is automatically included in every file

//// https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback
fs.readdir(process.cwd(), (err, filenames) => {
    // EITHER
    // err === an error object, which means something went wrong
    // OR
    // err === null, which means everything is OK

    if (err) { // if it even is defined (which would be if it's an error object)
        console.log(err);
    }

    // Purposely buggy implementation. Doesn't take into account the system may take time to return
    // Our files when printed out could be in random order
    for (let filename of filenames) {
        //// https://nodejs.org/api/fs.html#fs_fs_lstat_path_options_callback
        fs.lstat(filename, (err, stats) => {
            if (err) {
                console.log(err);
            }
            console.log(filename, stats.isFile());
        });
    }
});