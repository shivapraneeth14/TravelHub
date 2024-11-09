// src/ThreeModel.js
import React, { useEffect } from 'react';
import * as THREE from 'three';

const ThreeModel = () => {
//     useEffect(() => {
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         const renderer = new THREE.WebGLRenderer();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         document.body.appendChild(renderer.domElement);

//         // Create a simple floor (plane)
//         const floorGeometry = new THREE.PlaneGeometry(10, 10);
//         const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xa0a0a0, side: THREE.DoubleSide });
//         const floor = new THREE.Mesh(floorGeometry, floorMaterial);
//         floor.rotation.x = Math.PI / 2;
//         scene.add(floor);

//         // Create walls from processed data
//         walls.forEach(wall => {
//             const wallGeometry = new THREE.BoxGeometry(wall.width / 10, wall.height / 10, 0.1); // Scale down for better visibility
//             const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
//             const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
//             wallMesh.position.set(wall.x / 10, wall.height / 20, 0); // Adjust position
//             scene.add(wallMesh);
//         });

//         camera.position.z = 12;
//         camera.position.y = 6;
//         camera.lookAt(0, 0, 0);

//         const animate = () => {
//             requestAnimationFrame(animate);
//             renderer.render(scene, camera);
//         };
//         animate();

//         window.addEventListener('resize', () => {
//             renderer.setSize(window.innerWidth, window.innerHeight);
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//         });

//         return () => {
//             document.body.removeChild(renderer.domElement); // Cleanup
//         };
//     }, [walls]); // Redraw when walls change

//     return <div/>;
 };

export default ThreeModel;
