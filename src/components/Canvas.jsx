import { useEffect, useRef } from "react";
import Matter from "matter-js";

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Set up Matter.js engine
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: canvasRef.current, // Attach to the canvas
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false, // Disable wireframes for a solid appearance
      },
    });

    // Create a ground and boxes tbat can be used in the canvas
    const ground = Matter.Bodies.rectangle(400, 600, 800, 50, {
      isStatic: true,
    });
    const boxA = Matter.Bodies.rectangle(400, 200, 80, 80);
    const boxB = Matter.Bodies.rectangle(450, 50, 80, 80);

    // Add all of the bodies to the world
    Matter.World.add(engine.world, [ground, boxA, boxB]);

    // Run the engine
    Matter.Engine.run(engine);
    Matter.Render.run(render);

    // Clean up on unmount
    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.context = null;
    };
  }, []);

  return <div ref={canvasRef}></div>;
};

export default Canvas;
