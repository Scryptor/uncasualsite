// Apple Liquid Glass Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Animated Counter Function
    function animateCounter(element, start, end, duration) {
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }

    // Initialize Counters
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, 0, target, 2000);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }

    // Initialize Progress Bars
    function initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, 300);
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    }

    // Analytics Chart
    function initAnalyticsChart() {
        const canvas = document.getElementById('analyticsChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Generate sample data
        const data = [];
        for (let i = 0; i < 20; i++) {
            data.push(Math.random() * 100 + 20);
        }
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({length: 20}, (_, i) => ''),
                datasets: [{
                    data: data,
                    borderColor: '#4facfe',
                    backgroundColor: 'rgba(79, 172, 254, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { display: false },
                    y: { display: false }
                },
                interaction: {
                    intersect: false
                },
                elements: {
                    point: {
                        hoverBackgroundColor: '#00f2fe'
                    }
                }
            }
        });
        
        // Animate chart on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class
                    canvas.style.opacity = '0';
                    canvas.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        canvas.style.transition = 'all 0.8s ease';
                        canvas.style.opacity = '1';
                        canvas.style.transform = 'translateY(0)';
                    }, 200);
                    observer.unobserve(canvas);
                }
            });
        });
        
        observer.observe(canvas);
    }

    // Interactive Widget Hover Effects
    function initWidgetInteractions() {
        const widgets = document.querySelectorAll('.interactive-widget');
        
        widgets.forEach(widget => {
            widget.addEventListener('mouseenter', function() {
                // Add glow effect
                this.style.boxShadow = '0 20px 40px rgba(79, 172, 254, 0.3)';
                
                // Animate widget content
                const demo = this.querySelector('.widget-demo');
                if (demo) {
                    demo.style.transform = 'scale(1.05)';
                    demo.style.transition = 'transform 0.3s ease';
                }
            });
            
            widget.addEventListener('mouseleave', function() {
                // Remove effects
                this.style.boxShadow = '';
                
                const demo = this.querySelector('.widget-demo');
                if (demo) {
                    demo.style.transform = 'scale(1)';
                }
            });
        });
    }

    // Morphing Cards Animation
    function initMorphingCards() {
        const cards = document.querySelectorAll('.morphing-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Random color gradient on hover
                const gradients = [
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                ];
                
                const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
                const icon = this.querySelector('.tech-icon');
                if (icon) {
                    icon.style.background = randomGradient;
                    icon.style.webkitBackgroundClip = 'text';
                    icon.style.webkitTextFillColor = 'transparent';
                }
            });
        });
    }

    // Parallax Effect for Liquid Orbs
    function initParallaxEffect() {
        const orbs = document.querySelectorAll('.liquid-orb');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            orbs.forEach((orb, index) => {
                const multiplier = (index + 1) * 0.3;
                orb.style.transform = `translateY(${rate * multiplier}px)`;
            });
        });
    }

    // Smooth Scroll for Navigation Links
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.glass-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Weather Widget Animation
    function initWeatherWidget() {
        const weatherWidget = document.querySelector('[data-widget="weather"]');
        if (!weatherWidget) return;
        
        // Animate temperature change
        const tempValue = weatherWidget.querySelector('.temp-value');
        if (tempValue) {
            setInterval(() => {
                const currentTemp = parseInt(tempValue.textContent);
                const newTemp = currentTemp + (Math.random() > 0.5 ? 1 : -1);
                if (newTemp >= 20 && newTemp <= 30) {
                    tempValue.textContent = newTemp + '°';
                }
            }, 5000);
        }
    }

    // Dynamic Background Animation
    function initDynamicBackground() {
        const hero = document.querySelector('.hero-section');
        if (!hero) return;
        
        // Mouse movement parallax
        hero.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const orbs = hero.querySelectorAll('.liquid-orb');
            orbs.forEach((orb, index) => {
                const intensity = (index + 1) * 10;
                const x = mouseX * intensity;
                const y = mouseY * intensity;
                
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // Form Enhancement
    function initFormEnhancements() {
        const form = document.querySelector('.contact-form form');
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Отправка...';
            button.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check me-2"></i>Отправлено!';
                button.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
        
        // Input focus effects
        const inputs = form.querySelectorAll('.glass-input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
        });
    }

    // Navbar Scroll Effect
    function initNavbarEffects() {
        const navbar = document.querySelector('.glass-nav');
        if (!navbar) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.1)';
                navbar.style.backdropFilter = 'blur(30px)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.05)';
                navbar.style.backdropFilter = 'blur(20px)';
            }
        });
    }

    // Loading Animation
    function initLoadingAnimation() {
        // Add fade-in effect to main sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                section.style.transition = 'all 0.8s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Initialize all functions
    initCounters();
    initProgressBars();
    initAnalyticsChart();
    initWidgetInteractions();
    initMorphingCards();
    initParallaxEffect();
    initSmoothScroll();
    initWeatherWidget();
    initDynamicBackground();
    initFormEnhancements();
    initNavbarEffects();
    initLoadingAnimation();

    // Performance optimization - throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll events
    window.addEventListener('scroll', throttle(() => {
        // Scroll-based animations can be added here
    }, 16)); // ~60fps

    // Advanced Particle System
    function createParticleSystem(containerId, count = 50) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (8 + Math.random() * 4) + 's';
            container.appendChild(particle);
        }
    }

    // Matrix Rain Effect
    function createMatrixRain() {
        const matrix = document.getElementById('matrix');
        if (!matrix) return;
        
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const columns = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = i * 20 + 'px';
            column.style.animationDelay = Math.random() * 10 + 's';
            column.style.animationDuration = (10 + Math.random() * 5) + 's';
            
            let text = '';
            for (let j = 0; j < 20; j++) {
                text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
            }
            column.innerHTML = text;
            matrix.appendChild(column);
        }
    }

    // Advanced 3D Mouse Tracking
    function init3DMouseTracking() {
        const cards = document.querySelectorAll('.card-3d');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(20px)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // Liquid Cursor Effect
    function initLiquidCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'liquid-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--accent-gradient);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
        });
    }

    // Dynamic Color Morphing
    function initColorMorphing() {
        const morphElements = document.querySelectorAll('.holographic');
        
        setInterval(() => {
            morphElements.forEach(element => {
                const hue = Math.random() * 360;
                element.style.filter = `hue-rotate(${hue}deg) saturate(1.5)`;
            });
        }, 3000);
    }

    // Advanced Scroll Parallax
    function initAdvancedParallax() {
        const elements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            elements.forEach(element => {
                const rate = scrolled * element.dataset.parallax * -1;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    // Glitch Text Animation
    function initGlitchAnimation() {
        const glitchElements = document.querySelectorAll('.glitch');
        
        glitchElements.forEach(element => {
            const text = element.textContent;
            element.setAttribute('data-text', text);
            
            setInterval(() => {
                if (Math.random() > 0.95) {
                    element.style.animation = 'none';
                    setTimeout(() => {
                        element.style.animation = 'glitch-1 2s infinite';
                    }, 100);
                }
            }, 100);
        });
    }

    // Liquid Wave Effect
    function initLiquidWaves() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            const wave = document.createElement('div');
            wave.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, transparent 30%, rgba(79, 172, 254, 0.1) 50%, transparent 70%);
                transform: translateX(-100%);
                animation: wave-flow ${8 + index}s infinite linear;
                z-index: -1;
            `;
            section.style.position = 'relative';
            section.appendChild(wave);
        });
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes wave-flow {
                0% { transform: translateX(-100%) skewX(-15deg); }
                100% { transform: translateX(200%) skewX(-15deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // Magnetic Buttons
    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.liquid-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Optimized Floating Elements (limited movement)
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.premium-hover');
        
        floatingElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const maxMovement = Math.min(rect.width, rect.height) * 0.1; // 10% of element size
            const speed = 3000 + (index * 500);
            
            let animationId;
            
            function animate() {
                const x = Math.sin(Date.now() / speed) * maxMovement;
                const y = Math.cos(Date.now() / speed) * maxMovement;
                
                // Use transform3d for GPU acceleration
                element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                
                animationId = requestAnimationFrame(animate);
            }
            
            animate();
            
            // Store reference for cleanup if needed
            element._floatingAnimation = animationId;
        });
    }

    // Sound Visualization (Mock)
    function initSoundVisualization() {
        const charts = document.querySelectorAll('#analyticsChart');
        
        charts.forEach(chart => {
            const ctx = chart.getContext('2d');
            
            function drawWaveform() {
                ctx.clearRect(0, 0, chart.width, chart.height);
                ctx.strokeStyle = '#4facfe';
                ctx.lineWidth = 2;
                ctx.beginPath();
                
                for (let i = 0; i < chart.width; i += 5) {
                    const amplitude = Math.sin(i * 0.05 + Date.now() * 0.01) * 20;
                    const y = chart.height / 2 + amplitude;
                    
                    if (i === 0) {
                        ctx.moveTo(i, y);
                    } else {
                        ctx.lineTo(i, y);
                    }
                }
                
                ctx.stroke();
                requestAnimationFrame(drawWaveform);
            }
            
            drawWaveform();
        });
    }

    // Initialize Optimized Effects
    createParticleSystem('particles', 30);
    createParticleSystem('particles2', 20);
    createParticleSystem('particles3', 25);
    createParticleSystem('particles4', 20);
    createParticleSystem('particles5', 15);
    createMatrixRain();
    init3DMouseTracking();
    initLiquidCursor();
    initColorMorphing();
    initAdvancedParallax();
    initGlitchAnimation();
    initLiquidWaves();
    initMagneticButtons();
    initFloatingElements();
    initSoundVisualization();

    // Optimized Visual Effects
    function initExtremeEffects() {
        // Optimized breathing animation
        let breathingAnimation;
        function breathingLoop() {
            const hue = Math.sin(Date.now() / 5000) * 30;
            const saturation = 1 + Math.sin(Date.now() / 3000) * 0.1;
            document.body.style.filter = `hue-rotate(${hue}deg) saturate(${saturation})`;
            breathingAnimation = requestAnimationFrame(breathingLoop);
        }
        breathingLoop();

        // Reduced frequency color flashes
        setInterval(() => {
            if (Math.random() > 0.995) {
                document.body.style.filter += ' brightness(1.1)';
                setTimeout(() => {
                    document.body.style.filter = document.body.style.filter.replace(' brightness(1.1)', '');
                }, 50);
            }
        }, 500);

        // Ultra parallax background
        const hero = document.querySelector('.hero-section');
        if (hero) {
            const canvas = document.createElement('canvas');
            canvas.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -2;
                pointer-events: none;
            `;
            hero.appendChild(canvas);
            
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            function drawUltraBackground() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Animated gradient mesh
                const time = Date.now() / 1000;
                for (let i = 0; i < 5; i++) {
                    const x = Math.sin(time + i) * 200 + canvas.width / 2;
                    const y = Math.cos(time + i * 2) * 150 + canvas.height / 2;
                    
                    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 300);
                    gradient.addColorStop(0, `hsla(${(time * 50 + i * 60) % 360}, 70%, 60%, 0.1)`);
                    gradient.addColorStop(1, 'transparent');
                    
                    ctx.fillStyle = gradient;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
                
                requestAnimationFrame(drawUltraBackground);
            }
            
            drawUltraBackground();
        }
    }

    initExtremeEffects();

    // GPU Acceleration
    function enableGPUAcceleration() {
        const elements = document.querySelectorAll('.glass-card, .liquid-orb, .morphing-blob');
        elements.forEach(element => {
            element.style.willChange = 'transform';
            element.style.transform = 'translateZ(0)';
        });
    }

    enableGPUAcceleration();

    // OPTIMIZED WebGL EFFECTS
    function initWebGLMadness() {
        const canvas = document.getElementById('webgl-canvas');
        if (!canvas || !window.THREE) return;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true, 
            antialias: false, // Disable antialiasing for performance
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio
        
        // Reduced particle count for performance
        const particleCount = 2000;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 150;
            positions[i + 1] = (Math.random() - 0.5) * 150;
            positions[i + 2] = (Math.random() - 0.5) * 150;
            
            colors[i] = Math.random();
            colors[i + 1] = Math.random();
            colors[i + 2] = Math.random();
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 1.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.6
        });
        
        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);
        
        // Simplified geometry
        const geometry = new THREE.IcosahedronGeometry(8, 2);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            wireframe: true,
            transparent: true,
            opacity: 0.2
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        camera.position.z = 50;
        
        let frameCount = 0;
        function animateWebGL() {
            requestAnimationFrame(animateWebGL);
            frameCount++;
            
            // Skip frames for performance
            if (frameCount % 2 !== 0) return;
            
            // Cosmic rotation
            particleSystem.rotation.x += 0.0005;
            particleSystem.rotation.y += 0.001;
            
            // Morphing mesh
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.005;
            mesh.scale.x = 1 + Math.sin(Date.now() * 0.0005) * 0.2;
            mesh.scale.y = 1 + Math.cos(Date.now() * 0.0005) * 0.2;
            
            // Color cycling (less frequent)
            if (frameCount % 10 === 0) {
                material.color.setHSL((Date.now() * 0.0005) % 1, 1, 0.5);
            }
            
            renderer.render(scene, camera);
        }
        
        animateWebGL();
    }

    // P5.js PSYCHEDELIC BACKGROUND
    function initP5Madness() {
        if (!window.p5) return;
        
        new p5((p) => {
            let angle = 0;
            let particles = [];
            
            p.setup = () => {
                let canvas = p.createCanvas(window.innerWidth, window.innerHeight);
                canvas.parent('p5-canvas');
                canvas.style('position', 'absolute');
                canvas.style('top', '0');
                canvas.style('left', '0');
                canvas.style('z-index', '-5');
                
                for (let i = 0; i < 100; i++) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.random(p.height),
                        vx: p.random(-2, 2),
                        vy: p.random(-2, 2),
                        size: p.random(2, 10),
                        hue: p.random(360)
                    });
                }
            };
            
            p.draw = () => {
                p.clear();
                p.colorMode(p.HSB, 360, 100, 100, 100);
                
                // Psychedelic wave field
                for (let x = 0; x < p.width; x += 20) {
                    for (let y = 0; y < p.height; y += 20) {
                        let wave = p.sin(angle + x * 0.01 + y * 0.01) * 50;
                        let hue = (x + y + angle * 10) % 360;
                        
                        p.fill(hue, 80, 60, 10);
                        p.noStroke();
                        p.ellipse(x, y, wave, wave);
                    }
                }
                
                // Flowing particles
                particles.forEach(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    if (particle.x < 0 || particle.x > p.width) particle.vx *= -1;
                    if (particle.y < 0 || particle.y > p.height) particle.vy *= -1;
                    
                    p.fill(particle.hue, 100, 100, 30);
                    p.noStroke();
                    p.ellipse(particle.x, particle.y, particle.size);
                    
                    particle.hue = (particle.hue + 1) % 360;
                });
                
                angle += 0.02;
            };
        });
    }

    // OPTIMIZED PHYSICS MADNESS
    function initPhysicsMadness() {
        if (!window.Matter) return;
        
        const { Engine, Render, World, Bodies } = Matter;
        const engine = Engine.create();
        const world = engine.world;
        
        // Reduce engine frequency for better performance
        engine.world.gravity.y = 0.1;
        
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -6;
            pointer-events: none;
        `;
        document.querySelector('#hero').appendChild(canvas);
        
        const render = Render.create({
            canvas: canvas,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: 'transparent',
                pixelRatio: Math.min(window.devicePixelRatio, 2) // Limit pixel ratio for performance
            }
        });
        
        // Reduced floating physics objects
        const balls = [];
        for (let i = 0; i < 10; i++) {
            const ball = Bodies.circle(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight,
                Math.random() * 15 + 5,
                {
                    restitution: 0.8,
                    render: {
                        fillStyle: `hsl(${Math.random() * 360}, 70%, 50%)`
                    }
                }
            );
            balls.push(ball);
            World.add(world, ball);
        }
        
        // Invisible boundaries
        const walls = [
            Bodies.rectangle(window.innerWidth / 2, -25, window.innerWidth, 50, { isStatic: true }),
            Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 25, window.innerWidth, 50, { isStatic: true }),
            Bodies.rectangle(-25, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true }),
            Bodies.rectangle(window.innerWidth + 25, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true })
        ];
        World.add(world, walls);
        
        // Optimized anti-gravity effect
        let forceInterval = setInterval(() => {
            balls.forEach(ball => {
                const force = {
                    x: (Math.random() - 0.5) * 0.0005,
                    y: -0.0005
                };
                Matter.Body.applyForce(ball, ball.position, force);
            });
        }, 200); // Reduced frequency
        
        Engine.run(engine);
        Render.run(render);
        
        // Cleanup function
        window.physicsCleanup = () => {
            clearInterval(forceInterval);
            Render.stop(render);
            Engine.clear(engine);
        };
    }

    // GSAP ULTRA ANIMATIONS
    function initGSAPMadness() {
        if (!window.gsap) return;
        
        // Crazy timeline animations
        const tl = gsap.timeline({ repeat: -1 });
        
        tl.to('body', {
            duration: 2,
            filter: 'hue-rotate(360deg) saturate(150%) contrast(120%)',
            ease: 'power2.inOut'
        })
        .to('body', {
            duration: 1,
            filter: 'hue-rotate(0deg) saturate(100%) contrast(100%)',
            ease: 'power2.inOut'
        });
        
        // Morphing elements
        gsap.to('.quantum-field', {
            duration: 3,
            scale: 1.05,
            rotation: 5,
            yoyo: true,
            repeat: -1,
            ease: 'power2.inOut'
        });
        
        // Reality bending
        gsap.to('.reality-bend', {
            duration: 8,
            rotationX: 360,
            rotationY: 360,
            transformPerspective: 1000,
            repeat: -1,
            ease: 'none'
        });
        
        // Time warp effect
        gsap.to('.time-warp', {
            duration: 5,
            scaleX: 1.1,
            scaleY: 0.9,
            skewX: 5,
            yoyo: true,
            repeat: -1,
            ease: 'power1.inOut'
        });
    }

    // SOUND REACTIVE VISUALIZER
    function initAudioReactivity() {
        // Mock audio analysis for visual effects
        function simulateAudioData() {
            const bass = Math.random() * 0.5 + 0.5;
            const treble = Math.random() * 0.3 + 0.7;
            const mid = Math.random() * 0.4 + 0.6;
            
            // React to "audio"
            document.documentElement.style.setProperty('--audio-bass', bass);
            document.documentElement.style.setProperty('--audio-treble', treble);
            document.documentElement.style.setProperty('--audio-mid', mid);
            
            // Pulse effects based on audio
            const elements = document.querySelectorAll('.neon-glow, .holographic');
            elements.forEach(el => {
                el.style.filter = `brightness(${1 + bass * 0.5}) saturate(${1 + treble * 0.5})`;
            });
            
            requestAnimationFrame(simulateAudioData);
        }
        
        simulateAudioData();
    }

    // DIMENSIONAL RIFTS
    function createDimensionalRifts() {
        setInterval(() => {
            const rift = document.createElement('div');
            rift.style.cssText = `
                position: fixed;
                width: ${Math.random() * 200 + 50}px;
                height: 2px;
                background: linear-gradient(90deg, transparent, #ff00ff, #00ffff, transparent);
                top: ${Math.random() * window.innerHeight}px;
                left: -300px;
                z-index: 9999;
                animation: rift-travel 2s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
                box-shadow: 0 0 20px #ff00ff;
            `;
            
            document.body.appendChild(rift);
            
            setTimeout(() => {
                rift.remove();
            }, 2000);
        }, 3000);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rift-travel {
                0% { left: -300px; opacity: 0; }
                50% { opacity: 1; }
                100% { left: calc(100vw + 300px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // QUANTUM ENTANGLEMENT CURSOR
    function initQuantumCursor() {
        const cursors = [];
        
        for (let i = 0; i < 5; i++) {
            const cursor = document.createElement('div');
            cursor.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: hsl(${i * 72}, 100%, 50%);
                pointer-events: none;
                z-index: 10000;
                mix-blend-mode: screen;
                transition: all 0.1s ease;
            `;
            document.body.appendChild(cursor);
            cursors.push({ element: cursor, x: 0, y: 0, delay: i * 50 });
        }
        
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function updateQuantumCursors() {
            cursors.forEach((cursor, index) => {
                setTimeout(() => {
                    const x = mouseX + Math.sin(Date.now() * 0.01 + index) * 20;
                    const y = mouseY + Math.cos(Date.now() * 0.01 + index) * 20;
                    
                    cursor.element.style.left = x - 5 + 'px';
                    cursor.element.style.top = y - 5 + 'px';
                    cursor.element.style.transform = `scale(${1 + Math.sin(Date.now() * 0.01 + index) * 0.5})`;
                }, cursor.delay);
            });
            
            requestAnimationFrame(updateQuantumCursors);
        }
        
        updateQuantumCursors();
    }

    // INITIALIZE ALL MADNESS
    initWebGLMadness();
    initP5Madness();
    initPhysicsMadness();
    initGSAPMadness();
    initAudioReactivity();
    createDimensionalRifts();
    initQuantumCursor();

    // REALITY GLITCH EFFECTS
    setInterval(() => {
        if (Math.random() > 0.95) {
            document.body.style.filter = 'invert(1) hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 100);
        }
    }, 1000);

    // OPTIMIZED COSMIC BREATHING
    let cosmicBreathing;
    function cosmicBreathLoop() {
        const scale = 1 + Math.sin(Date.now() / 2000) * 0.01;
        document.body.style.transform = `scale(${scale})`;
        cosmicBreathing = requestAnimationFrame(cosmicBreathLoop);
    }
    cosmicBreathLoop();

    // Performance Monitor
    function performanceMonitor() {
        let fps = 0;
        let lastTime = performance.now();
        
        function tick(currentTime) {
            fps++;
            if (currentTime - lastTime >= 1000) {
                if (fps < 30) {
                    console.warn('🐌 Low FPS detected, reducing effects intensity');
                    // Auto-reduce effects on low performance
                    document.documentElement.style.setProperty('--reduce-effects', 'true');
                }
                fps = 0;
                lastTime = currentTime;
            }
            requestAnimationFrame(tick);
        }
        tick(performance.now());
    }
    
    // Start performance monitoring
    performanceMonitor();

    console.log('🌌💥🚀 OPTIMIZED MADNESS MODE ACTIVATED! REALITY BENT WITH PERFORMANCE! 💥🌌🚀');
}); 