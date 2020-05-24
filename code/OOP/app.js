//// This function makes and returns an object every time it is called.
//// The resulting objects all follow the same "recipe". Factory Function

// function makeColour(r, g, b) {
// 	const colour = {};
// 	colour.r = r;
// 	colour.g = g;
// 	colour.b = b;

// 	colour.rgb = function() {
// 		const {r, g, b} = this; //instead of hardcoding r, g, b...we use 'this' keyword
// 		return `rgb(${r}, ${g}, ${b})`;
// 	}
// 	colour.hex = function() { // no need for function arguments because we can access the object using 'this'
// 		const {r, g, b} = this;
// 		return (
// 			'#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
// 		);
// 	};
// 	return colour;
// }
// const firstColour = makeColour(35, 255, 150);


//// Constructor Functions and the 'new' keyword
// 1. Creates a blank, plain JavaScript object;
// 2. Links (sets the constructor of) this object to another object;
// 3. Passes the newly created object from Step 1 as the this context;
// 4. Returns this if the function doesn't return an object.

// function Colour(r, g, b) { // looks odd because it doesn't return anything, etc
// 	this.r = r;
// 	this.g = g;
// 	this.b = b;
// 	console.log(this);
// }

// Colour.prototype.rgb = function() {
// 	const {r, g, b} = this;
//  	return `rgb(${r}, ${g}, ${b})`;
// }

// Colour.prototype.hex = function() {
// 	const {r, g, b} = this;
// 	return (
// 		'#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
// 	);
// }

// Colour.prototype.rgba = function(alpha = 1.0) {
// 	const {r, g, b} = this;
// 	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// }

// const colour1 = new Colour(40, 255, 60);
// const colour2 = new Colour(0, 0, 0);


//// Class keyword

class Colour {
	constructor(r, g, b, name) { // need to have this constructor named constructor
		this.r = r;
		this.g = g;
		this.b = b;
		this.name = name;
	}
	innerRGB() {
		const {r, g, b} = this;
 		return `${r}, ${g}, ${b}`;
	}
	rgb() {
 		return `rgb(${this.innerRGB()})`; // showcasing calling a method from another method within a class
	}
	rgba(alpha = 1.0) {
		return `rgba(${this.innerRGB()}, ${alpha})`;
	}
	hex() {
		const {r, g, b} = this;
		return (
			'#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
		);
	}
}

const c1 = new Colour(255, 67, 89, 'tomato');