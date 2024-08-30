import React, { useEffect, useRef } from 'react';
import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";

const Canvas = () => {
    // Create a ref to the canvas element
    const canvasRef = useRef(null);

    useEffect(() => {
        // Initialize SPLAT renderer and scene only when the component is mounted
        const canvas = canvasRef.current;

        if (!canvas) return;

        const renderer = new SPLAT.WebGLRenderer(canvas);
        const scene = new SPLAT.Scene();
        const camera = new SPLAT.Camera();
        const controls = new SPLAT.OrbitControls(camera, canvas);

        async function main() {
            const url = "https://raw.githubusercontent.com/CedricGuillemet/dump/master/Halo_Believe.splat";

            // Load the .splat file asynchronously
            await SPLAT.Loader.LoadAsync(url, scene, null);

            // Set initial renderer size
            renderer.setSize(window.innerWidth, window.innerHeight);

            // Handle window resize
            const handleResize = () => {
                renderer.setSize(window.innerWidth, window.innerHeight);
            };

            window.addEventListener("resize", handleResize);

            // Animation loop
            const frame = () => {
                controls.update();
                renderer.render(scene, camera);
                requestAnimationFrame(frame);
            };

            requestAnimationFrame(frame);

            // Cleanup function
            return () => {
                window.removeEventListener("resize", handleResize);
                renderer.dispose();
                controls.dispose();
            };
        }

        main();

    }, []); // Empty dependency array ensures this effect only runs once

    return <canvas className='w-full h-full' ref={canvasRef}></canvas>;
};

export default Canvas;
