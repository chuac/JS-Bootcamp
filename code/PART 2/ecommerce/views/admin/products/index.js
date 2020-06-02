// file called index because we associate showing a listing of things as the index action
const layout = require('../layout');


module.exports = ({ products }) => {
    const renderedProducts = products.map((product) => { 
        return `
            <div>${product.title}</div>
        `; // .map() returns an array of strings
    }).join(''); // but .join with an empty string will join all the strings into one big string


    return layout({
        content: `
            <h1 class="title">Products</h1>
            ${renderedProducts}
        `
    });
};