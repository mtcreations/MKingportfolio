/* ══════════════════════════════════════════
   Michelle King · Teaching Portfolio
   script.js — shared across all pages
══════════════════════════════════════════ */

// Mark active nav link based on current page
document.addEventListener('DOMContentLoaded', function () {
  const path = window.location.pathname;

  // Determine which nav item is active
  const navLinks = document.querySelectorAll('.nav-links a[data-page]');
  const portfolioBtn = document.querySelector('.portfolio-btn');

  const portfolioPages = [
    '/portfolio/', '/portfolio/index.html',
    '/portfolio/domain-1.html', '/portfolio/domain-2.html',
    '/portfolio/domain-3.html', '/portfolio/domain-4.html'
  ];

  navLinks.forEach(link => {
    const page = link.getAttribute('data-page');
    if (
      (page === 'home' && (path === '/' || path.endsWith('index.html') && !path.includes('/portfolio/'))) ||
      (page === 'about' && path.endsWith('about.html')) ||
      (page === 'contact' && path.endsWith('contact.html'))
    ) {
      link.classList.add('active');
    }
  });

  if (portfolioPages.some(p => path.endsWith(p) || path.includes('/portfolio/'))) {
    portfolioBtn?.classList.add('active');
  }

  // Smooth scroll for anchor links within a page
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    });
  });
});
