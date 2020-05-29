//console.log('hi');

const { Engine, Render, Runner, World, Bodies, Body, Events} = Matter; // Matter is imported from cdnjs

const cells = 6; // number of cells in either x-axis or y-axis. doesn't matter since we're just doing square mazes
const width = 600;
const height = 600;

const unitLength = width / cells; // pr height / cells

const engine = Engine.create();
engine.world.gravity.y = 0; // disable gravity in the y direction
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


// Border Walls, now dynamically updates depending on height, width of the canvas
const walls = [
    Bodies.rectangle(width / 2, 0, width, 2, {isStatic: true}), // top wall, size 2 walls
    Bodies.rectangle(width / 2, height, width, 2, {isStatic: true}), // bottom wall
    Bodies.rectangle(0, height / 2, 2, height, {isStatic: true}), // left wall
    Bodies.rectangle(width, height / 2, 2, height, {isStatic: true}), // right wall
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
stepThroughCell(startRow, startColumn); // start generating maze at random position


// draw horizontal walls
horizontals.forEach((row, rowIndex) => { // grab each row in horizontals' 2D array
    row.forEach((open, columnIndex) => { // get each wall value in that row
        if (open) { // i.e, if open === true, no wall here
            return;
        }
        const wallX = (columnIndex * unitLength) + (unitLength / 2); // X centerpoint for our wall
        const wallY = (rowIndex + 1) * unitLength; // Y centerpoint for our wall
        const wall = Bodies.rectangle(wallX, wallY, unitLength, 5, {isStatic: true, label: 'wall'}); // horizontal walls have unitLength size in the X-axis
        World.add(world, wall);
    });
});

// draw vertical walls
verticals.forEach((row, rowIndex) => { // grab each row in verticals' 2D array
    row.forEach((open, columnIndex) => { // get each wall value in that row
        if (open) { // i.e, if open === true, no wall here
            return;
        }
        const wallX = (columnIndex + 1) * unitLength; // X centerpoint for our wall
        const wallY = (rowIndex * unitLength) + (unitLength / 2); // Y centerpoint for our wall
        const wall = Bodies.rectangle(wallX, wallY, 5, unitLength, {isStatic: true, label: 'wall'}); // vertical walls have unitLength size in the Y-axis
        World.add(world, wall);
    });
});

// Drawing a goal rectangle in the bottom right corner
const goal = Bodies.rectangle(
    width - unitLength / 2, 
    height - unitLength / 2, 
    unitLength * 0.7,
    unitLength * 0.7,
    {
        label: 'goal', // we can access these labels later on in our collision event checker
        isStatic: true
    }
);
World.add(world, goal);

// Drawing ball for user to control, starting at the top left corner
const ball = Bodies.circle(
    unitLength / 2,
    unitLength / 2,
    unitLength * 0.25, // radius
    {
        label: 'ball'
    }
);
World.add(world, ball);

// handling keypresses, arrow keys or WASD
document.addEventListener('keydown', (event) => {
    const {x, y} = ball.velocity; // ball's x and y velocities. from MatterJS after we imported Body

    if (event.keyCode === 38 || event.keyCode === 87) { // ArrowUp or W key
        Body.setVelocity(ball, {x, y: y - 5}); // keep x as it is, but give it negative velocity in the y-axis
    }
    if (event.keyCode === 40 || event.keyCode === 83) { // ArrowDown or S key
        Body.setVelocity(ball, {x, y: y + 5}); // add velocity in the y-axis
    }
    if (event.keyCode === 39 || event.keyCode === 68) { // ArrowRight or D key
        Body.setVelocity(ball, {x: x + 5, y}); // add velocity in the x-axis
    }
    if (event.keyCode === 37 || event.keyCode === 65) { // ArrowLeft or A key
        Body.setVelocity(ball, {x: x - 5, y}); // subtract velocity in the x-axis
    }
});

// Detecting a Win
Events.on(engine, 'collisionStart', (event) => {
    
    event.pairs.forEach((collision) => { // each collision event has a pairs object
        const labels = ['ball', 'goal']; // quick way to use includes() later instead of many if-statements

        if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyA.label)) { // we'll add some fun animation if user wins the maze
            world.gravity.y = 1; // reintroduce gravity
            world.bodies.forEach((body) => { // iterate through all the bodies in the world
                if (body.label === 'wall') { // find the ones we labelled walls
                    Body.setStatic(body, false); // remove their isStatic property
                }
            });
        };
    });
});