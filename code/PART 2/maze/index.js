//console.log('hi');

const { Engine, Render, Runner, World, Bodies } = Matter; // Matter is imported from cdnjs

const engine = Engine.create();
const { world } = engine; // when you create an engine, you get a world along with it
const render = Render.create({
    element: document.body, // "go and render the representation of World inside document.body"
    engine: engine, // specify which engine to use
    options: {
        width: 800,
        height: 600
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);

const shape = Bodies.rectangle(200, 200, 100, 200, { // create a shape/Body. centerpoint at 200, 200. Width 100, height 200
    isStatic: true // we want the body to never move
});
World.add(world, shape); // add the shape to our world object