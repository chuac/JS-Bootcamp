const btn = document.querySelector('button');

// setTimeout(() => {
// 	btn.style.transform = `translateX(100px)`;
// 	setTimeout(() => {
// 		btn.style.transform = `translateX(200px)`;
// 		setTimeout(() => {
// 			btn.style.transform = `translateX(300px)`;
// 			setTimeout(() => {
// 				btn.style.transform = `translateX(400px)`;
// 				setTimeout(() => {
// 					btn.style.transform = `translateX(500px)`;
// 				}, 1000);
// 			}, 1000);
// 		}, 1000);
// 	}, 1000);
// }, 1000);

const moveX = (element, amount, delay, onSuccess, onFailure) => { // instead of just one callback available, we now have two callback paths: onSuccess, onFailure
	const bodyBoundary = document.body.clientWidth;
	const elRight = element.getBoundingClientRect().right;
	const currLeft = element.getBoundingClientRect().left; // the el's current pos so we can just add this to the translate amount requested
	
	if (elRight + amount > bodyBoundary) { // user is wanting to move outside the body width
		onFailure();
	}
	else {
		setTimeout(() => {
			element.style.transform = `translateX(${currLeft + amount}px)`;
			onSuccess(); // passed in a callback function so we could "nest" easily
		}, delay);
	}
	
	
}

// moveX(btn, 100, 1000, () => {
// 	moveX(btn, 100, 1000, () => {
// 		moveX(btn, 100, 1000, () => {
// 			moveX(btn, 100, 1000, () => {
// 				moveX(btn, 500, 1000);
// 			});
// 		});
// 	});
// });



/* //This function moves an element "amount" number of pixels after a delay.
//If the element will stay on screen, we move the element and call the onSuccess callback function
//If the element will move off screen, we do not move the element and instead call the onFailure callback
const moveX = (element, amount, delay, onSuccess, onFailure) => {
	setTimeout(() => {
		const bodyBoundary = document.body.clientWidth;
		const elRight = element.getBoundingClientRect().right;
		const currLeft = element.getBoundingClientRect().left;
		if (elRight + amount > bodyBoundary) {
			onFailure();
		}
		else {
			element.style.transform = `translateX(${currLeft + amount}px)`;
			onSuccess();
		}
	}, delay);
};
*/
// LOOK AT THIS UGLY MESS!
moveX(btn, 300, 1000, () => {
	//success callback
	moveX(
		btn,
		300,
		1000,
		() => {
			//success callback
			moveX(
				btn,
				300,
				1000,
				() => {
					//success callback
					moveX(
						btn,
						300,
						1000,
						() => {
							//success callback
							moveX(
								btn,
								300,
								1000,
								() => {
									//success callback
									alert('YOU HAVE A WIDE SCREEN!');
								},
								() => {
									//failure callback
									alert('CANNOT MOVE FURTHER!');
								}
							);
						},
						() => {
							//failure callback
							alert('CANNOT MOVE FURTHER!');
						}
					);
				},
				() => {
					//failure callback
					alert('CANNOT MOVE FURTHER!');
				}
			);
		},
		() => {
			//failure callback
			alert('CANNOT MOVE FURTHER!');
		}
	);
},
	() => {
		//failure callback
		alert('CANNOT MOVE FURTHER!');
	}
);


