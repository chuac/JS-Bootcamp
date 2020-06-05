const assert = require('assert');

it('has a text input', async () => {
    const dom = await render('index.html'); // render was made a global variable so no need to import it into here

    const input = dom.window.document.querySelector('input');

    assert(input); // would throw an error if 'input' evaluates to a falsy value (like null)
});