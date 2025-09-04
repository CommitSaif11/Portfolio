// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animated counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 50;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
}

// Animated skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const progress = skillBar.getAttribute('data-progress');
                skillBar.style.width = progress + '%';
                observer.unobserve(skillBar);
            }
        });
    });

    skillBars.forEach(bar => observer.observe(bar));
}

// Scroll animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.project-card, .timeline-item, .skill-category');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Contact form handling
function initContactForm() {
    // Initialize EmailJS with your public key, Saif
    emailjs.init("2xDYko2j3MK8phAMN"); // You'll get this from EmailJS
    
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            message: formData.get('message'),
            to_email: 'alamsaif1107@gmail.com'
        };
        
        // Send email using EmailJS
        emailjs.send('service_1atjo7p', 'template_f7pudbv', templateParams)
            .then(() => {
                alert('Thank you for your message! Saif will get back to you soon.');
                form.reset();
            })
            .catch((error) => {
                alert('Sorry, there was an error sending your message. Please try again.');
                console.error('Error:', error);
            });
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    const text = 'Data Scientist & AI Engineer';
    subtitle.innerHTML = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            subtitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Particle background effect
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00d4ff;
            border-radius: 50%;
            opacity: 0.3;
            animation: float ${Math.random() * 10 + 5}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        hero.appendChild(particle);
    }
    
    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
            10% { opacity: 0.3; }
            90% { opacity: 0.3; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateCounters();
    animateSkillBars();
    initScrollAnimations();
    initContactForm();
    initTypingEffect();
    createParticles();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});