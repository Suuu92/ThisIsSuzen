// Mobile Navigation Toggle + Interactions
const hamburger = document.getElementById('hamburger');
const navbar = document.querySelector('.navbar');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
    hamburger?.classList.remove('active');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Active link highlighting
(() => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 220;
      if (scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
})();

// Simple intersection fade-up animation for project/timeline/skills
const fadeTargets = document.querySelectorAll('.project-card, .timeline-item, .skill-tag');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  io.observe(el);
});

// Contact form (front-end only demo)
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const original = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    setTimeout(() => {
      alert("Thanks! I'll get back to you soon.");
      contactForm.reset();
      submitBtn.textContent = original;
      submitBtn.disabled = false;
    }, 1200);
  });
}

// Scroll-to-top button
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.createElement('button');
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  btn.className = 'scroll-to-top';
  btn.style.cssText = `position:fixed;bottom:20px;right:20px;width:46px;height:46px;border-radius:9999px;border:none;
    background:#1d4ed8;color:#fff;box-shadow:0 12px 28px rgba(29,78,216,.3);cursor:pointer;
    opacity:0;visibility:hidden;transition:all .25s ease;z-index:1000;font-size:1rem;`;
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    if (window.scrollY > 280) { btn.style.opacity = '1'; btn.style.visibility = 'visible'; }
    else { btn.style.opacity = '0'; btn.style.visibility = 'hidden'; }
  });
  btn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
});
