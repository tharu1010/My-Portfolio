/*=============== HEADER ANIMATIONS CONTROLLER ===============*/

class HeaderAnimations {
    constructor() {
        this.header = document.querySelector('.header');
        this.nav = document.querySelector('.nav');
        this.navToggle = document.querySelector('.nav__toggle');
        this.navClose = document.querySelector('.nav__close');
        this.navMenu = document.querySelector('.nav__menu');
        this.navLinks = document.querySelectorAll('.nav__link');
        this.themeToggle = document.querySelector('.theme-toggle');
        
        this.lastScrollY = window.scrollY;
        this.isScrollingDown = false;
        
        this.init();
    }

    init() {
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupActiveNavigation();
        this.setupThemeToggle();
        this.setupLogoAnimations();
        this.setupNavLinkAnimations();
        this.animateNavItems();
    }

    /*=============== SCROLL EFFECTS ===============*/
    setupScrollEffects() {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleHeaderScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    handleHeaderScroll() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for styling
        if (currentScrollY > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (currentScrollY > 200) {
            if (currentScrollY > this.lastScrollY && !this.isScrollingDown) {
                // Scrolling down
                this.header.classList.add('hide-on-scroll');
                this.header.classList.remove('show-on-scroll');
                this.isScrollingDown = true;
            } else if (currentScrollY < this.lastScrollY && this.isScrollingDown) {
                // Scrolling up
                this.header.classList.remove('hide-on-scroll');
                this.header.classList.add('show-on-scroll');
                this.isScrollingDown = false;
            }
        }

        this.lastScrollY = currentScrollY;
    }

    /*=============== MOBILE MENU ===============*/
    setupMobileMenu() {
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                this.openMobileMenu();
            });
        }

        if (this.navClose) {
            this.navClose.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        // Close menu when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                this.navMenu && 
                this.navMenu.classList.contains('show') &&
                !this.navMenu.contains(e.target) &&
                !this.navToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    openMobileMenu() {
        if (this.navMenu) {
            this.navMenu.classList.add('show');
            this.navToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animate menu items
            this.animateMobileMenuItems();
        }
    }

    closeMobileMenu() {
        if (this.navMenu) {
            this.navMenu.classList.remove('show');
            this.navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    animateMobileMenuItems() {
        const menuItems = this.navMenu.querySelectorAll('.nav__item');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(30px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100 + 200);
        });
    }

    /*=============== ACTIVE NAVIGATION ===============*/
    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    this.setActiveNavLink(sectionId);
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    setActiveNavLink(activeId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(`#${activeId}`)) {
                link.classList.add('active');
                this.animateActiveLink(link);
            }
        });
    }

    animateActiveLink(link) {
        // Add pulse effect to active link
        link.style.animation = 'none';
        setTimeout(() => {
            link.style.animation = 'logoPulse 0.6s ease';
        }, 10);
    }

    /*=============== THEME TOGGLE ===============*/
    setupThemeToggle() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.animateThemeToggle();
            });
        }
    }

    animateThemeToggle() {
        const icon = this.themeToggle.querySelector('i');
        if (icon) {
            icon.style.transform = 'rotate(360deg) scale(0.8)';
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }, 300);
        }
    }

    /*=============== LOGO ANIMATIONS ===============*/
    setupLogoAnimations() {
        const logo = document.querySelector('.nav__logo');
        if (logo) {
            // Add click animation
            logo.addEventListener('click', () => {
                this.animateLogo();
            });

            // Add hover magnetic effect
            logo.addEventListener('mousemove', (e) => {
                this.addMagneticEffect(e, logo);
            });

            logo.addEventListener('mouseleave', () => {
                logo.style.transform = '';
            });
        }
    }

    animateLogo() {
        const logo = document.querySelector('.nav__logo');
        if (logo) {
            logo.style.animation = 'none';
            setTimeout(() => {
                logo.style.animation = 'logoPulse 0.8s ease, logoGlow 0.8s ease';
            }, 10);
        }
    }

    addMagneticEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.1;
        const moveY = y * 0.1;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
    }

    /*=============== NAV LINK ANIMATIONS ===============*/
    setupNavLinkAnimations() {
        this.navLinks.forEach((link, index) => {
            // Add hover animations
            link.addEventListener('mouseenter', () => {
                this.animateNavLinkHover(link);
            });

            link.addEventListener('mouseleave', () => {
                this.resetNavLinkHover(link);
            });

            // Add click ripple effect
            link.addEventListener('click', (e) => {
                this.createRippleEffect(e, link);
            });
        });
    }

    animateNavLinkHover(link) {
        const icon = link.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        }
    }

    resetNavLinkHover(link) {
        const icon = link.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    }

    createRippleEffect(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(138, 97, 255, 0.3), transparent);
            border-radius: 50%;
            pointer-events: none;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    /*=============== ANIMATE NAV ITEMS ON LOAD ===============*/
    animateNavItems() {
        const navItems = document.querySelectorAll('.nav__item');
        navItems.forEach((item, index) => {
            item.style.setProperty('--i', index);
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100 + 500);
        });
    }

    /*=============== PERFORMANCE OPTIMIZATION ===============*/
    debounce(func, wait) {
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
}

/*=============== ADDITIONAL ANIMATIONS ===============*/

// Add ripple effect CSS
const rippleCSS = `
    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

/*=============== PARTICLE EFFECT FOR HEADER ===============*/

class HeaderParticles {
    constructor() {
        this.header = document.querySelector('.header');
        this.particles = [];
        this.particleCount = 20;
        
        if (this.header) {
            this.createParticleContainer();
            this.generateParticles();
            this.animateParticles();
        }
    }

    createParticleContainer() {
        this.particleContainer = document.createElement('div');
        this.particleContainer.className = 'header-particles';
        this.particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            opacity: 0.3;
        `;
        this.header.appendChild(this.particleContainer);
    }

    generateParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'header-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: radial-gradient(circle, rgba(138, 97, 255, 0.6), transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: headerParticleFloat ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            this.particleContainer.appendChild(particle);
            this.particles.push(particle);
        }
    }

    animateParticles() {
        const particleCSS = `
            @keyframes headerParticleFloat {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = particleCSS;
        document.head.appendChild(style);
    }
}

/*=============== INITIALIZE HEADER ANIMATIONS ===============*/

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if header exists before initializing
    if (document.querySelector('.header')) {
        new HeaderAnimations();
        
        // Add particles only on desktop
        if (window.innerWidth > 768) {
            new HeaderParticles();
        }
    }
});

// Re-initialize on window resize for responsive behavior
window.addEventListener('resize', () => {
    // Remove existing particles on mobile
    const existingParticles = document.querySelector('.header-particles');
    if (existingParticles && window.innerWidth <= 768) {
        existingParticles.remove();
    }
    
    // Add particles on desktop
    if (!existingParticles && window.innerWidth > 768) {
        new HeaderParticles();
    }
});

/*=============== SMOOTH SCROLL FOR NAVIGATION ===============*/

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

/*=============== PERFORMANCE MONITORING ===============*/

// Monitor performance and disable animations if needed
const checkPerformance = () => {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.body.classList.add('reduce-animations');
        }
    }
};

// Check on load
document.addEventListener('DOMContentLoaded', checkPerformance);

/*=============== ACCESSIBILITY IMPROVEMENTS ===============*/

// Respect user's motion preferences
const respectMotionPreferences = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.body.classList.add('reduce-animations');
    }
    
    prefersReducedMotion.addEventListener('change', () => {
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduce-animations');
        } else {
            document.body.classList.remove('reduce-animations');
        }
    });
};

document.addEventListener('DOMContentLoaded', respectMotionPreferences);
