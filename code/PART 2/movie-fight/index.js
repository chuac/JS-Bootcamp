
const autoCompleteConfig = {
    renderOption(movie) { // how we want our options in the dropdown menu to look like
        const imgSRC = movie.Poster === 'N/A' ? '' : movie.Poster; // if Poster is 'N/A' from the API
        return `
            <img src="${imgSRC}"/>
            ${movie.Title} (${movie.Year})
        `; // simply make changes to these dropdown menu options right here
    },
    inputValueWhenClicked(movie) { // tell the widget what value to insert into input box's value when an option is selected
        return movie.Title;
    },
    async fetchData(searchTerm) {
        const response = await axios.get('http://www.omdbapi.com/', {
            params: { // param keys all lowercase
                apikey: 'e7a59c4a',
                s: searchTerm
            }
        });
        if (response.data.Error) { // we didn't get any results
            return []; // return an empty array so our iteration down below doesn't break
        }
        return response.data.Search; // the API's key is using capital S
    }
};

// pass a "config" object that contains all we need to customise our autocomplete for what we want. in this case: movies
createAutoComplete({ // we only need to change the root element, so we can store rest of code in config object above
    ...autoCompleteConfig, // spread autoCompleteConfig into here
    root: document.querySelector('#left-autocomplete'), // give it one root element to render our autocomplete into
    onOptionSelect(movie) { // tell the widget which function to run when an option is selected
        document.querySelector('.tutorial').classList.add('is-hidden'); // hide tutorial when option selected. Bulma CSS class
        onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
    },
});
createAutoComplete({
    ...autoCompleteConfig, // make a copy of autoCompleteConfig and put into here
    root: document.querySelector('#right-autocomplete'), // give it one root element to render our autocomplete into
    onOptionSelect(movie) { // tell the widget which function to run when an option is selected
        document.querySelector('.tutorial').classList.add('is-hidden'); // hide tutorial when option selected. Bulma CSS class
        onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
    },
});

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => { // summary element to insert into no-longer hardcoded
    const response = await axios.get('http://www.omdbapi.com/', {
        params: { // param keys all lowercase
            apikey: 'e7a59c4a',
            i: movie.imdbID // as stated with API usage
        }
    });
    summaryElement.innerHTML = movieTemplate(response.data);

    if (side === 'left') {
        leftMovie = response.data;
    } else {
        rightMovie = response.data;
    }
    if (leftMovie && rightMovie) { // if user has selected two movies then we can run a comparison
        runComparison();
    }
};

const runComparison = () => {
    const leftSideStats = document.querySelectorAll('#left-summary .notification'); // select all the summary elements from that side
    const rightSideStats = document.querySelectorAll('#right-summary .notification');

    leftSideStats.forEach((leftStat, index) => {
        rightStat = rightSideStats[index];

        const leftSideValue = parseInt(leftStat.dataset.value); // dataset values are stored as strings in the DOM
        const rightSideValue = parseInt(rightStat.dataset.value);

        if (leftSideValue < rightSideValue) {
            leftStat.classList.remove('is-primary');
            leftStat.classList.add('is-warning'); // Bulma CSS classes
        } else if (leftSideValue > rightSideValue) { // extra check since we may have equal values sometimes
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-warning');
        }
    })
};

const movieTemplate = (movieDetail) => { // movieDetail is the more in-depth movie object, as per API
    //const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')); // BoxOffice doesn't seem to have values anymore at the API
    const dollars = 0; // since the Box Office data doesn't seem to be working with the API. Just set to 0 for all
    const metaScore = parseInt(movieDetail.Metascore);
    const imdbRating = parseFloat(movieDetail.imdbRating);
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));

    const awards = movieDetail.Awards.split(' ').reduce((prev, word) => { // go through the string and tally up the numbers
        const value = parseInt(word); // will return NaN if the string doesn't contain a number

        if (isNaN(value)) { // no number found in this string
            return prev;
        } else {
            return prev + value;
        }
    }, 0);

    
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}"/>
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article data-value=${awards} class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value=${dollars} class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">BoxOffice</p>
        </article>
        <article data-value=${metaScore} class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article data-value=${imdbRating} class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article data-value=${imdbVotes} class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `; // Bulma CSS classes
}