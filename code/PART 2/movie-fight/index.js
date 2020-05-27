
const fetchData = async (searchTerm) => {
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

createAutoComplete({ // give it one root element to render our autocomplete into
    root: document.querySelector('.autocomplete')
});
createAutoComplete({
    root: document.querySelector('.autocomplete-two')
});
createAutoComplete({
    root: document.querySelector('.autocomplete-three')
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