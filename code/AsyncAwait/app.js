// function getPlanets() {
//     return axios.get('https://swapi.dev/api/planets/');
// }

// getPlanets()
//     .then((res) => {
//         console.log(res.data);
//     })

//// the below code with await does the exact same thing!

// async function getPlanets() {
//     const res = await axios.get('https://swapi.dev/api/planets/');
//     console.log(res.data); // only runs once the previous line is complete
// }

// getPlanets();

//// now with error handling 

async function getPlanets() {
    try {
        const res = await axios.get('https://swapi.dev/api/planets/');
        console.log(res.data); // only runs once the previous line is complete
    } catch (e) {
        console.log('In CATCH!', e);
    }
}

getPlanets();