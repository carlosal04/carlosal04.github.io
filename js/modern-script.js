/* Modern JavaScript for Basaltos y Agregados */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.setAttribute('aria-expanded', 
        this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      );
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navMenu && navMenu.classList.contains('active')) {
      if (!event.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
        if (mobileToggle) {
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      }
    }
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (mobileToggle) {
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Scroll Header Effect
  const header = document.querySelector('.modern-header');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
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

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements that should fade in
  document.querySelectorAll('.service-card, .value-card, .about-grid').forEach(el => {
    observer.observe(el);
  });

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
      
      if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        navLink.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);
});

// Lazy Loading Images
if ('loading' in HTMLImageElement.prototype) {
  // Browser supports native lazy loading
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(img => {
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// Cookie Consent (if needed)
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Initialize cookie consent if element exists
document.addEventListener('DOMContentLoaded', function() {
  const cookieBox = document.getElementById('cookie-consent');
  const cookieButton = document.getElementById('cookie-accept');
  
  if (cookieBox && !getCookie('cookie-consent')) {
    cookieBox.style.display = 'block';
    
    if (cookieButton) {
      cookieButton.addEventListener('click', function() {
        setCookie('cookie-consent', 'accepted', 365);
        cookieBox.style.display = 'none';
      });
    }
  }
});

// Performance: Preload critical resources
function preloadResource(href, as) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = href;
  document.head.appendChild(link);
}

// Add performance marks for monitoring
if (window.performance && window.performance.mark) {
  window.performance.mark('app-loaded');
}
