
//http://www.omdbapi.com/?apikey=e7a59c4a
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: { // all lowercase
            apikey: 'e7a59c4a',
            s: searchTerm
        }
    });
    console.log(response.data);
}


const input = document.querySelector('input');
input.addEventListener('input', (event) => {
    fetchData(event.target.value);
})