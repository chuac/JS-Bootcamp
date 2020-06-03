// for our user-facing (not admin) products index
//const layout = require('../layout');

module.exports = ({ products }) => {
    const renderedProducts = products.map((product) => {
        return `
            <li>${product.title} - ${product.price}</li>
        `;
    }).join('');

    return `
        <ul>
            ${renderedProducts}
        </ul>
    `
}