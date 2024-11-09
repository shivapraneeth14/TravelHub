import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

const ModelViewer = ({ modelUrl }) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null); // For storing the scene
    const cameraRef = useRef(null); // For storing the camera
    const rendererRef = useRef(null); // For storing the renderer

    useEffect(() => {
        // Create the scene, camera, and renderer only once
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2, 5); // Adjust the camera position as needed

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;

        // Add lighting to the scene
        const light = new THREE.AmbientLight(0x404040, 2); // Soft ambient light
        scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Strong directional light
        directionalLight.position.set(10, 10, 10).normalize();
        scene.add(directionalLight);

        // Load the 3D model
        const loader = new GLTFLoader();
        loader.load(modelUrl, (gltf) => {
            console.log("modelurl", modelUrl);
            scene.add(gltf.scene);
            animate();

            // Optional: Export the loaded model to GLTF
            exportModel(gltf.scene);
        }, undefined, (error) => {
            console.error('An error occurred while loading the model:', error);
        });

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        // Cleanup on component unmount
        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };
    }, [modelUrl]);

    // Function to export the model to GLTF
    const exportModel = (scene) => {
        const exporter = new GLTFExporter();
        exporter.parse(scene, (result) => {
            const gltfJson = JSON.stringify(result, null, 2);
            // You can save this to a file or do something else with it
            console.log('Exported GLTF:', gltfJson);
        }, { binary: false });
    };

    return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ModelViewer;
