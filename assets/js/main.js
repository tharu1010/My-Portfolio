/*===== PRELOADER =====*/
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1000);
});

/*===== MENU TOGGLE =====*/
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
}

/*===== REMOVE MENU MOBILE =====*/
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

/*===== HEADER SCROLL EFFECT =====*/
const header = document.querySelector('.l-header');

window.addEventListener('scroll', () => {
    if (window.scrollY >= 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/*===== SCROLL PROGRESS INDICATOR =====*/
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrolled + '%';
});

/*===== ACTIVE LINK HIGHLIGHT =====*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass?.classList.add('active-link');
        } else {
            sectionsClass?.classList.remove('active-link');
        }
    });
};

window.addEventListener('scroll', scrollActive);

/*===== BACK TO TOP BUTTON =====*/
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY >= 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/*===== TYPING ANIMATION =====*/
const typingText = document.querySelector('.typing-text');
const words = ['Hello!', 'Welcome!', 'Hi There!', 'Greetings!'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1000);
            return;
        }
    }
    
    setTimeout(typeWriter, isDeleting ? 50 : 100);
}

// Start typing animation
setTimeout(typeWriter, 1000);

/*===== SKILL BARS ANIMATION =====*/
const skillsSection = document.getElementById('technical');
let skillsAnimated = false;

const animateSkills = () => {
    if (!skillsAnimated) {
        const skillProgress = document.querySelectorAll('.skill-progress');
        
        skillProgress.forEach(skill => {
            const width = skill.getAttribute('data-width');
            skill.style.width = width;
        });
        
        skillsAnimated = true;
    }
};

// Intersection Observer for skills animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        }
    });
}, {
    threshold: 0.5
});

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

/*===== SMOOTH SCROLLING FOR ANCHOR LINKS =====*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*===== SCROLL REVEAL ANIMATIONS =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    easing: 'ease-in-out'
});

// Home Section
sr.reveal('.home__data', {
    delay: 300,
    origin: 'left'
});

sr.reveal('.home__img', {
    delay: 600,
    origin: 'right'
});

sr.reveal('.home__social-icon', {
    delay: 400,
    interval: 200
});

// About Section
sr.reveal('.about__img', {
    delay: 200,
    origin: 'left'
});

sr.reveal('.about__content', {
    delay: 400,
    origin: 'right'
});

sr.reveal('.about__stat', {
    delay: 600,
    interval: 200
});

// Education Section
sr.reveal('.education-card', {
    delay: 200,
    interval: 300
});

// Technical Skills
sr.reveal('.tech-category', {
    delay: 200,
    interval: 300
});

sr.reveal('.skill-item', {
    delay: 400,
    interval: 100
});

// Soft Skills
sr.reveal('.soft-skill__item', {
    delay: 200,
    interval: 150
});

// Projects
sr.reveal('.nft', {
    delay: 200,
    interval: 200
});

// Contact
sr.reveal('.contact__data', {
    delay: 200,
    interval: 200
});

/*===== THEME TOGGLE (OPTIONAL) =====*/
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}

// Theme toggle functionality
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        
        // Save theme preference
        if (body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light-theme');
        } else {
            localStorage.removeItem('theme');
        }
    });
}

/*===== PARALLAX EFFECT =====*/
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

/*===== MOUSE CURSOR EFFECT =====*/
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
}

/*===== LAZY LOADING IMAGES =====*/
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('loading');
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

/*===== FORM VALIDATION (IF CONTACT FORM EXISTS) =====*/
const contactForm = document.querySelector('.contact__form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add form validation logic here
        const formData = new FormData(contactForm);
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

/*===== NOTIFICATION SYSTEM =====*/
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/*===== PERFORMANCE OPTIMIZATIONS =====*/
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedScrollActive = debounce(scrollActive, 10);
window.addEventListener('scroll', debouncedScrollActive);

// Optimize animations for better performance
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Remove animation classes
    document.querySelectorAll('[class*="animate"]').forEach(el => {
        el.classList.remove(...Array.from(el.classList).filter(cls => cls.includes('animate')));
    });
} 
