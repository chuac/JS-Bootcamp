// no need to require our actual .js file. Mocha does that for us

const waitFor = (selector) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if (document.querySelector(selector)) {
                clearTimeout(timeout); // the DOM element has appeared, clear the timeout below
                resolve();
            }
        }, 30); // check the DOM for the element, every 30ms
        
        const timeout = setTimeout(() => {
            clearInterval(interval); // stop the interval above
            reject(); // if the element hasn't appeared after 2000ms, then we won't keep waiting for it
        }, 2000); // wait up to a max of 2000ms
    });
};


beforeEach(() => { // runs before every test
    document.querySelector('#target').innerHTML = '';

    createAutoComplete({
        root: document.querySelector('#target'),
        fetchData() { // just some fake data
            return [
                { Title: 'Avengers' },
                { Title: 'Not Avengers' },
                { Title: 'Some other movie' }
            ]
        },
        renderOption(movie) {
            return movie.Title;
        }
    });
    // makes sure we rebuild a clean autocomplete widget before every test
})


it('Dropdown starts closed', () => {
    const dropdown = document.querySelector('.dropdown');
    // make sure dropdown element starts off being closed. no "is-active" class
    expect(dropdown.className).not.to.include('is-active'); // check Chai Assertion Library documentation
});


it('After searching, dropdown opens up', async () => {
    const input = document.querySelector('.input');
    input.value = 'avengers';
    input.dispatchEvent(new Event('input')); // fake a DOM event of 'input'

    await waitFor('.dropdown-item') // wait for that element to appear, otherwise the code below would fail instantly

    const dropdown = document.querySelector('.dropdown');

    expect(dropdown.className).to.include('is-active');
});


it('After searching, displays some results', async () => {
    const input = document.querySelector('.input');
    input.value = 'avengers';
    input.dispatchEvent(new Event('input')); // fake a DOM event of 'input'

    await waitFor('.dropdown-item') // wait for that element to appear, otherwise the code below would fail instantly

    const items = document.querySelectorAll('.dropdown-item'); // each item in the dropdown menu has class of dropdown-item

    expect(items.length).to.equal(3); // expecting 3 movies in the dropdown menu
})