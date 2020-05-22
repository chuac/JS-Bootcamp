//// XHR Basics

// const firstReq = new XMLHttpRequest();
// firstReq.addEventListener('load', function() { // assigning a load callback to the XHR object
// 	console.log('Request worked!');
// 	const data = JSON.parse(this.responseText);
// 	for (let planet of data.results) {
// 		console.log(planet.name);
// 	}
// });
// firstReq.addEventListener('error', () => {
// 	console.log('ERROR!');
// });
// firstReq.open('GET', 'https://swapi.dev/api/planets/');
// firstReq.send(); // handled by the browser, like with setTimeout. JS moves on.
// console.log('Request Sent!');


//// Chaining XHR requests. Messy!

// const firstReq = new XMLHttpRequest();
// firstReq.addEventListener('load', function() { // assigning a load callback to the XHR object
// 	console.log('First Request worked!');
// 	const data = JSON.parse(this.responseText);

// 	const filmURL = data.results[0].films[0];
// 	const filmReq = new XMLHttpRequest();
// 	filmReq.addEventListener('load', function() {
// 		console.log('Second Request worked!');
// 		//console.log(this);
// 		const filmData = JSON.parse(this.responseText);
// 		console.log(filmData.title);
// 	})
// 	filmReq.addEventListener('error', (e) => {
// 		console.log('Second Req ERROR!', e);
// 	})
// 	filmReq.open('GET', filmURL);
// 	filmReq.send();
// 	console.log('Second Request Sent!');
// });
// firstReq.addEventListener('error', () => {
// 	console.log('First Req ERROR!');
// });
// firstReq.open('GET', 'https://swapi.dev/api/planets/');
// firstReq.send(); // handled by the browser, like with setTimeout. JS moves on.
// console.log('First Request Sent!');


//// Fetch, a new way!

// fetch('https://swapi.dev/api/planets/')
// 	.then((response) => {
// 		if (!response.ok) {
// 			throw new Error(`Status Code Error: ${response.status}`); // throwing error will trigger our catch
// 		}
// 		else {
// 			response.json().then((data) => {
// 				for (let planet of data.results) {
// 					console.log(planet.name);
// 				}
// 			})
// 		}
// 	})
// 	.catch((err) => { // but doesn't catch when we receive 404 error! only when internet not working
// 		console.log('Something went wrong with Fetch');
// 		console.log(err);
// 	})


//// Chaining Fetch requests, cleaner with Promises!

fetch('https://swapi.dev/api/planets/')
	.then((response) => {
		if (!response.ok) {
			throw new Error(`Status Code Error: ${response.status}`); // throwing error will trigger our catch
		}
		return response.json();
	})
	.then((data) => {
		console.log('Fetched planets data');
		const filmURL = data.results[0].films[0];
		return fetch(filmURL);
	})
	.then((response) => {
		if (!response.ok) {
			throw new Error(`Status Code Error: ${response.status}`); // throwing error will trigger our catch
		}
		return response.json();
	})
	.then((data) => {
		console.log('Fetched film data');
		console.log(data.title);
	})
	.catch((err) => { // but doesn't catch when we receive 404 error! only when internet not working
		console.log('Something went wrong with Fetch');
		console.log(err);
	})
