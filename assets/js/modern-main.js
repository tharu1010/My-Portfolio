/*=============== MODERN PORTFOLIO JAVASCRIPT ===============*/

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.initLoadingScreen();
    this.initCustomCursor();
    this.initNavigation();
    this.initScrollEffects();
    this.initThemeToggle();
    this.initAnimations();
    this.initSkillBars();
    this.initProjectFilters();
    this.initContactForm();
    this.initTypingAnimation();
    this.initCounters();
  }

  /*=============== LOADING SCREEN ===============*/
  initLoadingScreen() {
    window.addEventListener('load', () => {
      const loadingScreen = document.getElementById('loadingScreen');
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
      }, 1500);
    });
  }

  /*=============== CUSTOM CURSOR ===============*/
  initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');

    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      const diffX = mouseX - cursorX;
      const diffY = mouseY - cursorY;

      cursorX += diffX * 0.1;
      cursorY += diffY * 0.1;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';

      requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .project__card, .skill__item');
    
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.opacity = '0.8';
      });

      element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.opacity = '0.5';
      });
    });
  }

  /*=============== NAVIGATION ===============*/
  initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav__menu');
    const navClose = document.getElementById('navClose');
    const navLinks = document.querySelectorAll('.nav__link');

    // Toggle mobile menu
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.add('show');
      });
    }

    if (navClose) {
      navClose.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    }

    // Close menu when clicking on links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    const highlightActiveLink = () => {
      const scrollY = window.pageYOffset;
      
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink?.classList.add('active');
        } else {
          navLink?.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', highlightActiveLink);
  }

  /*=============== SCROLL EFFECTS ===============*/
  initScrollEffects() {
    const header = document.querySelector('.header');
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTopBtn = document.getElementById('scrollTop');

    // Header scroll effect
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY > 100;
      header.classList.toggle('scrolled', scrolled);
    });

    // Scroll progress
    window.addEventListener('scroll', () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      scrollProgress.style.width = scrolled + '%';
    });

    // Back to top button
    window.addEventListener('scroll', () => {
      const showButton = window.scrollY >= 400;
      scrollTopBtn.classList.toggle('show', showButton);
    });

    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Smooth scrolling for anchor links
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
  }

  /*=============== THEME TOGGLE ===============*/
  initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update icon based on theme
    this.updateThemeIcon(themeIcon, savedTheme);

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        this.updateThemeIcon(themeIcon, newTheme);
      });
    }
  }

  updateThemeIcon(icon, theme) {
    if (!icon) return;
    
    if (theme === 'dark') {
      icon.setAttribute('data-lucide', 'sun');
    } else {
      icon.setAttribute('data-lucide', 'moon');
    }
    
    // Re-initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  /*=============== ANIMATIONS ===============*/
  initAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll([
      '.section__header',
      '.about__stats',
      '.timeline__item',
      '.skills__category',
      '.project__card',
      '.contact__card'
    ].join(','));

    animateElements.forEach(el => {
      observer.observe(el);
    });
  }

  /*=============== SKILL BARS ANIMATION ===============*/
  initSkillBars() {
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;

    const animateSkills = () => {
      if (skillsAnimated) return;
      
      const skillBars = document.querySelectorAll('.skill__progress');
      
      skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
          setTimeout(() => {
            bar.style.width = width + '%';
          }, 200);
        }
      });
      
      skillsAnimated = true;
    };

    // Intersection Observer for skills animation
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkills();
        }
      });
    }, { threshold: 0.5 });

    if (skillsSection) {
      skillsObserver.observe(skillsSection);
    }
  }

  /*=============== PROJECT FILTERS ===============*/
  initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter__btn');
    const projectCards = document.querySelectorAll('.project__card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category').split(' ');
          const shouldShow = filter === 'all' || categories.includes(filter);
          
          if (shouldShow) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  /*=============== CONTACT FORM ===============*/
  initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        if (!name || !email || !subject || !message) {
          this.showNotification('Please fill in all fields', 'error');
          return;
        }
        
        if (!this.isValidEmail(email)) {
          this.showNotification('Please enter a valid email address', 'error');
          return;
        }
        
        // Simulate form submission
        this.showNotification('Thank you! Your message has been sent.', 'success');
        contactForm.reset();
      });
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '15px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: '10000',
      transform: 'translateX(400px)',
      transition: 'transform 0.3s ease',
      backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  /*=============== TYPING ANIMATION ===============*/
  initTypingAnimation() {
    const greetingElement = document.querySelector('.hero__greeting');
    if (!greetingElement) return;

    const greetings = ['Hello!', 'Welcome!', 'Hi There!', 'Greetings!'];
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeText = () => {
      const currentText = greetings[currentIndex];
      
      if (isDeleting) {
        greetingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % greetings.length;
        }
      } else {
        greetingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(typeText, 1500);
          return;
        }
      }
      
      setTimeout(typeText, isDeleting ? 50 : 100);
    };

    // Start typing animation after page load
    setTimeout(typeText, 2000);
  }

  /*=============== COUNTER ANIMATION ===============*/
  initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    let countersAnimated = false;

    const animateCounters = () => {
      if (countersAnimated) return;
      
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          const current = Math.floor(progress * target);
          counter.textContent = current + (counter.textContent.includes('+') ? '+' : '');
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        };
        
        requestAnimationFrame(updateCounter);
      });
      
      countersAnimated = true;
    };

    // Intersection Observer for counters
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
          }
        });
      }, { threshold: 0.5 });

      counterObserver.observe(aboutSection);
    }
  }
}

/*=============== INITIALIZE APP ===============*/
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

/*=============== PERFORMANCE OPTIMIZATIONS ===============*/
// Lazy loading for images
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

// Debounce scroll events for better performance
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

// Add CSS animations on scroll with better performance
const addScrollAnimations = debounce(() => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('animate-in');
    }
  });
}, 10);

window.addEventListener('scroll', addScrollAnimations);

/*=============== ACCESSIBILITY IMPROVEMENTS ===============*/
// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
  const navMenu = document.querySelector('.nav__menu');
  
  if (e.key === 'Escape' && navMenu.classList.contains('show')) {
    navMenu.classList.remove('show');
    document.getElementById('navToggle')?.focus();
  }
});

// Focus management for better accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
  const focusables = element.querySelectorAll(focusableElements);
  const firstFocusable = focusables[0];
  const lastFocusable = focusables[focusables.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  });
}

// Apply focus trap to mobile menu
const navMenu = document.querySelector('.nav__menu');
if (navMenu) {
  trapFocus(navMenu);
}

/*=============== ANALYTICS & TRACKING ===============*/
// Track button clicks for analytics (replace with your analytics code)
document.addEventListener('click', (e) => {
  const target = e.target.closest('a, button');
  if (!target) return;

  const trackingData = {
    element: target.tagName.toLowerCase(),
    text: target.textContent.trim(),
    href: target.href || null,
    timestamp: new Date().toISOString()
  };

  // Send to your analytics service
  console.log('Click tracked:', trackingData);
});

/*=============== ERROR HANDLING ===============*/
window.addEventListener('error', (e) => {
  console.error('Portfolio error:', e.error);
  // You can send errors to your error tracking service here
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  // Handle promise rejections
});
