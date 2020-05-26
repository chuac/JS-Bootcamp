
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

let timeoutId;
const onInput = (event) => {
    if (timeoutId) { // checks if we had already started a request recently, if so: cancel the previous request (which was waiting to run because of the setTimeout)
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => { // introduces a delay to actually calling the API
        fetchData(event.target.value);
    }, 1000);
};

input.addEventListener('input', onInput);