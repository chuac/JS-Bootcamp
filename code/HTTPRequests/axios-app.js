const fetchNextPlanets = (url) => {
    return axios.get(url);
}

const printPlanets = ({data}) => { // destructuring and just grabbing the data
    console.log(data);
    for (let planet of data.results) {
        console.log(planet.name);
    }
    return Promise.resolve(data.next);
}

axios.get('https://swapi.dev/api/planets/') // could also improve this line to set a default URL inside fetchNextPlanets
    .then(printPlanets)
    .then(fetchNextPlanets)
    .then(printPlanets)
    .then(fetchNextPlanets)
    .then(printPlanets)
    .catch((err) => {
        console.log(err);
    })