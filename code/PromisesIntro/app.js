// PROMISES Intro
const willGetYouADog = new Promise((resolve, reject) => {
	const rand = Math.random();
	if (rand > 0.5) {
		resolve();
	} else {
		reject();
	}
});

willGetYouADog.then(() => {
	console.log('YAY We got a dog!');
});
willGetYouADog.catch(() => {
	console.log(':( nooo');
})

// Returning Promises from Functions
const makeDogPromise = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const rand = Math.random();
			if (rand < 0.5) {
				resolve();
			}
			else {
				reject();
			}
		}, 5000);
	});
};
makeDogPromise()
	.then(() => {
		console.log('YAY WE GOT A DOG!!!!');
	})
	.catch(() => {
		console.log(':( NO DOG');
	});
