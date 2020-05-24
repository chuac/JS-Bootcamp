function isTouching(a, b) { // code provided to us
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const avatar = document.querySelector('#player');
const coin = document.querySelector('#coin');

window.addEventListener('keyup', function(e) {
	if (e.key === 'ArrowDown') {
		const currTop = extractPos(avatar.style.top); // the top value actually starts as an empty string so we set it default to 0 in extractPos()
		avatar.style.top = `${currTop + 50}px`;
	}
	else if (e.key === 'ArrowUp') {
		const currTop = extractPos(avatar.style.top); // the top value actually starts as an empty string so we set it default to 0 in extractPos()
		avatar.style.top = `${currTop - 50}px`;
	}
	else if (e.key === 'ArrowRight') {
		const currLeft = extractPos(avatar.style.left); // the top value actually starts as an empty string so we set it default to 0 in extractPos()
		avatar.style.left = `${currLeft + 50}px`;
		avatar.style.transform = 'scale(1, 1)';
	}
	else if (e.key === 'ArrowLeft') {
		const currLeft = extractPos(avatar.style.left); // the top value actually starts as an empty string so we set it default to 0 in extractPos()
		avatar.style.left = `${currLeft - 50}px`;
		avatar.style.transform = 'scale(-1, 1)';
	}
	
	if (isTouching(avatar, coin)) {
		moveCoin();
	}
})

const extractPos = (pos) => { // processing the position of current avatar
	if (!pos) return 100; // default position at 100px, as set in our CSS file
	return parseInt(pos.slice(0, -2)); // remove trailing "px" from the string
}

const moveCoin = () => {
	const x = Math.floor(Math.random() * window.innerWidth);
	const y = Math.floor(Math.random() * window.innerHeight);
	coin.style.left = `${x}px`;
	coin.style.top = `${y}px`;
}

moveCoin(); // when code is first run