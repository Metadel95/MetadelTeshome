// ─── CURSOR ──────────────────────────────────────────────────
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

if (cursor) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    if (cursorRing) {
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
    }
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .service-item, .work-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
  });
}

// ─── SCROLL REVEAL ───────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(el => observer.observe(el));

// ─── NAV ACTIVE STATE ─────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ─── NAV SCROLL BEHAVIOR ─────────────────────────────────────
let lastScroll = 0;
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 100 && current > lastScroll) {
    nav.style.transform = 'translateY(-100%)';
    nav.style.transition = 'transform 0.4s ease';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastScroll = current;
});

// ─── HERO TEXT ANIMATION ─────────────────────────────────────
const heroLines = document.querySelectorAll('.hero-name span');
heroLines.forEach((line, i) => {
  line.style.opacity = '0';
  line.style.transform = 'translateY(60px)';
  line.style.transition = `opacity 1s ease ${0.2 + i * 0.15}s, transform 1s ease ${0.2 + i * 0.15}s`;
  requestAnimationFrame(() => {
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, 50);
  });
});

// ─── WORK: ACTIVE NAV ON SCROLL ──────────────────────────────
const workItems = document.querySelectorAll('.work-item[id]');
const workNavLinks = document.querySelectorAll('.work-nav-sticky a');
if (workItems.length > 0) {
  const workObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        workNavLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, { threshold: 0.3 });
  workItems.forEach(item => workObserver.observe(item));
}
