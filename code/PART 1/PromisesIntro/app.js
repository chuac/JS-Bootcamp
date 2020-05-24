/*
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
//
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
*/
//
// Resolving/Rejecting with Values
const fakeRequest = (url) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const pages = {
				'/users' : [
					{id: 1, username: 'Bilbo'},
					{id: 2, username: 'Esmerelda'}
				],
				'/users/1'      : {
					id        : 1,
					username  : 'Bilbo',
					upvotes   : 360,
					city      : 'Lisbon',
					topPostId : 454321
				},
				'/users/5'      : {
					id       : 5,
					username : 'Esmerelda',
					upvotes  : 571,
					city     : 'Honolulu'
				},
				'/posts/454321' : {
					id    : 454321,
					title :
						'Ladies & Gentlemen, may I introduce my pet pig, Hamlet'
				},
				'/about' : 'This is the about page!'
			}
			const data = pages[url];
			if (data) {
				resolve({status: 200, data});
			}
			else {
				reject({status: 404});
			}
		}, 1000);
	})
}

// fakeRequest('/about')
// 	.then((response) => {
// 		console.log(response.status);
// 		console.log(response.data);
// 		console.log("Request OK");
// 	})
// 	.catch((response) => {
// 		console.log(response.status);
// 		console.log('Request failed');
// 	})

// Clean Promise Chaining
// instead of nesting our .then() s, we return the promise object after every step.
// we only need ONE .catch()!
fakeRequest('/users')
	.then((res) => {
		console.log(res);
		const id = res.data[0].id;
		return fakeRequest(`/users/${id}`);
	})
	.then((res) => {
		console.log(res);
		const postId = res.data.topPostId;
		return fakeRequest(`/posts/${postId}`);
	})
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log('OH NO!', err);
	});