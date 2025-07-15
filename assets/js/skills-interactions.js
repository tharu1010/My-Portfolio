/*=============== MODERN SKILLS INTERACTIONS ===============*/

class SkillsAnimationController {
  constructor() {
    this.init();
  }

  init() {
    this.setupSkillProgressAnimations();
    this.setupSkillHoverEffects();
    this.setupSkillTooltips();
    this.setupSkillMastery();
    this.setupIntersectionObserver();
    this.setupSkillFiltering();
  }

  // Enhanced skill progress animations
  setupSkillProgressAnimations() {
    const skillBars = document.querySelectorAll('.skill__progress');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          // Check for both data-width and data-percentage attributes
          const percentage = progressBar.dataset.width || 
                           progressBar.dataset.percentage || 
                           progressBar.getAttribute('data-width') || 
                           progressBar.getAttribute('data-percentage') || '0';
          
          // Add staggered animation delay
          const delay = Array.from(skillBars).indexOf(progressBar) * 200;
          
          setTimeout(() => {
            progressBar.style.width = `${percentage}%`;
            progressBar.style.transition = 'width 2s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Add completion effect
            setTimeout(() => {
              progressBar.classList.add('skill-progress-complete');
              this.createSkillParticles(progressBar);
            }, 1500);
          }, delay);
          
          // Disconnect observer for this element to prevent re-triggering
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => observer.observe(bar));
  }

  // Create particle effect when skill animation completes
  createSkillParticles(progressBar) {
    const rect = progressBar.getBoundingClientRect();
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'skill-particle';
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${rect.right}px;
        top: ${rect.top + rect.height/2}px;
      `;
      
      document.body.appendChild(particle);
      
      // Animate particle
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = 50 + Math.random() * 30;
      const duration = 800 + Math.random() * 400;
      
      particle.animate([
        {
          transform: 'translate(0, 0) scale(1)',
          opacity: 1
        },
        {
          transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
          opacity: 0
        }
      ], {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).onfinish = () => {
        particle.remove();
      };
    }
  }

  // Enhanced hover effects for skill items
  setupSkillHoverEffects() {
    const skillItems = document.querySelectorAll('.skill__item');
    
    skillItems.forEach(item => {
      const icon = item.querySelector('.skill__icon');
      const content = item.querySelector('.skill__content');
      
      item.addEventListener('mouseenter', (e) => {
        // Add ripple effect
        this.createRippleEffect(e, item);
        
        // Magnetic effect
        this.addMagneticEffect(item);
        
        // Icon glow enhancement
        if (icon) {
          icon.style.filter = 'brightness(1.2) saturate(1.3) drop-shadow(0 0 20px currentColor)';
        }
      });
      
      item.addEventListener('mouseleave', () => {
        this.removeMagneticEffect(item);
        
        if (icon) {
          icon.style.filter = '';
        }
      });
      
      item.addEventListener('mousemove', (e) => {
        this.updateMagneticPosition(e, item);
      });
    });
  }

  // Create ripple effect on hover
  createRippleEffect(event, element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('div');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(0, 191, 255, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    ripple.animate([
      { transform: 'scale(0)', opacity: 1 },
      { transform: 'scale(1)', opacity: 0 }
    ], {
      duration: 600,
      easing: 'ease-out'
    }).onfinish = () => ripple.remove();
  }

  // Magnetic hover effect
  addMagneticEffect(element) {
    element.style.transition = 'transform 0.1s ease';
  }

  removeMagneticEffect(element) {
    element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    element.style.transform = '';
  }

  updateMagneticPosition(event, element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (event.clientX - centerX) * 0.1;
    const deltaY = (event.clientY - centerY) * 0.1;
    
    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  }

  // Setup interactive tooltips
  setupSkillTooltips() {
    const skillItems = document.querySelectorAll('.skill__item');
    
    skillItems.forEach(item => {
      const skillName = item.querySelector('.skill__content h4')?.textContent;
      const skillPercentage = item.querySelector('.skill__percentage')?.textContent;
      
      if (skillName && skillPercentage) {
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.textContent = `${skillName}: ${skillPercentage} proficiency`;
        item.appendChild(tooltip);
      }
    });
  }

  // Setup skill mastery indicators
  setupSkillMastery() {
    const skillItems = document.querySelectorAll('.skill__item');
    
    skillItems.forEach(item => {
      const progressBar = item.querySelector('.skill__progress');
      const percentage = parseInt(progressBar?.dataset.width || 
                                progressBar?.dataset.percentage || 
                                progressBar?.getAttribute('data-width') || 
                                progressBar?.getAttribute('data-percentage') || '0');
      
      let masteryLevel, masteryText;
      if (percentage >= 90) {
        masteryLevel = 'expert';
        masteryText = 'Expert';
      } else if (percentage >= 70) {
        masteryLevel = 'intermediate';
        masteryText = 'Pro';
      } else {
        masteryLevel = 'beginner';
        masteryText = 'Learning';
      }
      
      const mastery = document.createElement('div');
      mastery.className = `skill-mastery ${masteryLevel}`;
      mastery.textContent = masteryText;
      item.style.position = 'relative';
      item.appendChild(mastery);
    });
  }

  // Enhanced intersection observer for staggered animations
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          if (element.classList.contains('skills__category')) {
            this.animateSkillCategory(element);
          }
          
          if (element.classList.contains('soft-skill__item')) {
            this.animateSoftSkill(element);
          }
        }
      });
    }, { threshold: 0.2 });

    // Observe skill categories and soft skills
    const categories = document.querySelectorAll('.skills__category');
    const softSkills = document.querySelectorAll('.soft-skill__item');
    
    categories.forEach(category => observer.observe(category));
    softSkills.forEach(skill => observer.observe(skill));
  }

  // Animate skill category entrance
  animateSkillCategory(category) {
    const skillItems = category.querySelectorAll('.skill__item');
    
    category.style.opacity = '0';
    category.style.transform = 'translateY(50px)';
    
    category.animate([
      { opacity: 0, transform: 'translateY(50px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], {
      duration: 800,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      fill: 'forwards'
    });

    // Stagger skill items
    skillItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-30px)';
      
      setTimeout(() => {
        item.animate([
          { opacity: 0, transform: 'translateX(-30px)' },
          { opacity: 1, transform: 'translateX(0)' }
        ], {
          duration: 600,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          fill: 'forwards'
        });
      }, index * 100);
    });
  }

  // Animate soft skill entrance
  animateSoftSkill(skill) {
    skill.style.opacity = '0';
    skill.style.transform = 'scale(0.8) translateY(30px)';
    
    const delay = Array.from(document.querySelectorAll('.soft-skill__item')).indexOf(skill) * 150;
    
    setTimeout(() => {
      skill.animate([
        { opacity: 0, transform: 'scale(0.8) translateY(30px)' },
        { opacity: 1, transform: 'scale(1) translateY(0)' }
      ], {
        duration: 700,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards'
      });
    }, delay);
  }

  // Skill filtering functionality
  setupSkillFiltering() {
    const filterButtons = document.querySelectorAll('.skills-filter-btn');
    const skillCategories = document.querySelectorAll('.skills__category');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filterValue = button.dataset.filter;
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter categories
        skillCategories.forEach(category => {
          if (filterValue === 'all' || category.classList.contains(filterValue)) {
            category.style.display = 'block';
            category.animate([
              { opacity: 0, transform: 'scale(0.9)' },
              { opacity: 1, transform: 'scale(1)' }
            ], {
              duration: 400,
              easing: 'ease-out'
            });
          } else {
            category.animate([
              { opacity: 1, transform: 'scale(1)' },
              { opacity: 0, transform: 'scale(0.9)' }
            ], {
              duration: 300,
              easing: 'ease-in'
            }).onfinish = () => {
              category.style.display = 'none';
            };
          }
        });
      });
    });
  }
}

// Skill Card 3D Tilt Effect
class SkillCard3D {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.element.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.element.addEventListener('mouseleave', () => this.handleMouseLeave());
  }

  handleMouseMove(e) {
    const rect = this.element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    
    const rotateX = deltaY * -10;
    const rotateY = deltaX * 10;
    
    this.element.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(20px)
    `;
  }

  handleMouseLeave() {
    this.element.style.transform = '';
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SkillsAnimationController();
  
  // Apply 3D effect to skill categories
  const skillCategories = document.querySelectorAll('.skills__category');
  skillCategories.forEach(category => {
    new SkillCard3D(category);
  });
  
  // Add enhanced classes to existing elements
  const skillItems = document.querySelectorAll('.skill__item');
  skillItems.forEach((item, index) => {
    item.classList.add('stagger-item');
    item.style.animationDelay = `${index * 0.1}s`;
  });
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SkillsAnimationController,
    SkillCard3D
  };
}
