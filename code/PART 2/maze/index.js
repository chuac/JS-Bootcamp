//console.log('hi');

const { Engine, Render, Runner, World, Bodies, } = Matter; // Matter is imported from cdnjs

const cells = 3; // number of cells in either x-axis or y-axis. doesn't matter since we're just doing square mazes
const width = 600;
const height = 600;

const unitLength = width / cells; // pr height / cells

const engine = Engine.create();
const { world } = engine; // when you create an engine, you get a world along with it
const render = Render.create({
    element: document.body, // "go and render the representation of World inside document.body"
    engine: engine, // specify which engine to use
    options: {
        wireframes: true, // setting to false will show solid shapes
        width: width,
        height: height
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);


// Walls, now dynamically updates depending on height, width of the canvas
const walls = [
    Bodies.rectangle(width / 2, 0, width, 40, {isStatic: true}), // top wall
    Bodies.rectangle(width / 2, height, width, 40, {isStatic: true}), // bottom wall
    Bodies.rectangle(0, height / 2, 40, height, {isStatic: true}), // left wall
    Bodies.rectangle(width, height / 2, 40, height, {isStatic: true}), // right wall
];
World.add(world, walls); // can also pass in an array of shapes/bodies

// Maze generation

const shuffle = (arr) => { // swap with values at random indexes, working from the back
    let counter = arr.length;

    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);

        counter--;

        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

// const grid = [];

// for (let i = 0; i < 3; i++) {
//     grid.push([]);
//     for (let j = 0; j < 3; j++) {
//         grid[i].push(false);
//     }
// }
// Could also generate mazes with above code

// comments are assuming cells is 3
const grid = Array(cells).fill(null).map(() => Array(cells).fill(false));
// ^ we can't just do Array(3).fill([false, false, false]) because it'd fill in 3 arrays that point to the one [false, false, false] in memory.

const verticals = Array(cells).fill(null).map(() => Array(cells - 1).fill(false)); // 3 vertical walls per column but only 2 columns of vertical walls

const horizontals = Array(cells - 1).fill(null).map(() => Array(cells).fill(false)); // 2 rows of horizontal walls but 3 horizontal walls per row 




const stepThroughCell = (row, column) => {
    // if I have visited the cell at [row, column], then return
    if (grid[row][column]) { // true means we've visited here, so get out of here
        return;
    }

    // mark this cell as being visited
    grid[row][column] = true;

    // assemble randomly-ordered list of neightbours, calling our shuffle() function
    const neighbours = shuffle([
        [row - 1, column, 'up'], // cell above
        [row + 1, column, 'down'], // cell below
        [row, column + 1, 'right'], // cell in column to the right
        [row, column - 1, 'left'] // cell column to the left
    ]);

    // for each neighbour..
    for (let neighbour of neighbours) {
        const [neighRow, neighColumn, direction] = neighbour; // destructuring, could also do neighbour[0], and neighbour[1]
    
        // see if that neighbour is out of bounds
        if ((neighRow < 0 || neighColumn < 0) || (neighRow >= cells || neighColumn >= cells)) {
            continue; // do nothing and continue since these neighbours are out of bounds
        }

    // if we have visited that neighbour, continue to next neighbour
        if (grid[neighRow][neighColumn]) {
            continue;
        }

    // remove the wall between here and neighbour, from either horizontals or verticals array
        if (direction === 'left') { // moving left or right will impact only vertical walls
            verticals[row][column - 1] = true; // moving left or right doesn't impact row
        } else if (direction === 'right') {
            verticals[row][column] = true;
        } else if (direction === 'up') { // moving up or down will impact only horizontal walls
            horizontals[row - 1][column] = true; // moving up or down doesn't impact which column of walls you're in
        } else if (direction === 'down') {
            horizontals[row][column] = true;
        }

    // visit that next cell (by calling stepThroughCell())
        stepThroughCell(neighRow, neighColumn); // recursion
    }
    
};

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);
stepThroughCell(startRow, startColumn);
console.log(horizontals);
console.log(verticals);

horizontals.forEach((row, rowIndex) => { // grab each row in horizontals' 2D array
    row.forEach((open, columnIndex) => { // get each wall value in that row
        if (open) { // i.e, if open === true, no wall here
            return;
        }
        console.log(columnIndex, rowIndex);
        const wallX = (columnIndex * unitLength) + (unitLength / 2); // X centerpoint for our wall
        const wallY = (rowIndex + 1) * unitLength; // Y centerpoint for our wall
        const wall = Bodies.rectangle(wallX, wallY, unitLength, 10, {isStatic: true}); // horizontal walls have unitLength size in the X-axis
        World.add(world, wall);
    });
});
