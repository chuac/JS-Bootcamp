const assert = require('assert');
const { forEach } = require('../index');


let numbers;
beforeEach(() => {
    numbers = [1, 2, 3];
});

it('Should sum an array', () => {
    const numbers = [1, 2, 3];

    let total = 0;
    forEach(numbers, (value) => {
        total += value;
    });

    //expect(total).to.be.equal(6);
    assert.strictEqual(total, 6);

    // destroying the numbers array to make sure the test below works (testing beforeEach)
    numbers.push(4);
    numbers.push(5);
    numbers.push(6);
    numbers.push(7);
});

it('beforeEach is ran each time', () => {
    assert.strictEqual(numbers.length, 3);
});
