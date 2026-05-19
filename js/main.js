/* ─────────────────────────────────────────────────────────────
   PORTFOLIO ANIMATIONS
   Stack: Lenis smooth scroll + GSAP + ScrollTrigger
   Inspired by juanmora.co
───────────────────────────────────────────────────────────── */

window.addEventListener('DOMContentLoaded', () => {

// ─── 1. LENIS SMOOTH SCROLL ───────────────────────────────────
const lenis = new Lenis({
  duration: 1.4,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
});

function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// ─── 2. SPLIT TEXT HELPERS ────────────────────────────────────
function splitChars(el) {
  const text = el.textContent;
  el.innerHTML = '';
  el.setAttribute('aria-label', text);
  [...text].forEach(ch => {
    const wrap = document.createElement('span');
    wrap.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;';
    const inner = document.createElement('span');
    inner.className = 'split-char';
    inner.style.display = 'inline-block';
    inner.textContent = ch === ' ' ? '\u00A0' : ch;
    wrap.appendChild(inner);
    el.appendChild(wrap);
  });
  return el.querySelectorAll('.split-char');
}

function splitWords(el) {
  const text = el.innerHTML;
  // preserve <em> and <strong> tags
  const words = text.split(' ');
  el.innerHTML = words.map(w =>
    `<span class="word-wrap" style="display:inline-block;overflow:hidden;margin-right:0.28em;vertical-align:bottom">` +
    `<span class="split-word" style="display:inline-block">${w}</span></span>`
  ).join('');
  return el.querySelectorAll('.split-word');
}

// ─── 3. CUSTOM CURSOR ─────────────────────────────────────────
const cursor     = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

if (cursor && window.innerWidth > 768) {
  let mx = window.innerWidth/2, my = window.innerHeight/2;
  let rx = mx, ry = my;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    gsap.to(cursor, { left: mx, top: my, duration: 0.07, ease: 'none' });
  });

  (function loopRing() {
    rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
    gsap.set(cursorRing, { left: rx, top: ry });
    requestAnimationFrame(loopRing);
  })();

  document.querySelectorAll('a, button, .service-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor,     { scale: 3.5,  duration: 0.35, ease: 'power2.out' });
      gsap.to(cursorRing, { scale: 1.5, opacity: 0.3, duration: 0.35 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor,     { scale: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(cursorRing, { scale: 1, opacity: 1, duration: 0.3 });
    });
  });

  document.querySelectorAll('.work-images img, .service-img').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor,     { scale: 6, duration: 0.4, ease: 'power2.out' });
      gsap.to(cursorRing, { scale: 0, opacity: 0, duration: 0.25 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor,     { scale: 1, duration: 0.4, ease: 'power2.out' });
      gsap.to(cursorRing, { scale: 1, opacity: 1, duration: 0.3 });
    });
  });
}

// ─── 4. PRELOADER ─────────────────────────────────────────────
const preloader = document.querySelector('.preloader');
const mainTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

if (preloader) {
  const pCounter = preloader.querySelector('.pre-counter');
  let count = { val: 0 };
  gsap.to(count, {
    val: 100, duration: 1.2, ease: 'power1.inOut',
    onUpdate: () => { if (pCounter) pCounter.textContent = Math.round(count.val) + '%'; },
    onComplete: () => {
      mainTL
        .to('.pre-bar', { scaleY: 0, transformOrigin: 'top', duration: 0.8, ease: 'expo.inOut', stagger: 0.05 })
        .set(preloader, { display: 'none' })
        .fromTo('nav', { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.1')
        .add(heroEntrance(), '-=0.5');
    }
  });
} else {
  mainTL
    .fromTo('nav', { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 })
    .add(heroEntrance(), '-=0.5');
}

function heroEntrance() {
  const tl = gsap.timeline();
  const heroLines = document.querySelectorAll('.hero-name .hero-line-inner');
  if (heroLines.length) {
    tl.fromTo(heroLines,
      { yPercent: 110 },
      { yPercent: 0, duration: 1.1, stagger: 0.12, ease: 'expo.out' }
    );
  }
  tl.fromTo('.hero-eyebrow', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.6');
  tl.fromTo('.hero-tagline', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.55');
  tl.fromTo('.available-badge', { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.5');
  tl.fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.3');
  return tl;
}

// ─── 5. NAV HIDE / SHOW ──────────────────────────────────────
const mainNav = document.querySelector('nav');
ScrollTrigger.create({
  start: 100,
  onUpdate: self => {
    gsap.to(mainNav, {
      y: self.direction === 1 ? '-110%' : '0%',
      duration: 0.5,
      ease: 'power2.inOut'
    });
  }
});

// Nav active
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html'))
    link.classList.add('active');
});

// ─── 6. SCROLL TEXT REVEALS ───────────────────────────────────
document.querySelectorAll('[data-split="chars"]').forEach(el => {
  const chars = splitChars(el);
  gsap.fromTo(chars,
    { yPercent: 120 },
    {
      yPercent: 0,
      duration: 0.85,
      stagger: 0.028,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    }
  );
});

document.querySelectorAll('[data-split="words"]').forEach(el => {
  const words = splitWords(el);
  gsap.fromTo(words,
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0, opacity: 1,
      duration: 0.8,
      stagger: 0.07,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    }
  );
});

// ─── 7. ABOUT BIG TEXT — WORD OPACITY SCRUB ──────────────────
const aboutBigText = document.querySelector('.about-big-text');
if (aboutBigText) {
  const words = splitWords(aboutBigText);
  gsap.fromTo(words,
    { opacity: 0.1 },
    {
      opacity: 1,
      stagger: 0.06,
      ease: 'none',
      scrollTrigger: {
        trigger: aboutBigText,
        start: 'top 75%',
        end: 'bottom 35%',
        scrub: 1.2,
      }
    }
  );
}

// ─── 8. FADE-UP REVEALS ───────────────────────────────────────
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.fromTo(el,
    { y: 55, opacity: 0 },
    {
      y: 0, opacity: 1,
      duration: 1,
      ease: 'power3.out',
      delay: parseFloat(el.dataset.delay || 0),
      scrollTrigger: { trigger: el, start: 'top 88%' }
    }
  );
});

// ─── 9. PARALLAX IMAGES ──────────────────────────────────────
gsap.utils.toArray('.parallax-img').forEach(img => {
  gsap.fromTo(img,
    { yPercent: -14 },
    {
      yPercent: 14,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.8,
      }
    }
  );
});

// ─── 10. FLOATING SHAPES ─────────────────────────────────────
gsap.utils.toArray('.float-shape').forEach((shape, i) => {
  const speed = parseFloat(shape.dataset.speed || 0.5);
  const dir   = i % 2 === 0 ? -1 : 1;
  gsap.to(shape, {
    y: dir * 100 * speed,
    x: dir * 30 * speed,
    rotate: dir * 20 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: shape.closest('section') || shape.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2.5,
    }
  });
});

// ─── 11. SERVICES STAGGER ────────────────────────────────────
const serviceItems = gsap.utils.toArray('.service-item');
if (serviceItems.length) {
  gsap.fromTo(serviceItems,
    { y: 80, opacity: 0 },
    {
      y: 0, opacity: 1,
      duration: 0.9,
      stagger: 0.13,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.services-grid', start: 'top 80%' }
    }
  );
}

// ─── 12. IMAGE HOVER SCALE ───────────────────────────────────
document.querySelectorAll('.work-images img, .service-img').forEach(img => {
  img.addEventListener('mouseenter', () => gsap.to(img, { scale: 1.05, duration: 0.6, ease: 'power2.out' }));
  img.addEventListener('mouseleave', () => gsap.to(img, { scale: 1,    duration: 0.6, ease: 'power2.out' }));
});

// ─── 13. WORK ITEM ENTRY ─────────────────────────────────────
gsap.utils.toArray('.work-item').forEach(item => {
  const meta = item.querySelector('.work-item-meta');
  const imgs = item.querySelector('.work-images');
  const tl2  = gsap.timeline({
    scrollTrigger: { trigger: item, start: 'top 82%' }
  });
  if (meta) tl2.fromTo(meta, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' });
  if (imgs) tl2.fromTo(imgs, { x: 40,  opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.65');
});

// ─── 14. STAT COUNT UP ───────────────────────────────────────
document.querySelectorAll('.about-stat-num').forEach(el => {
  const raw    = el.textContent.trim();
  const num    = parseFloat(raw);
  const suffix = raw.replace(/[\d.]/g, '');
  if (!isNaN(num)) {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: num, duration: 2, ease: 'power2.out',
      onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  }
});

// ─── 15. WORK STICKY NAV HIGHLIGHT ───────────────────────────
document.querySelectorAll('.work-item[id]').forEach(item => {
  ScrollTrigger.create({
    trigger: item,
    start: 'top center',
    end: 'bottom center',
    onEnter:     () => setActiveWork(item.id),
    onEnterBack: () => setActiveWork(item.id),
  });
});
function setActiveWork(id) {
  document.querySelectorAll('.work-nav-sticky a').forEach(link => {
    gsap.to(link, {
      color: link.getAttribute('href') === '#' + id ? 'var(--accent)' : 'var(--grey-light)',
      duration: 0.3
    });
  });
}

// ─── 16. SKILLS TAG STAGGER ──────────────────────────────────
const tags = gsap.utils.toArray('.skill-tag');
if (tags.length) {
  gsap.fromTo(tags,
    { y: 25, opacity: 0, scale: 0.92 },
    {
      y: 0, opacity: 1, scale: 1,
      duration: 0.45,
      stagger: 0.04,
      ease: 'back.out(1.5)',
      scrollTrigger: { trigger: '.skills-list', start: 'top 88%' }
    }
  );
}

// ─── 17. EXPERIENCE ROWS ─────────────────────────────────────
gsap.utils.toArray('.exp-row').forEach((row, i) => {
  gsap.fromTo(row,
    { x: -30, opacity: 0 },
    {
      x: 0, opacity: 1,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: row, start: 'top 90%' }
    }
  );
});

// ─── 18. FOOTER NAME REVEAL ──────────────────────────────────
const footerName = document.querySelector('.footer-name');
if (footerName) {
  const chars = splitChars(footerName);
  gsap.fromTo(chars,
    { yPercent: 100 },
    {
      yPercent: 0,
      duration: 0.9,
      stagger: 0.03,
      ease: 'expo.out',
      scrollTrigger: { trigger: footerName, start: 'top 90%' }
    }
  );
}

// ─── 19. ABOUT HERO IMG PARALLAX ─────────────────────────────
const aHeroImg = document.querySelector('.about-hero-img');
if (aHeroImg) {
  gsap.fromTo(aHeroImg,
    { yPercent: -10 },
    {
      yPercent: 10, ease: 'none',
      scrollTrigger: {
        trigger: '.about-hero',
        start: 'top top', end: 'bottom top', scrub: 1.5,
      }
    }
  );
}

// ─── 20. MARQUEE VELOCITY BOOST ──────────────────────────────
const mTrack = document.querySelector('.marquee-track');
if (mTrack) {
  ScrollTrigger.create({
    trigger: '.marquee-wrap',
    start: 'top bottom', end: 'bottom top',
    onUpdate(self) {
      const v = Math.abs(self.getVelocity()) / 600;
      const spd = gsap.utils.clamp(20, 5, 20 - v * 4);
      mTrack.style.animationDuration = spd + 's';
    }
  });
}

// ─── 21. CTA EMAIL SCALE IN ──────────────────────────────────
gsap.utils.toArray('.cta-email').forEach(el => {
  gsap.fromTo(el,
    { scale: 0.82, opacity: 0 },
    {
      scale: 1, opacity: 1,
      duration: 1, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    }
  );
});

}); // end DOMContentLoaded
