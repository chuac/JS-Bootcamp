const colours = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'indigo', 'violet'];

const changeColour = function() { // since we have no parameters set in our function, we're simply ignoring the event object. haven't learned this yet
	const h1 = document.querySelector('h1');
	h1.style.color = this.style.backgroundColor; 
	// 'this' changes depending on with which scope was this changeColour was invoked. here it is when that box was clicked
}

const container = document.querySelector('#boxes');
for (let colour of colours) {
	const box = document.createElement('div');
	box.classList.add('box');
	box.style.backgroundColor = colour;
	container.appendChild(box);
	box.addEventListener('click', changeColour); // the scope of this box div will be used to run the 'this' code
	
}

//
// from video #158 about Key Events
const addItemInput = document.querySelector('#addItem');
const itemsUL = document.querySelector('#items');

addItemInput.addEventListener('keypress', function(e) {
	if (!this.value) { // no input given by user
		return;
	}
	if (e.key === 'Enter') {
		const newLI = document.createElement('li');
		newLI.innerText = this.value;
		itemsUL.appendChild(newLI);
	}
})