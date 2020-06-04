// testing index.js

// https://nodejs.org/api/assert.html
const assert = require('assert');

const { forEach, map } = require('./index');


// const test = (desc, fn) => {
//     console.log('----', desc);
//     try { // now the testing app will continue testing even when there is one error
//         fn();
//     } catch (err) {
//         console.log(err.message);
//     }
// }


it('The forEach function', () => {
    let sum = 0;
    forEach([1, 2, 3], (value) => {
        sum += value;
    });

    assert.strictEqual(sum, 6, 'Expected forEach to sum the array');
});

it('The map function', () => {
    const result = map([1, 2, 3], (value) => {
        return value * 2;
    });
    // result === [2, 4, 6]

    // assert.strictEqual(result[0], 2); // optional extra error message
    // assert.strictEqual(result[1], 4);
    // assert.strictEqual(result[2], 6);

    assert.deepStrictEqual(result, [2, 4, 6]); // can also use deepStrictEqual instead of strictEqual
})


