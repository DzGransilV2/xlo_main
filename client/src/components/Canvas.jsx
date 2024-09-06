import React, { useEffect, useRef, useState } from 'react';
import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";

const Canvas = ({ splat }) => {
    // State for loading
    const [loading, setLoading] = useState(true);

    // Create a ref to the canvas element
    const canvasRef = useRef(null);

    useEffect(() => {
        // Initialize SPLAT renderer and scene only when the component is mounted
        const canvas = canvasRef.current;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        if (!canvas) return;

        const renderer = new SPLAT.WebGLRenderer(canvas);
        const scene = new SPLAT.Scene();
        const camera = new SPLAT.Camera();
        const controls = new SPLAT.OrbitControls(camera, canvas);

        async function main() {
            const url = `${splat}`;

            try {
                // Load the .splat file asynchronously
                await SPLAT.Loader.LoadAsync(url, scene, null);

                // Set initial renderer size
                // renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setSize(width, height);


                // Set loading to false after loading completes
                setLoading(false);

                // Handle window resize
                const handleResize = () => {
                    // renderer.setSize(window.innerWidth, window.innerHeight);
                    renderer.setSize(width, height);
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
            } catch (error) {
                console.error("Error loading .splat file:", error);
                setLoading(false); // Stop loading in case of error
            }
        }

        main();

    }, []); // Empty dependency array ensures this effect only runs once

    return (
        <div className="relative w-full h-full">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="spinner border-t-4 border-black rounded-full w-16 h-16 animate-spin"></div>
                    <p className="ml-4">Loading...</p>
                </div>
            )}
            <canvas className='w-full h-full' ref={canvasRef}></canvas>
        </div>
    );
};

export default Canvas;
