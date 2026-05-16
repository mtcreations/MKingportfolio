/* ══════════════════════════════════════════
   Michelle King · Teaching Portfolio
   script.js — shared across all pages
   Handles: nav active state, lightbox
══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  // ── NAV ACTIVE STATE ──────────────────────
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
    const page = link.getAttribute('data-page');
    if (
      (page === 'home' && (filename === 'index.html' || filename === '')) ||
      (page === 'about' && filename === 'about.html') ||
      (page === 'contact' && filename === 'contact.html')
    ) {
      link.classList.add('active');
    }
  });

  const portfolioFiles = [
    'portfolio.html',
    'portfolio-planning.html',
    'portfolio-classroom.html',
    'portfolio-instruction.html',
    'portfolio-professional.html'
  ];

  if (portfolioFiles.includes(filename)) {
    document.querySelector('.portfolio-btn')?.classList.add('active');
  }

  // ── SMOOTH SCROLL FOR ANCHOR LINKS ───────
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

  // ── LIGHTBOX ─────────────────────────────
  const overlay = document.getElementById('lightbox-overlay');
  if (!overlay) return;

  const lbImg = overlay.querySelector('.lb-image');
  const lbPlaceholder = overlay.querySelector('.lb-placeholder');
  const lbCounter = overlay.querySelector('.lightbox-counter');
  const lbClose = overlay.querySelector('.lightbox-close');
  const lbPrev = overlay.querySelector('.lb-prev');
  const lbNext = overlay.querySelector('.lb-next');

  let currentGallery = [];
  let currentIndex = 0;

  function openLightbox(thumbs, index) {
    currentGallery = thumbs;
    currentIndex = index;
    showSlide(currentIndex);
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showSlide(index) {
    const thumb = currentGallery[index];
    const img = thumb.querySelector('img');
    const isPlaceholder = thumb.classList.contains('placeholder');

    if (lbImg) lbImg.style.display = isPlaceholder ? 'none' : 'block';
    if (lbPlaceholder) lbPlaceholder.style.display = isPlaceholder ? 'block' : 'none';

    if (img && lbImg) {
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
    }

    if (lbCounter) {
      lbCounter.textContent = `${index + 1} / ${currentGallery.length}`;
    }
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + currentGallery.length) % currentGallery.length;
    showSlide(currentIndex);
  }

  // Wire up all gallery thumbs on page
  document.querySelectorAll('.gallery-grid').forEach(grid => {
    const thumbs = Array.from(grid.querySelectorAll('.gallery-thumb'));
    thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => openLightbox(thumbs, i));
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', () => navigate(-1));
  if (lbNext) lbNext.addEventListener('click', () => navigate(1));

  // Click outside image to close
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

});
