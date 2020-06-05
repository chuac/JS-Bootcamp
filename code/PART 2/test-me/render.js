// take the path to a html document and pass it to JSDOM.fromFile()

const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const render = async (filename) => {
    const filePath = path.join(process.cwd(), filename); // get the absolute path

    const dom = await JSDOM.fromFile(filePath, {
        runScripts: 'dangerously', // we can do this because we know the code we will run is not from an unknown source
        resources: 'usable'
    });

    return dom;
};

module.exports = render;