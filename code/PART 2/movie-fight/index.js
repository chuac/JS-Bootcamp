
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
        
        resultsWrapper.appendChild(option);
    }
};

input.addEventListener('input', debounce(onInput, 1000)); // we could wrap debounce around this calling of onInput too

document.addEventListener('click', (event) => { // listen for a click anywhere in the document
    if (!root.contains(event.target)) { // if the click target doesn't contain our 'root' element which contains our dropdown menu stuff
        dropdown.classList.remove('is-active'); // close the dropdown menu! Bulma CSS class
    }
});