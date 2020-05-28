//console.log('hi');

const { Engine, Render, Runner, World, Bodies, } = Matter; // Matter is imported from cdnjs

const cells = 3; // number of cells in either x-axis or y-axis. doesn't matter since we're just doing square mazes
const width = 600;
const height = 600;

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

console.log(grid, verticals, horizontals);
