#!/usr/bin/env node
// Creating our own testing framework that can be run in any directory with CLI-arg of "tme"

const Runner = require('./runner');
const runner = new Runner();


const run = async () => { // need this helper function to call await functions
    await runner.collectFiles(process.cwd()); // process.cwd() to get the path whereever this app is run (by calling tme)
    console.log(runner.testFiles);
    
};
run();