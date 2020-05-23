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

const moveX = (element, amount, delay) => { // instead of just one callback available, we now have two callback paths: onSuccess, onFailure
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const bodyBoundary = document.body.clientWidth;
			const elRight = element.getBoundingClientRect().right;
			const currLeft = element.getBoundingClientRect().left; // the el's current pos so we can just add this to the translate amount requested
			if (elRight + amount > bodyBoundary) { // user is wanting to move outside the body width
				reject({bodyBoundary, elRight, amount});
			}
			else {
				element.style.transform = `translateX(${currLeft + amount}px)`;
				resolve();
			}
		}, delay);
	});
};

const btn = document.querySelector('button');

async function animateRight(el) {
    await moveX(el, 100, 1000);
    await moveX(el, 100, 1000);
    await moveX(el, 100, 1000);
    await moveX(el, 100, 1000);
    await moveX(el, 100, 1000);
    await moveX(el, 100, 1000);
    await moveX(el, 100, 1000);
    await moveX(el, 100, 1000);
}

animateRight(btn)
    .catch((err) => {
        console.log('All Done!');
    });