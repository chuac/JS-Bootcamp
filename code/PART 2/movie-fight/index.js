// pass a "config" object that contains all we need to customise our autocomplete for what we want. in this case: movies
createAutoComplete({ 
    root: document.querySelector('.autocomplete'), // give it one root element to render our autocomplete into
    renderOption(movie) { // how we want our options in the dropdown menu to look like
        const imgSRC = movie.Poster === 'N/A' ? '' : movie.Poster; // if Poster is 'N/A' from the API
        return `
            <img src="${imgSRC}"/>
            ${movie.Title} (${movie.Year})
        `; // simply make changes to these dropdown menu options right here
    },
    onOptionSelect(movie) { // tell the widget which function to run when an option is selected
        onMovieSelect(movie);
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
});


const onMovieSelect = async (movie) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: { // param keys all lowercase
            apikey: 'e7a59c4a',
            i: movie.imdbID // as stated with API usage
        }
    });
    document.querySelector('#summary').innerHTML = movieTemplate(response.data);
}

const movieTemplate = (movieDetail) => { // movieDetail is the more in-depth movie object, as per API
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
        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">BoxOffice</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `; // Bulma CSS classes
}