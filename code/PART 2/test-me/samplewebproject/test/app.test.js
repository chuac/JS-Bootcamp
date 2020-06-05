const assert = require('assert');

it('has a text input', async () => {
    const dom = await render('index.html'); // render was made a global variable so no need to import it into here

    const input = dom.window.document.querySelector('input');

    assert(input); // would throw an error if 'input' evaluates to a falsy value (like null)
});

it('shows a success message with a valid email', async () => {
    const dom = await render('index.html');

    const input = dom.window.document.querySelector('input');
    input.value = 'zzzz@zzzzz.com';

    dom.window.document
        .querySelector('form')
        .dispatchEvent(new dom.window.Event('submit')); // fake a submit event
    
    const h1 = dom.window.document.querySelector('h1');

    assert.strictEqual(h1.innerHTML, 'Looks good!');

});