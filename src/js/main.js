// Main JavaScript file for parallax effects on the resume page

// Function to handle parallax scrolling effect
function handleParallax() {
  const parallaxSections = document.querySelectorAll('.parallax-section');
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    parallaxSections.forEach(section => {
      const speed = parseFloat(section.getAttribute('data-speed')) || 0.5;
      const yPos = -(scrollPosition * speed);
      
      // Apply parallax effect to the background
      const sectionBg = section.querySelector('.section-bg');
      if (sectionBg) {
        sectionBg.style.transform = `translateZ(-1px) scale(2) translateY(${yPos}px)`;
      }
      
      // Apply subtle movement to content based on scroll position
      const content = section.querySelector('.section-content');
      if (content) {
        // Create a subtle floating effect
        const floatValue = Math.sin(scrollPosition * 0.002) * 5;
        content.style.transform = `translateY(${floatValue}px)`;
      }
    });
  });
}

// Function to add floating elements
function addFloatingElements() {
  // Create decorative elements that will float in the background
  const container = document.querySelector('.parallax-container');
  const colors = ['#667eea', '#764ba2', '#a1c4fd', '#c3cfe2', '#e2d1c3'];
  
  // Create 15 floating elements
  for (let i = 0; i < 15; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    
    // Random properties
    const size = Math.random() * 80 + 20; // Between 20px and 100px
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100; // Random position from 0-100%
    const top = Math.random() * 300; // Random vertical position
    const duration = Math.random() * 20 + 10; // Animation duration between 10-30s
    const delay = Math.random() * 5; // Random delay
    
    // Apply styles
    element.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      opacity: 0.1;
      border-radius: 50%;
      left: ${left}%;
      top: ${top}vh;
      z-index: -1;
      animation: float ${duration}s ease-in-out infinite;
      animation-delay: -${delay}s;
      pointer-events: none;
    `;
    
    container.appendChild(element);
  }
  
  // Add CSS animation for floating elements
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      25% {
        transform: translateY(-20px) rotate(5deg);
      }
      50% {
        transform: translateY(-40px) rotate(0deg);
      }
      75% {
        transform: translateY(-20px) rotate(-5deg);
      }
    }
  `;
  document.head.appendChild(style);
}

// Function to add scroll reveal animations
function initScrollReveal() {
  const sections = document.querySelectorAll('.section-content');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // After the animation is complete, we can unobserve
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 // Trigger when at least 10% of the item is visible
  });
  
  // Add initial hidden state and observe all sections
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });
  
  // Add CSS for revealed state
  const style = document.createElement('style');
  style.textContent = `
    .section-content.revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

// Initialize "typing" effect for header
function initTypingEffect() {
  const headerTitle = document.querySelector('header h1');
  const headerSubtitle = document.querySelector('header h2');
  
  if (headerTitle && headerSubtitle) {
    const titleText = headerTitle.textContent;
    const subtitleText = headerSubtitle.textContent;
    
    headerTitle.textContent = '';
    headerSubtitle.textContent = '';
    headerSubtitle.style.opacity = '0';
    
    // Type out the title first
    let titleIndex = 0;
    function typeTitle() {
      if (titleIndex < titleText.length) {
        headerTitle.textContent += titleText.charAt(titleIndex);
        titleIndex++;
        setTimeout(typeTitle, 100);
      } else {
        // After title is typed, show the subtitle with fade in
        setTimeout(() => {
          headerSubtitle.textContent = subtitleText;
          headerSubtitle.style.transition = 'opacity 1s ease';
          headerSubtitle.style.opacity = '1';
        }, 500);
      }
    }
    
    setTimeout(typeTitle, 500);
  }
}

// Function to add mouse parallax effect to header
function addMouseParallax() {
  const header = document.querySelector('header');
  const headerContent = document.querySelector('.header-content');
  
  if (header && headerContent) {
    header.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      // Move the content slightly based on mouse position
      headerContent.style.transform = `translateX(${x * 20 - 10}px) translateY(${y * 20 - 10}px)`;
      
      // Subtle tilt effect
      headerContent.style.transition = 'transform 0.2s ease-out';
    });
    
    // Reset when mouse leaves
    header.addEventListener('mouseleave', () => {
      headerContent.style.transform = 'translateX(0) translateY(0)';
      headerContent.style.transition = 'transform 0.5s ease';
    });
  }
}

// Initialize everything when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
  handleParallax();
  addFloatingElements();
  initScrollReveal();
  initTypingEffect();
  addMouseParallax();
  
  // Initialize smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});