// no need to require our actual .js file. Mocha does that for us

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


it('After searching, dropdown opens up', () => {
    const input = document.querySelector('.input');

    input.value = 'avengers';
    input.dispatchEvent(new Event('input')); // fake a DOM event of 'input'

    const dropdown = document.querySelector('.dropdown');

    expect(dropdown.className).to.include('is-active');
});