
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

//// Moving creating HTML for our widget inside our JS files to de-couple from our HTML file. Helps with re-usability
const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async (event) => { // could wrap debounce down below too
    const movies = await fetchData(event.target.value);
    
    if (!movies.length) { // if empty movies result, close the dropdown menu and exit function
        dropdown.classList.remove('is-active');
        return;
    }

    resultsWrapper.innerHTML = ''; // empty results before each new call
    dropdown.classList.add('is-active'); // open the dropdown menu. Bulma CSS class
    for (let movie of movies) {
        const option = document.createElement('a'); // an option for the user to click on
        const imgSRC = movie.Poster === 'N/A' ? '' : movie.Poster; // if Poster is 'N/A' from the API
        option.classList.add('dropdown-item'); // Bulma CSS class
        option.innerHTML = `
            <img src="${imgSRC}"/>
            ${movie.Title}
        `;
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active'); // user clicked on an option so we close the dropdown menu
            input.value = movie.Title; // update the input box with the user's selection
            onMovieSelect(movie);
        })
        
        resultsWrapper.appendChild(option);
    }
};

input.addEventListener('input', debounce(onInput, 1000)); // we could wrap debounce around this calling of onInput too

document.addEventListener('click', (event) => { // listen for a click anywhere in the document
    if (!root.contains(event.target)) { // if the click target doesn't contain our 'root' element which contains our dropdown menu stuff
        dropdown.classList.remove('is-active'); // close the dropdown menu! Bulma CSS class
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
    `;
}