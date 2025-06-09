import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Initializes the Three.js scene, camera, renderer, and controls
 * @returns {Object} Object containing scene, camera, renderer, and controls
 */

// Get the canvas element
const canvas = document.querySelector('#viewerCanvas');
console.log(canvas)

// Create the scene with a starry background
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xF0F8FF); // Alice Blue - a light, calming color (commented out)

// Add starry background
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 5000; // Number of stars
const positions = new Float32Array(starsCount * 3);

for (let i = 0; i < starsCount; i++) {
  // Random positions within a sphere
  const x = (Math.random() - 0.5) * 200;
  const y = (Math.random() - 0.5) * 200;
  const z = (Math.random() - 0.5) * 200;
  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const starsMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 }); // White stars
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

// Set up the perspective camera
const camera = new THREE.PerspectiveCamera(
  60, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.set(5, 5, 5); // Position the camera
camera.lookAt(scene.position); // Look at the center of the scene

// Initialize the WebGL renderer
const renderer = new THREE.WebGLRenderer({ 
  canvas, 
  antialias: true // Enable antialiasing
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true; // Enable shadow mapping

// Add the renderer to the DOM
document.body.appendChild(renderer.domElement);

// Add OrbitControls for camera manipulation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Add smooth damping effect
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;
controls.rotateSpeed = 1.0; // Adjust rotation speed
controls.autoRotate = false; // Disable auto-rotation by default
controls.autoRotateSpeed = 2.0; // Speed of auto-rotation if enabled
controls.minDistance = 5; // Minimum zoom distance
controls.maxDistance = 20; // Maximum zoom distance
controls.enableTouch = true; // Enable touch controls
controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
};

// Allow full vertical rotation
controls.minPolarAngle = 0; // Allow rotation to bottom (0 degrees)
controls.maxPolarAngle = Math.PI; // Allow rotation to top (180 degrees)
controls.enableRotate = true; // Ensure rotation is enabled

// Add touch event listeners
renderer.domElement.addEventListener('touchstart', (event) => {
    controls.autoRotate = false; // Disable auto-rotation when touching
});

renderer.domElement.addEventListener('touchend', (event) => {
    // Re-enable auto-rotation after a delay if no touch events
    setTimeout(() => {
        if (!controls.isDragging) {
            controls.autoRotate = true;
        }
    }, 1000);
});

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

export { scene, camera, renderer, controls };
