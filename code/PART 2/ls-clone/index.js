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

    const allStats = Array(filenames.length).fill(null);

    for (let filename of filenames) {
        const index = filenames.indexOf(filename); // get loop index

        //// https://nodejs.org/api/fs.html#fs_fs_lstat_path_options_callback
        fs.lstat(filename, (err, stats) => {
            if (err) {
                console.log(err);
            }
            allStats[index] = stats; // contain all the returned stats objects, dont print them first
            const ready = allStats.every((stats) => { // will only return true if EVERY element in allStats is not a falsy value (not null)
                return stats; // null or our actual object
            });

            if (ready) { // we have captured all the returned objects, now we print them out in correct order
                allStats.forEach((stats, index) => {
                    console.log(filenames[index], stats.isFile());
                })
            }
        });
    }
});