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

// class Colour {
// 	constructor(r, g, b, name) { // need to have this constructor named constructor
// 		this.r = r;
// 		this.g = g;
// 		this.b = b;
// 		this.name = name;
// 	}
// 	innerRGB() {
// 		const {r, g, b} = this;
//  		return `${r}, ${g}, ${b}`;
// 	}
// 	rgb() {
//  		return `rgb(${this.innerRGB()})`; // showcasing calling a method from another method within a class
// 	}
// 	rgba(alpha = 1.0) {
// 		return `rgba(${this.innerRGB()}, ${alpha})`;
// 	}
// 	hex() {
// 		const {r, g, b} = this;
// 		return (
// 			'#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
// 		);
// 	}
// }

// const c1 = new Colour(255, 67, 89, 'tomato');


//// More practice with Classes. Code to make HSL colours were provided

class Colour {
	constructor(r, g, b, name) { // need to have this constructor named constructor
		this.r = r;
		this.g = g;
		this.b = b;
		this.name = name;
		this.calcHSL(); // we can call a method straight away in the constructor!
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
	hsl() {
		const {h, s, l} = this;
		return `hsl(${h}, ${s}%, ${l}%)`;
	}
	fullySaturated() {
		const {h, l} = this;
		return `hsl(${h}, 100%, ${l}%)`;
	}
	opposite() {
		const {h, s, l} = this;
		const newHue = (h + 180) % 360;
		return `hsl(${newHue}, ${s}%, ${l}%)`;
	}
	calcHSL() {
		let { r, g, b } = this;
		// Make r, g, and b fractions of 1
		r /= 255;
		g /= 255;
		b /= 255;
	
		// Find greatest and smallest channel values
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;
		if (delta == 0) h = 0;
		else if (cmax == r)
			// Red is max
			h = ((g - b) / delta) % 6;
		else if (cmax == g)
			// Green is max
			h = (b - r) / delta + 2;
		else
			// Blue is max
			h = (r - g) / delta + 4;
	
		h = Math.round(h * 60);
	
		// Make negative hues positive behind 360°
		if (h < 0) h += 360;
		// Calculate lightness
		l = (cmax + cmin) / 2;
	
		// Calculate saturation
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	
		// Multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);

		this.h = h;
		this.s = s;
		this.l = l;
	}
}

let tomato = new Colour(255, 67, 89, 'tomato');
let white = new Colour(255, 255, 255, 'white');

