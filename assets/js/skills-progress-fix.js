/*=============== SIMPLE SKILLS PROGRESS FIX ===============*/

// Simple and reliable skills progress bar animation
document.addEventListener('DOMContentLoaded', function() {
  // Function to animate progress bars
  function animateProgressBars() {
    const progressBars = document.querySelectorAll('.skill__progress');
    
    progressBars.forEach((bar, index) => {
      // Get the width from data-width attribute
      const targetWidth = bar.getAttribute('data-width') || bar.dataset.width || '0';
      
      // Reset width to 0 initially
      bar.style.width = '0%';
      bar.style.transition = 'none';
      
      // Animate with delay for staggered effect
      setTimeout(() => {
        bar.style.transition = 'width 2s cubic-bezier(0.4, 0, 0.2, 1)';
        bar.style.width = targetWidth + '%';
        
        // Add glow effect when animation completes
        setTimeout(() => {
          bar.classList.add('animated');
        }, 2000);
      }, index * 150);
    });
  }

  // Create intersection observer for scroll-triggered animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Find progress bars within the visible section
        const progressBars = entry.target.querySelectorAll('.skill__progress');
        
        progressBars.forEach((bar, index) => {
          const targetWidth = bar.getAttribute('data-width') || bar.dataset.width || '0';
          
          // Reset and animate
          bar.style.width = '0%';
          bar.style.transition = 'none';
          
          setTimeout(() => {
            bar.style.transition = 'width 2s cubic-bezier(0.4, 0, 0.2, 1)';
            bar.style.width = targetWidth + '%';
          }, index * 200);
        });
        
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe skills section
  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    observer.observe(skillsSection);
  }

  // Fallback: animate immediately if skills section is already in view
  setTimeout(() => {
    const skillsRect = skillsSection?.getBoundingClientRect();
    if (skillsRect && skillsRect.top < window.innerHeight && skillsRect.bottom > 0) {
      animateProgressBars();
    }
  }, 1000);

  // Manual trigger for testing (you can remove this)
  window.animateSkills = animateProgressBars;
});

// Additional CSS for enhanced progress bars
const additionalCSS = `
  .skill__progress.animated {
    box-shadow: 
      0 0 20px rgba(0, 191, 255, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
  
  .skill__progress {
    position: relative;
    overflow: hidden;
  }
  
  .skill__progress::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: shimmer 2s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
