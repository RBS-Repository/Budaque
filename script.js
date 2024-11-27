// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Close menu when clicking links
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});

// Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent successfully!');
    contactForm.reset();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new Background();
});

class Background {
    constructor() {
        this.canvas = document.getElementById('bg-canvas');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.geometries = [];
        
        this.init();
    }

    createGeometry() {
        const geometryTypes = [
            new THREE.TetrahedronGeometry(1),
            new THREE.OctahedronGeometry(1),
            new THREE.IcosahedronGeometry(1),
            new THREE.TorusGeometry(0.8, 0.3, 16, 100)
        ];

        const colors = [
            0x00ff88,  // Cyan
            0xff0088,  // Pink
            0x0088ff,  // Blue
            0x88ff00   // Green
        ];

        const material = new THREE.MeshPhongMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            wireframe: true,
            transparent: true,
            opacity: 0.3,
            shininess: 100
        });

        const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
        const mesh = new THREE.Mesh(geometry, material);

        // Initial position
        mesh.position.x = (Math.random() - 0.5) * 30;
        mesh.position.y = (Math.random() - 0.5) * 30;
        mesh.position.z = (Math.random() - 0.5) * 15 - 10;

        // Add movement properties
        mesh.velocity = {
            x: (Math.random() - 0.5) * 0.05,
            y: (Math.random() - 0.5) * 0.05,
            z: (Math.random() - 0.5) * 0.02
        };

        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;

        mesh.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        };

        const scale = 0.5 + Math.random() * 2;
        mesh.scale.set(scale, scale, scale);

        return mesh;
    }

    init() {
        // Setup renderer with dark background
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x111111, 1); // Dark background

        // Stronger lighting for better color visibility
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1.5);
        pointLight.position.set(5, 5, 5);
        this.scene.add(pointLight);

        // Add a second point light for better illumination
        const pointLight2 = new THREE.PointLight(0xffffff, 1);
        pointLight2.position.set(-5, -5, -5);
        this.scene.add(pointLight2);

        // Add more shapes for a denser background
        for (let i = 0; i < 50; i++) {  // Increased number of shapes
            const mesh = this.createGeometry();
            this.geometries.push(mesh);
            this.scene.add(mesh);
        }

        // Position camera
        this.camera.position.z = 15;

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);

            this.geometries.forEach(mesh => {
                // Update position
                mesh.position.x += mesh.velocity.x;
                mesh.position.y += mesh.velocity.y;
                mesh.position.z += mesh.velocity.z;

                // Bounce off boundaries
                const bounds = 20;
                if (Math.abs(mesh.position.x) > bounds) {
                    mesh.velocity.x *= -1;
                }
                if (Math.abs(mesh.position.y) > bounds) {
                    mesh.velocity.y *= -1;
                }
                if (Math.abs(mesh.position.z) > bounds) {
                    mesh.velocity.z *= -1;
                }

                // Rotate
                mesh.rotation.x += mesh.rotationSpeed.x;
                mesh.rotation.y += mesh.rotationSpeed.y;
                mesh.rotation.z += mesh.rotationSpeed.z;

                // Add wobble effect
                mesh.position.x += Math.sin(Date.now() * 0.001 + mesh.position.y) * 0.02;
                mesh.position.y += Math.cos(Date.now() * 0.001 + mesh.position.x) * 0.02;
            });

            this.renderer.render(this.scene, this.camera);
        };

        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Update mouse movement to be more dramatic
        document.addEventListener('mousemove', (event) => {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

            this.geometries.forEach(mesh => {
                // Add slight attraction to mouse position
                mesh.velocity.x += mouseX * 0.001;
                mesh.velocity.y += mouseY * 0.001;

                // Limit maximum velocity
                const maxVelocity = 0.1;
                mesh.velocity.x = Math.max(Math.min(mesh.velocity.x, maxVelocity), -maxVelocity);
                mesh.velocity.y = Math.max(Math.min(mesh.velocity.y, maxVelocity), -maxVelocity);
            });
        });
    }
}

// Scroll Animation
function scrollAnimation() {
    const elements = document.querySelectorAll('.scroll-animation, .fade-left, .fade-right, .fade-up, .fade-down');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if(elementPosition < screenPosition) {
            element.classList.add('active');
        }
    });
}

// Call on scroll and on load
window.addEventListener('scroll', scrollAnimation);
window.addEventListener('load', scrollAnimation);