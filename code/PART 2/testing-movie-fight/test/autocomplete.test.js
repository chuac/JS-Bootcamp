// no need to require our actual .js file. Mocha does that for us

it('Shows an autocomplete widget', () => {
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

    const dropdown = document.querySelector('.dropdown');
    // make sure dropdown element starts off being closed. no "is-active" class
    expect(dropdown.className).not.to.include('is-active'); // check Chai Assertion Library documentation
});


