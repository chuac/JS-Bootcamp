//console.log('hi');

const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter; // Matter is imported from cdnjs

const width = 800;
const height = 600;

const engine = Engine.create();
const { world } = engine; // when you create an engine, you get a world along with it
const render = Render.create({
    element: document.body, // "go and render the representation of World inside document.body"
    engine: engine, // specify which engine to use
    options: {
        wireframes: false, // setting to false will show solid shapes
        width: width,
        height: height
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);

// adding ability to click-and-drag shapes
World.add(world, MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
}));

// Walls
const walls = [
    Bodies.rectangle(400, 0, 800, 40, {isStatic: true}), // top wall
    Bodies.rectangle(400, 600, 800, 40, {isStatic: true}), // bottom wall
    Bodies.rectangle(0, 300, 40, 600, {isStatic: true}), // left wall
    Bodies.rectangle(800, 300, 40, 600, {isStatic: true}), // right wall
];
World.add(world, walls); // can also pass in an array of shapes/bodies

// Random Shapes starting at random positions
for (let i = 0; i < 20; i++) {
    if (Math.random() > 0.5) { // randomiser
        World.add(world, Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50, {}));
    } else {
        World.add(world, Bodies.circle(Math.random() * width, Math.random() * height, 35, {
            render: {
                fillStyle: 'green' // all circles will be green now
            }
        }));
    }
    
}
