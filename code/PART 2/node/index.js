const counterObject = require('./myscript.js');

console.log(counterObject.getCounter()); // should return 0
counterObject.incrementCounter();
console.log(counterObject.getCounter()); // should return 1

const newCounterObject = require('./myscript.js');

console.log(newCounterObject.getCounter()); // do we expect 0? nope, it returns 1 because of the require cache