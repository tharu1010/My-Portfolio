/*=============== MODERN ANIMATIONS CONTROLLER ===============*/

class ModernAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.setupCursorEffects();
    this.setupParticleSystem();
    this.setupScrollProgress();
    this.setupStaggeredAnimations();
    this.setupTypewriterEffect();
    this.setupSkillProgressAnimations();
    this.setupMagneticButtons();
  }

  // Intersection Observer for scroll-triggered animations
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          // For staggered animations
          if (entry.target.classList.contains('stagger-container')) {
            this.animateStaggeredChildren(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .zoom-in, .stagger-container');
    animatedElements.forEach(el => observer.observe(el));
  }

  // Staggered animations for grid items
  animateStaggeredChildren(container) {
    const children = container.children;
    Array.from(children).forEach((child, index) => {
      setTimeout(() => {
        child.classList.add('animate');
      }, index * 100);
    });
  }

  // Scroll progress indicator
  setupScrollProgress() {
    const progressCircle = document.querySelector('.scroll-progress-circle');
    if (!progressCircle) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      progressCircle.style.setProperty('--progress', `${scrollPercent}%`);
    });

    // Smooth scroll to top
    progressCircle.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Custom cursor effects
  setupCursorEffects() {
    if (window.innerWidth <= 768) return; // Skip on mobile

    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    const cursorTrails = [];
    for (let i = 0; i < 5; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      document.body.appendChild(trail);
      cursorTrails.push(trail);
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailPositions = Array(5).fill().map(() => ({ x: 0, y: 0 }));

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      // Main cursor
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      // Trail effect
      trailPositions.unshift({ x: cursorX, y: cursorY });
      trailPositions.pop();

      cursorTrails.forEach((trail, index) => {
        const position = trailPositions[index];
        trail.style.left = `${position.x}px`;
        trail.style.top = `${position.y}px`;
        trail.style.opacity = 1 - (index * 0.2);
        trail.style.transform = `translate(-50%, -50%) scale(${1 - index * 0.1})`;
      });

      requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(99, 102, 241, 0.4) 50%, transparent 100%)';
      });

      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'radial-gradient(circle, rgba(0, 191, 255, 0.6) 0%, rgba(0, 191, 255, 0.3) 50%, transparent 100%)';
      });
    });
  }

  // Particle system
  setupParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-bg';
    document.querySelector('.hero').appendChild(particleContainer);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle-dot';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 20}s`;
      particle.style.animationDuration = `${15 + Math.random() * 10}s`;
      particleContainer.appendChild(particle);
    }
  }

  // Typewriter effect
  setupTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter-effect');
    
    typewriterElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.width = '0';
      
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(timer);
          // Remove cursor after typing
          setTimeout(() => {
            element.style.borderRight = 'none';
          }, 1000);
        }
      }, 100);
    });
  }

  // Skill progress animations
  setupSkillProgressAnimations() {
    const skillBars = document.querySelectorAll('.skill__progress');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const percentage = progressBar.dataset.percentage || '0';
          
          // Animate the width
          setTimeout(() => {
            progressBar.style.width = `${percentage}%`;
          }, 200);
          
          // Add shimmer effect
          progressBar.classList.add('skill-progress-animated');
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
  }

  // Magnetic button effects
  setupMagneticButtons() {
    const magneticElements = document.querySelectorAll('.btn, .card');
    
    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const strength = 0.3;
        element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
      });
    });
  }

  // Scroll animations
  setupScrollAnimations() {
    let ticking = false;

    const updateScrollAnimations = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      // Parallax effect for hero background
      const heroBackground = document.querySelector('.hero__background');
      if (heroBackground) {
        heroBackground.style.transform = `translateY(${rate}px)`;
      }

      // Floating shapes animation based on scroll
      const shapes = document.querySelectorAll('.shape');
      shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
      });

      ticking = false;
    };

    const requestScrollUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollAnimations);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestScrollUpdate);
  }
}

// Text reveal animation
class TextRevealAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      duration: 1000,
      delay: 0,
      ...options
    };
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(this.element);
  }

  animate() {
    this.element.classList.add('text-reveal');
    setTimeout(() => {
      this.element.classList.remove('text-reveal');
    }, this.options.duration);
  }
}

// Enhanced loading screen
class LoadingScreen {
  constructor() {
    this.loadingScreen = document.querySelector('.loading-screen');
    this.init();
  }

  init() {
    // Add modern loading animation
    const spinner = this.loadingScreen.querySelector('.loading-spinner');
    if (spinner) {
      spinner.style.animation = 'spin 1s linear infinite, glowPulse 2s ease infinite';
    }

    // Hide loading screen when page is loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.hide();
      }, 500);
    });
  }

  hide() {
    this.loadingScreen.classList.add('hidden');
    setTimeout(() => {
      this.loadingScreen.style.display = 'none';
    }, 500);
  }
}

// Page transition animations
class PageTransitions {
  constructor() {
    this.init();
  }

  init() {
    // Add page enter animation
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    });

    // Handle navigation animations
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ModernAnimations();
  new LoadingScreen();
  new PageTransitions();

  // Initialize text reveal animations
  const textRevealElements = document.querySelectorAll('.section__title, .hero__name');
  textRevealElements.forEach(element => {
    new TextRevealAnimation(element);
  });

  // Add animation classes to existing elements
  const sections = document.querySelectorAll('.section');
  sections.forEach((section, index) => {
    section.classList.add('fade-in-up');
  });

  const cards = document.querySelectorAll('.project__card, .skill__item, .contact__card');
  cards.forEach((card, index) => {
    card.classList.add('card-magnetic');
    if (index % 2 === 0) {
      card.classList.add('fade-in-left');
    } else {
      card.classList.add('fade-in-right');
    }
  });

  // Add enhanced button classes
  const buttons = document.querySelectorAll('.btn--primary');
  buttons.forEach(button => {
    button.classList.add('btn-enhanced');
  });

  // Add glass enhanced to glassmorphism elements
  const glassElements = document.querySelectorAll('[class*="glass"]');
  glassElements.forEach(element => {
    element.classList.add('glass-enhanced');
  });
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ModernAnimations,
    TextRevealAnimation,
    LoadingScreen,
    PageTransitions
  };
}
