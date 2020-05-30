#!/usr/bin/env node

//// https://www.npmjs.com/package/chokidar
const chokidar = require('chokidar');
//// https://www.npmjs.com/package/lodash.debounce
const debounce = require('lodash.debounce');


const start = debounce(() => {
    console.log('starting program');
}, 100);

chokidar.watch('.')
    .on('add', start)
    .on('change', () => { console.log('file changed')})
    .on('unlink', () => { console.log('file unliked')})