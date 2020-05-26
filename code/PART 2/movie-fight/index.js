
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: { // param keys all lowercase
            apikey: 'e7a59c4a',
            s: searchTerm
        }
    });
    console.log(response.data);
}


const input = document.querySelector('input');

const debounce = (func, delay = 1000) => { // implemented a reusable debounce
    let timeoutId;
    return (...args) => { // grab all the args that was passed in with this func, and pass it along
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => { // introduces a delay to actually calling the API
            func.apply(null, args); // return all those args that was passed along, using apply
        }, delay); // non-hardcoded delay
    }
}

const onInput = debounce((event) => { // could wrap debounce down below too
    fetchData(event.target.value);
}, 1000);

input.addEventListener('input', onInput); // we could wrap debounce around this calling of onInput too