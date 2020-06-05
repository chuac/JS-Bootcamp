const assert = require('assert');
const { forEach } = require('../index');

it('Should sum an array', () => {
    const numbers = [1, 2, 3];

    let total = 0;
    forEach(numbers, (value) => {
        total += value;
    });

    //expect(total).to.be.equal(6);
    assert.strictEqual(total, 6);
})