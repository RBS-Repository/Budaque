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
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        
        this.init();
        this.addEventListeners();
    }

    createGeometry() {
        const geometryTypes = [
            new THREE.TorusGeometry(1, 0.3, 16, 100),
            new THREE.IcosahedronGeometry(1, 0),
            new THREE.OctahedronGeometry(1, 0),
            new THREE.TetrahedronGeometry(1, 0)
        ];

        const colors = [
            new THREE.Color(0x00ff88),  // Cyan
            new THREE.Color(0xff0088),  // Pink
            new THREE.Color(0x0088ff),  // Blue
            new THREE.Color(0x88ff00)   // Green
        ];

        const material = new THREE.MeshPhongMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            wireframe: true,
            transparent: true,
            opacity: 0.3,
            shininess: 100,
            side: THREE.DoubleSide
        });

        const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
        const mesh = new THREE.Mesh(geometry, material);

        // Position
        mesh.position.x = (Math.random() - 0.5) * 40;
        mesh.position.y = (Math.random() - 0.5) * 40;
        mesh.position.z = (Math.random() - 0.5) * 30 - 10;

        // Movement properties
        mesh.velocity = {
            x: (Math.random() - 0.5) * 0.05,
            y: (Math.random() - 0.5) * 0.05,
            z: (Math.random() - 0.5) * 0.02
        };

        // Rotation
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;

        // Rotation speed
        mesh.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        };

        // Custom properties for animations
        mesh.baseScale = 0.5 + Math.random() * 2;
        mesh.scale.setScalar(mesh.baseScale);
        mesh.originalColor = material.color.clone();
        mesh.targetColor = material.color.clone();
        mesh.colorTime = Math.random() * Math.PI * 2;
        mesh.pulseSpeed = 0.5 + Math.random() * 0.5;
        mesh.orbitRadius = 5 + Math.random() * 15;
        mesh.orbitSpeed = 0.1 + Math.random() * 0.2;
        mesh.orbitOffset = Math.random() * Math.PI * 2;

        return mesh;
    }

    init() {
        // Renderer setup
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x111111, 1);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x00ff88, 1);
        pointLight1.position.set(5, 5, 5);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xff0088, 1);
        pointLight2.position.set(-5, -5, -5);
        this.scene.add(pointLight2);

        // Add geometries
        for (let i = 0; i < 60; i++) {
            const mesh = this.createGeometry();
            this.geometries.push(mesh);
            this.scene.add(mesh);
        }

        // Camera position
        this.camera.position.z = 20;

        // Start animation
        this.animate();
    }

    addEventListeners() {
        // Mouse move event
        document.addEventListener('mousemove', (event) => {
            this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Window resize event
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Scroll event for parallax
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            this.camera.position.y = -(scrolled * 0.005);
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // Smooth camera movement
        this.targetX += (this.mouseX - this.targetX) * 0.05;
        this.targetY += (this.mouseY - this.targetY) * 0.05;
        this.camera.rotation.x = this.targetY * 0.2;
        this.camera.rotation.y = this.targetX * 0.2;

        const time = Date.now() * 0.001;

        this.geometries.forEach((mesh, index) => {
            // Orbital movement
            const orbitAngle = time * mesh.orbitSpeed + mesh.orbitOffset;
            mesh.position.x = Math.cos(orbitAngle) * mesh.orbitRadius + mesh.velocity.x;
            mesh.position.y = Math.sin(orbitAngle) * mesh.orbitRadius + mesh.velocity.y;
            
            // Rotation
            mesh.rotation.x += mesh.rotationSpeed.x;
            mesh.rotation.y += mesh.rotationSpeed.y;
            mesh.rotation.z += mesh.rotationSpeed.z;

            // Pulsing scale
            const pulse = Math.sin(time * mesh.pulseSpeed) * 0.1 + 1;
            mesh.scale.setScalar(mesh.baseScale * pulse);

            // Color transition
            mesh.colorTime += 0.01;
            const hue = (mesh.colorTime + index * 0.1) % 1;
            mesh.material.color.setHSL(hue, 0.6, 0.6);

            // Interactive movement
            const distance = this.camera.position.distanceTo(mesh.position);
            const influence = Math.max(0, 1 - distance / 20);
            mesh.position.x += this.targetX * influence * 0.1;
            mesh.position.y += this.targetY * influence * 0.1;
        });

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize background when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Background();
});

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

// FAQ Toggle functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
});

// View More Projects functionality
document.addEventListener('DOMContentLoaded', () => {
    const viewMoreBtn = document.getElementById('view-more-btn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    let isShowingAll = false;

    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', () => {
            if (!isShowingAll) {
                // Show all projects
                hiddenProjects.forEach(project => {
                    project.style.display = 'block';
                    // Add fade-in animation
                    setTimeout(() => {
                        project.style.opacity = '1';
                    }, 10);
                });
                viewMoreBtn.textContent = 'Show Less';
            } else {
                // Hide projects
                hiddenProjects.forEach(project => {
                    project.style.display = 'none';
                });
                viewMoreBtn.textContent = 'View More Projects';
                // Scroll back to projects section
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            }
            isShowingAll = !isShowingAll;
        });
    }
});

// Add this if you haven't already
function scrollAnimation() {
    const elements = document.querySelectorAll('.fade-up');
    
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

// Add scroll progress indicator
const addScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
};

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', () => {
    addScrollProgress();
});

// Cursor follower
class CursorFollower {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor-follower';
        document.body.appendChild(this.cursor);

        this.cursorX = 0;
        this.cursorY = 0;
        this.currentX = 0;
        this.currentY = 0;

        this.init();
    }

    init() {
        // Track cursor position
        document.addEventListener('mousemove', (e) => {
            this.cursorX = e.clientX;
            this.cursorY = e.clientY;
            
            // Immediate position update
            this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px)`;
        });

        // Hide on mouse leave
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });

        // Show on mouse enter
        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
        });

        // Add hover effect for clickable elements
        const clickables = document.querySelectorAll('a, button, .clickable');
        clickables.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
            });
            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
            });
        });
    }
}

// Initialize cursor follower when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CursorFollower();
});

// Update the testimonial slider JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if testimonial elements exist
    if (document.querySelector('.testimonial-track')) {
        const track = document.querySelector('.testimonial-track');
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');
        const dotsContainer = document.querySelector('.testimonial-dots');

        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let currentIndex = 0;
        let animationID = 0;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(document.querySelectorAll('.dot'));

        // Set initial active state
        slides[0].classList.add('active');

        function moveToSlide(index) {
            if (animationID) {
                cancelAnimationFrame(animationID);
            }

            const isMobile = window.innerWidth <= 1024;
            const totalSlides = slides.length;

            // Handle circular navigation for mobile
            if (isMobile) {
                if (index < 0) {
                    index = totalSlides - 1;
                } else if (index >= totalSlides) {
                    index = 0;
                }
                
                currentIndex = index;
                currentTranslate = -(index * 100);
                track.style.transform = `translateX(${currentTranslate}%)`;
            } else {
                // Desktop view (3 slides)
                const maxIndex = totalSlides - 3;
                currentIndex = Math.min(Math.max(0, index), maxIndex);
                const slideWidth = track.clientWidth / 3;
                currentTranslate = -(currentIndex * slideWidth);
                track.style.transform = `translateX(${currentTranslate}px)`;
            }

            // Update active states
            slides.forEach((slide, i) => {
                if (isMobile) {
                    slide.classList.toggle('active', i === currentIndex);
                } else {
                    const isInView = i >= currentIndex && i < currentIndex + 3;
                    slide.classList.toggle('active', isInView);
                }
            });

            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        // Touch events
        track.addEventListener('touchstart', touchStart);
        track.addEventListener('touchmove', touchMove);
        track.addEventListener('touchend', touchEnd);

        // Mouse events
        track.addEventListener('mousedown', touchStart);
        track.addEventListener('mousemove', touchMove);
        track.addEventListener('mouseup', touchEnd);
        track.addEventListener('mouseleave', touchEnd);

        function touchStart(event) {
            isDragging = true;
            startPos = getPositionX(event);
            animationID = requestAnimationFrame(animation);
            track.style.cursor = 'grabbing';
        }

        function touchMove(event) {
            if (!isDragging) return;
            event.preventDefault();
            const currentPosition = getPositionX(event);
            const diff = currentPosition - startPos;
            const isMobile = window.innerWidth <= 1024;

            if (isMobile) {
                const slideWidth = track.clientWidth;
                const percentMove = (diff / slideWidth) * 100;
                currentTranslate = -(currentIndex * 100) + percentMove;
                track.style.transform = `translateX(${currentTranslate}%)`;
            } else {
                const slideWidth = track.clientWidth / 3;
                currentTranslate = -(currentIndex * slideWidth) + diff;
                track.style.transform = `translateX(${currentTranslate}px)`;
            }
        }

        function touchEnd() {
            isDragging = false;
            cancelAnimationFrame(animationID);
            track.style.cursor = 'grab';

            if (!startPos) return;

            const isMobile = window.innerWidth <= 1024;
            const threshold = isMobile ? track.clientWidth * 0.2 : track.clientWidth * 0.1;
            const diff = getPositionX(event) - startPos;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    moveToSlide(currentIndex - 1);
                } else {
                    moveToSlide(currentIndex + 1);
                }
            } else {
                moveToSlide(currentIndex);
            }

            startPos = null;
        }

        function getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        }

        function animation() {
            const isMobile = window.innerWidth <= 1024;
            if (isMobile) {
                track.style.transform = `translateX(${currentTranslate}%)`;
            } else {
                track.style.transform = `translateX(${currentTranslate}px)`;
            }
            if (isDragging) requestAnimationFrame(animation);
        }

        // Button click handlers
        nextButton.addEventListener('click', () => {
            const isMobile = window.innerWidth <= 1024;
            if (isMobile) {
                moveToSlide(currentIndex + 1); // Will handle wrapping in moveToSlide
            } else {
                moveToSlide(currentIndex + 1);
            }
        });

        prevButton.addEventListener('click', () => {
            const isMobile = window.innerWidth <= 1024;
            if (isMobile) {
                moveToSlide(currentIndex - 1); // Will handle wrapping in moveToSlide
            } else {
                moveToSlide(currentIndex - 1);
            }
        });

        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                moveToSlide(index);
            });
        });

        // Handle resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const isMobile = window.innerWidth <= 1024;
                if (isMobile && currentIndex > slides.length - 1) {
                    currentIndex = slides.length - 1;
                }
                moveToSlide(currentIndex);
            }, 250);
        });
    }
});