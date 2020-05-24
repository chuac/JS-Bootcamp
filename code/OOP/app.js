// This function makes and returns an object every time it is called.
// The resulting objects all follow the same "recipe". Factory Function
function makeColour(r, g, b) {
	const colour = {};
	colour.r = r;
	colour.g = g;
	colour.b = b;

	colour.rgb = function() {
		const {r, g, b} = this; //instead of hardcoding r, g, b...we use 'this' keyword
		return `rgb(${r}, ${g}, ${b})`;
	}
	colour.hex = function() { // no need for function arguments because we can access the object using 'this'
		const {r, g, b} = this;
		return (
			'#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
		);
	};
	return colour;
}
const firstColour = makeColour(35, 255, 150);