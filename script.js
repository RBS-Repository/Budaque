// Place this at the top of script.js
document.addEventListener('DOMContentLoaded', function() {
    const maskIntro = document.getElementById('mask-intro');
    
    // Simple timeout to hide loader
    setTimeout(() => {
        maskIntro.style.opacity = '0';
        maskIntro.style.pointerEvents = 'none';
        
        setTimeout(() => {
            maskIntro.style.display = 'none';
        }, 1000);
    }, 2500); // Total animation time (2s) + small buffer
});

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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new Background();
    
    // Initialize chatbot
    if (typeof initializeChatbot === 'function') {
        initializeChatbot();
    }
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

// Add this JavaScript to handle the slider functionality
let currentIndex = 0;
const sections = document.querySelectorAll('.slider section');
const totalSections = sections.length;

document.querySelector('.next').addEventListener('click', () => {
    if (currentIndex < totalSections - 1) {
        currentIndex++;
        updateSlider();
    }
});

document.querySelector('.prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

function updateSlider() {
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateY(-${currentIndex * 100}vh)`;
}

// Add this after your existing code
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 800,           // Animation duration
        easing: 'ease-in-out',   // Easing type
        once: false,             // Whether animation should happen only once
        mirror: true,            // Whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // Defines which position of the element regarding to window should trigger the animation
        offset: 120,             // Offset (in px) from the original trigger point
        delay: 100,              // Default delay for animations
        
        // Disable animations on mobile devices if needed
        disable: function() {
            return window.innerWidth < 768;
        }
    });

    // Refresh AOS when dynamic content is loaded
    document.addEventListener('lazyloaded', function() {
        AOS.refresh();
    });

    // Refresh AOS when images are loaded
    window.addEventListener('load', function() {
        AOS.refresh();
    });

    // Refresh AOS on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            AOS.refresh();
        }, 250);
    });
});

// Add smooth scrolling with AOS update
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });

            // Update AOS animations after smooth scroll
            setTimeout(() => {
                AOS.refresh();
            }, 1000);
        }
    });
});

// Initialize ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    
    // Initialize ScrollTrigger with different settings for mobile
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animation - simplified for mobile
    gsap.from(".hero-content", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top 80%",
            toggleActions: isMobile ? "play none none none" : "play none none reverse"
        },
        y: isMobile ? 30 : 100,
        opacity: 0,
        duration: isMobile ? 0.6 : 1
    });

    // Skills Animation - reduced stagger for mobile
    gsap.from(".skills span", {
        scrollTrigger: {
            trigger: ".skills",
            start: "top 90%"
        },
        scale: 0.8,
        opacity: 0,
        duration: isMobile ? 0.3 : 0.5,
        stagger: isMobile ? 0.05 : 0.1
    });

    // Project Cards Animation - adjusted for mobile
    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: ".project-grid",
            start: "top 90%"
        },
        y: isMobile ? 20 : 50,
        opacity: 0,
        duration: isMobile ? 0.4 : 0.6,
        stagger: isMobile ? 0.1 : 0.2
    });

    // Service Cards Animation - simplified for mobile
    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: ".services-grid",
            start: "top 90%"
        },
        y: isMobile ? 20 : 50,
        opacity: 0,
        duration: isMobile ? 0.4 : 0.6,
        stagger: isMobile ? 0.1 : 0.2
    });

    // Team Cards Animation - adjusted for mobile
    gsap.from(".team-card", {
        scrollTrigger: {
            trigger: ".team-grid",
            start: "top 90%"
        },
        scale: isMobile ? 0.9 : 0.8,
        opacity: 0,
        duration: isMobile ? 0.4 : 0.6,
        stagger: isMobile ? 0.1 : 0.2
    });

    // Process Cards Animation - simplified for mobile
    gsap.from(".process-card", {
        scrollTrigger: {
            trigger: ".process-grid",
            start: "top 90%"
        },
        x: isMobile ? -20 : -50,
        opacity: 0,
        duration: isMobile ? 0.4 : 0.6,
        stagger: isMobile ? 0.1 : 0.2
    });

    // Testimonial Cards Animation - adjusted for mobile
    gsap.from(".testimonial-card", {
        scrollTrigger: {
            trigger: ".testimonial-slider",
            start: "top 90%"
        },
        y: isMobile ? 20 : 50,
        opacity: 0,
        duration: isMobile ? 0.4 : 0.6,
        stagger: isMobile ? 0.1 : 0.2
    });

    // Disable parallax effect on mobile
    if (!isMobile) {
        gsap.to("#bg-canvas", {
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            },
            y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.1,
            ease: "none"
        });
    }

    // Simplified heading animation for mobile
    const headings = document.querySelectorAll('h2');
    headings.forEach(heading => {
        if (isMobile) {
            // Simple fade in for mobile
            gsap.from(heading, {
                scrollTrigger: {
                    trigger: heading,
                    start: "top 90%"
                },
                opacity: 0,
                y: 20,
                duration: 0.4
            });
        } else {
            // Original split text animation for desktop
            const text = heading.textContent;
            const chars = text.split('');
            heading.textContent = '';
            chars.forEach(char => {
                const span = document.createElement('span');
                span.textContent = char;
                heading.appendChild(span);
            });

            gsap.from(heading.children, {
                scrollTrigger: {
                    trigger: heading,
                    start: "top 80%"
                },
                opacity: 0,
                y: 20,
                duration: 0.4,
                stagger: 0.02
            });
        }
    });

    // Handle resize events
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });

    // Optimize smooth scroll for mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: isMobile ? 0.6 : 1,
                    scrollTo: {
                        y: target,
                        offsetY: isMobile ? 50 : 70
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });
});

// Update AOS settings for better mobile performance
AOS.init({
    duration: window.innerWidth <= 768 ? 600 : 800,
    easing: 'ease-out',
    once: true,
    mirror: false,
    disable: function() {
        return window.innerWidth <= 480;
    }
});

// Form handling with SweetAlert2
function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const form = event.target;
    const formData = new FormData(form);

    // Show loading state with SweetAlert2
    Swal.fire({
        title: 'Sending Message...',
        text: 'Please wait',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        },
        background: 'rgba(17, 17, 17, 0.95)',
        color: '#ffffff'
    });

    // Use fetch API to submit the form asynchronously
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.ok) {
            form.reset();
            Swal.fire({
                icon: 'success',
                title: 'Message Sent!',
                text: 'Thank you for contacting us. We will get back to you soon!',
                confirmButtonColor: '#00ff88',
                background: 'rgba(17, 17, 17, 0.95)',
                color: '#ffffff',
                iconColor: '#00ff88'
            });
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Please try again.',
            confirmButtonColor: '#ff3366',
            background: 'rgba(17, 17, 17, 0.95)',
            color: '#ffffff',
            iconColor: '#ff3366'
        });
    });

    return false;
}

// Make sure the form exists before adding the event listener
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Optional: Add a smooth transition effect
        document.documentElement.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    });
    
    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        const moonIcon = themeToggle.querySelector('.fa-moon');
        const sunIcon = themeToggle.querySelector('.fa-sun');
        
        if (theme === 'light') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addListener((e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
});

// Remove all other loader-related code and use this single implementation
window.addEventListener('load', function() {
    const maskIntro = document.getElementById('mask-intro');
    let loaderClosed = false;

    function hideLoader() {
        if (!loaderClosed) {
            loaderClosed = true;
            maskIntro.classList.add('hidden');
            setTimeout(() => {
                maskIntro.style.display = 'none';
            }, 1000);
        }
    }

    // Listen for progress animation end
    const progress = document.querySelector('.progress');
    if (progress) {
        progress.addEventListener('animationend', hideLoader);
    }

    // Fallback timer
    setTimeout(hideLoader, 3000);
});


