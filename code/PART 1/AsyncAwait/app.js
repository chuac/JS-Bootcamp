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

// async function getPlanets() {
//     try {
//         const res = await axios.get('https://swapi.dev/api/planets/');
//         console.log(res.data); // only runs once the previous line is complete
//     } catch (e) {
//         console.log('In CATCH!', e);
//     }
// }

// getPlanets();

////------------------------------------------------------------------------------
//// Improving Callback Hell code using AsyncAwait

// const moveX = (element, amount, delay) => { // instead of just one callback available, we now have two callback paths: onSuccess, onFailure
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			const bodyBoundary = document.body.clientWidth;
// 			const elRight = element.getBoundingClientRect().right;
// 			const currLeft = element.getBoundingClientRect().left; // the el's current pos so we can just add this to the translate amount requested
// 			if (elRight + amount > bodyBoundary) { // user is wanting to move outside the body width
// 				reject({bodyBoundary, elRight, amount});
// 			}
// 			else {
// 				element.style.transform = `translateX(${currLeft + amount}px)`;
// 				resolve();
// 			}
// 		}, delay);
// 	});
// };

// const btn = document.querySelector('button');

// async function animateRight(el) {
//     await moveX(el, 100, 1000);
//     await moveX(el, 100, 1000);
//     await moveX(el, 100, 1000);
//     await moveX(el, 100, 1000);
//     await moveX(el, 100, 1000);
//     await moveX(el, 100, 1000);
//     await moveX(el, 100, 1000);
//     await moveX(el, 100, 1000);
// }

// animateRight(btn)
//     .catch((err) => {
//         console.log('All Done!');
//     });

//// Parallel vs Sequential Requests

//// SEQUENTIAL REQUESTS! One after another, slower
// async function get3Pokemon() {
//     const poke1 = await axios.get('https://pokeapi.co/api/v2/pokemon/1/');
//     const poke2 = await axios.get('https://pokeapi.co/api/v2/pokemon/2/');
//     const poke3 = await axios.get('https://pokeapi.co/api/v2/pokemon/3/');
//     console.log(poke1.data);
//     console.log(poke2.data);
//     console.log(poke3.data);
// }
// get3Pokemon();

//// PARALLEL REQUESTS! The requests have no relation to each other so they can all finish independently. Faster this way
// async function get3Pokemon() {
//     const prom1 = axios.get('https://pokeapi.co/api/v2/pokemon/1/');
//     const prom2 = axios.get('https://pokeapi.co/api/v2/pokemon/2/');
//     const prom3 = axios.get('https://pokeapi.co/api/v2/pokemon/3/');
//     const poke1 = await prom1;
//     const poke2 = await prom2;
//     const poke3 = await prom3;
//     console.log(poke1.data);
//     console.log(poke2.data);
//     console.log(poke3.data);
// }
// get3Pokemon();

//// Refactoring PARALLEL Reqs with Promise.all

async function get3Pokemon() {
    const prom1 = axios.get('https://pokeapi.co/api/v2/pokemon/1/');
    const prom2 = axios.get('https://pokeapi.co/api/v2/pokemon/2/');
    const prom3 = axios.get('https://pokeapi.co/api/v2/pokemon/3/');
    const results = await Promise.all([ prom1, prom2, prom3 ]);
    printPokemon(results);
}

function printPokemon(results) {
    for (let pokemon of results) {
        console.log(pokemon.data.name);
    }
}

get3Pokemon();