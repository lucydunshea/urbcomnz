// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;  // Distance from the globe

const renderer = new THREE.WebGLRenderer({ alpha: true });  // Transparent background
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('globe-container').appendChild(renderer.domElement);

// Globe geometry and texture (replace with your terrain data if available)
const globeRadius = 5;
const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
const globeMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff, // Set the globe color similar to the embossed look
    flatShading: true
});
const globe = new THREE.Mesh(globeGeometry, globeMaterial);
scene.add(globe);

// Light to create the embossed effect
const ambientLight = new THREE.AmbientLight(0x999999);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Automatic rotation
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.001;  // Adjust speed as needed
    renderer.render(scene, camera);
}
animate();

// Function to add markers based on lat/lon
function addMarkerToGlobe(lat, lon, name) {
    const markerGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);

    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    marker.position.set(
        globeRadius * Math.sin(phi) * Math.cos(theta),
        globeRadius * Math.cos(phi),
        globeRadius * Math.sin(phi) * Math.sin(theta)
    );

    scene.add(marker);
    marker.name = name;
}

// Fetch project data and add markers
async function loadProjectMarkers() {
    try {
        const response = await fetch('/api/project-locations/');
        const projects = await response.json();

        projects.forEach(project => {
            addMarkerToGlobe(project.latitude, project.longitude, project.name);
        });
    } catch (error) {
        console.error('Error fetching project locations:', error);
    }
}

loadProjectMarkers();

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
