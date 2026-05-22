/* ─────────────────────────────────────────────────────────────
   PORTFOLIO — main.js
   GSAP 3 + ScrollTrigger + Lenis
   Works on: index.html  |  work.html  |  about.html
───────────────────────────────────────────────────────────── */

window.addEventListener('DOMContentLoaded', () => {

  /* ── helpers ───────────────────────────────────────────── */
  const qs  = (s, ctx = document) => ctx.querySelector(s);
  const qsa = (s, ctx = document) => [...ctx.querySelectorAll(s)];
  const safe = fn => { try { fn(); } catch(e) { console.warn(e); } };

  /* ────────────────────────────────────────────────────────
     1. PRELOADER
     Bars slide UP to reveal the page, then init everything.
  ─────────────────────────────────────────────────────────*/
  const preloader = qs('.preloader');
  const pCounter  = qs('.pre-counter');
  const preBars   = qsa('.pre-bar');

  document.body.style.overflow = 'hidden'; // lock scroll during load

  function launchSite() {
    if (!preBars.length) {
      document.body.style.overflow = '';
      boot();
      return;
    }
    gsap.to(preBars, {
      yPercent: -100,
      duration: 0.85,
      ease: 'expo.inOut',
      stagger: { amount: 0.2, from: 'start' },
      onComplete() {
        if (preloader) preloader.style.display = 'none';
        document.body.style.overflow = '';
        boot();
      }
    });
  }

  if (preloader && preBars.length) {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 1.0,
      ease: 'power2.inOut',
      onUpdate() {
        if (pCounter) pCounter.textContent = Math.round(obj.val) + '%';
      },
      onComplete: launchSite
    });
  } else {
    document.body.style.overflow = '';
    boot();
  }

  /* ────────────────────────────────────────────────────────
     2. BOOT — runs after preloader exits
  ─────────────────────────────────────────────────────────*/
  function boot() {
    initLenis();
    initNav();
    initCursor();
    initHeroEntrance();   // only fires elements that actually exist
    initScrollAnims();
  }

  /* ────────────────────────────────────────────────────────
     3. LENIS
  ─────────────────────────────────────────────────────────*/
  function initLenis() {
    safe(() => {
      const lenis = new Lenis({
        duration: 1.3,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    });
  }

  /* ────────────────────────────────────────────────────────
     4. NAV — hide/show + active state
  ─────────────────────────────────────────────────────────*/
  function initNav() {
    safe(() => {
      const nav = qs('nav');
      if (!nav) return;

      const workNav = qs('.work-nav-sticky');

      if (workNav) {
        // On work page — fade + disable nav on scroll so section bar is always clickable
        ScrollTrigger.create({
          start: 80,
          onUpdate(self) {
            if (self.direction === 1) {
              // scrolling down — fade out and disable pointer events
              gsap.to(nav, { opacity: 0, duration: 0.3, ease: 'power2.out',
                onComplete: () => nav.style.pointerEvents = 'none' });
            } else {
              // scrolling up — fade back in and re-enable
              nav.style.pointerEvents = 'auto';
              gsap.to(nav, { opacity: 1, duration: 0.35, ease: 'power2.out' });
            }
          }
        });
      } else {
        // All other pages — slide hide/show
        ScrollTrigger.create({
          start: 120,
          onUpdate(self) {
            gsap.to(nav, {
              y: self.direction === 1 ? '-110%' : '0%',
              duration: 0.45,
              ease: 'power2.inOut'
            });
          }
        });
      }

      // mark active link
      const page = window.location.pathname.split('/').pop() || 'index.html';
      qsa('.nav-links a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === page || (page === '' && href === 'index.html'))
          a.classList.add('active');
      });
    });
  }

  /* ────────────────────────────────────────────────────────
     5. CURSOR
  ─────────────────────────────────────────────────────────*/
  function initCursor() {
    safe(() => {
      const cursor = qs('.cursor');
      const ring   = qs('.cursor-ring');
      if (!cursor || window.innerWidth <= 768) return;

      // Cursor is 60px native but starts visually at ~10px via scale(0.167)
      // GSAP controls position via x/y (not left/top) to avoid transform conflicts
      const BASE  = 0.167;  // ~10px visible out of 60px element
      const HOVER = 0.58;   // ~35px on links  — crisp, no pixelation
      const IMG   = 1.0;    // full 60px on images

      gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: BASE });
      gsap.set(ring,   { xPercent: -50, yPercent: -50 });

      let mx = innerWidth / 2, my = innerHeight / 2;
      let rx = mx, ry = my;

      window.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        gsap.to(cursor, { x: mx, y: my, duration: 0.07, ease: 'none' });
      });

      (function loop() {
        rx += (mx - rx) * 0.1;
        ry += (my - ry) * 0.1;
        gsap.set(ring, { x: rx, y: ry });
        requestAnimationFrame(loop);
      })();

      qsa('a, button, .service-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(cursor, { scale: HOVER, duration: 0.35, ease: 'power2.out' });
          gsap.to(ring,   { scale: 1.4, opacity: 0.25, duration: 0.35 });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(cursor, { scale: BASE, duration: 0.35, ease: 'power2.out' });
          gsap.to(ring,   { scale: 1, opacity: 1, duration: 0.35 });
        });
      });

      qsa('.work-images img, .service-img').forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(cursor, { scale: IMG, duration: 0.4, ease: 'power2.out' });
          gsap.to(ring,   { scale: 0, opacity: 0, duration: 0.25 });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(cursor, { scale: BASE, duration: 0.4, ease: 'power2.out' });
          gsap.to(ring,   { scale: 1, opacity: 1, duration: 0.3 });
        });
      });
    });
  }

  /* ────────────────────────────────────────────────────────
     6. HERO ENTRANCE (index.html only)
  ─────────────────────────────────────────────────────────*/
  function initHeroEntrance() {
    safe(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // nav fade in (all pages)
      tl.fromTo('nav',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );

      // hero text lines — only if they exist (index.html)
      const lines = qsa('.hero-line-inner');
      if (lines.length) {
        tl.fromTo(lines,
          { yPercent: 105 },
          { yPercent: 0, duration: 1.1, stagger: 0.1 },
          '-=0.5'
        );
      }

      const eyebrow = qs('.hero-eyebrow');
      if (eyebrow) tl.fromTo(eyebrow, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.6');

      const tagline = qs('.hero-tagline');
      if (tagline) tl.fromTo(tagline, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.55');

      const badge = qs('.available-badge');
      if (badge) tl.fromTo(badge, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.5');

      const scrollHint = qs('.hero-scroll');
      if (scrollHint) tl.fromTo(scrollHint, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.3');

      // work/about hero h1 — simple fade up
      const workHeroH1 = qs('.work-hero h1');
      if (workHeroH1) tl.fromTo(workHeroH1, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.4');

      const aboutHeroH1 = qs('.about-hero h1');
      if (aboutHeroH1) tl.fromTo(aboutHeroH1, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.4');
    });
  }

  /* ────────────────────────────────────────────────────────
     7. ALL SCROLL ANIMATIONS
  ─────────────────────────────────────────────────────────*/
  function initScrollAnims() {

    // ── TEXT SPLIT UTILITIES ──────────────────────────────
    function splitChars(el) {
      const text = el.textContent;
      el.setAttribute('aria-label', text);
      el.innerHTML = [...text].map(ch =>
        `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;line-height:1.15">` +
        `<span class="sc" style="display:inline-block">${ch === ' ' ? '&nbsp;' : ch}</span></span>`
      ).join('');
      return qsa('.sc', el);
    }

    function splitWords(el) {
      // strip to plain text to avoid mangling tags
      const text = el.textContent.trim();
      el.setAttribute('aria-label', text);
      el.innerHTML = text.split(/\s+/).map(w =>
        `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.25em">` +
        `<span class="sw" style="display:inline-block">${w}</span></span>`
      ).join('');
      return qsa('.sw', el);
    }

    // ── [data-split="chars"] ──────────────────────────────
    safe(() => {
      qsa('[data-split="chars"]').forEach(el => {
        const chars = splitChars(el);
        gsap.fromTo(chars,
          { yPercent: 115 },
          {
            yPercent: 0, duration: 0.85, stagger: 0.03, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
          }
        );
      });
    });

    // ── [data-split="words"] ──────────────────────────────
    safe(() => {
      qsa('[data-split="words"]').forEach(el => {
        const words = splitWords(el);
        gsap.fromTo(words,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%' }
          }
        );
      });
    });

    // ── ABOUT BIG TEXT — SCRUB ────────────────────────────
    safe(() => {
      const el = qs('.about-big-text');
      if (!el) return;
      const words = splitWords(el);
      gsap.fromTo(words,
        { opacity: 0.1 },
        {
          opacity: 1, stagger: 0.06, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 30%', scrub: 1.2 }
        }
      );
    });

    // ── GENERIC .reveal FADE-UPS ──────────────────────────
    safe(() => {
      qsa('.reveal').forEach(el => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.95, ease: 'power3.out',
            delay: parseFloat(el.dataset.delay || 0),
            scrollTrigger: { trigger: el, start: 'top 88%' }
          }
        );
      });
    });

    // ── PARALLAX IMAGES ───────────────────────────────────
    safe(() => {
      qsa('.parallax-img').forEach(img => {
        gsap.fromTo(img,
          { yPercent: -12 },
          {
            yPercent: 12, ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.parallax-wrap') || img,
              start: 'top bottom', end: 'bottom top', scrub: 1.8
            }
          }
        );
      });
    });

    // ── FLOATING SHAPES ───────────────────────────────────
    safe(() => {
      qsa('.float-shape').forEach((shape, i) => {
        const speed = parseFloat(shape.dataset.speed || 0.5);
        const dir   = i % 2 === 0 ? -1 : 1;
        gsap.to(shape, {
          y: dir * 90 * speed, x: dir * 25 * speed, rotate: dir * 18 * speed, ease: 'none',
          scrollTrigger: {
            trigger: shape.parentElement,
            start: 'top bottom', end: 'bottom top', scrub: 2.5
          }
        });
      });
    });

    // ── SERVICES GRID STAGGER ─────────────────────────────
    safe(() => {
      const items = qsa('.service-item');
      if (!items.length) return;
      gsap.fromTo(items,
        { y: 70, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-grid', start: 'top 80%' }
        }
      );
    });

    // ── IMAGE HOVER SCALE ─────────────────────────────────
    safe(() => {
      qsa('.work-images img, .service-img').forEach(img => {
        img.addEventListener('mouseenter', () => gsap.to(img, { scale: 1.05, duration: 0.55, ease: 'power2.out' }));
        img.addEventListener('mouseleave', () => gsap.to(img, { scale: 1,    duration: 0.55, ease: 'power2.out' }));
      });
    });

    // ── WORK ITEMS SLIDE IN ───────────────────────────────
    safe(() => {
      qsa('.work-item').forEach(item => {
        const meta = qs('.work-item-meta', item);
        const imgs = qs('.work-images', item);
        const tl   = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 82%' } });
        if (meta) tl.fromTo(meta, { x: -35, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out' });
        if (imgs) tl.fromTo(imgs, { x:  35, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out' }, '-=0.65');
      });
    });

    // ── WORK STICKY NAV HIGHLIGHT ─────────────────────────
    safe(() => {
      const workLinks = qsa('.work-nav-sticky a');
      if (!workLinks.length) return;
      qsa('.work-item[id]').forEach(item => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top center', end: 'bottom center',
          onEnter:     () => highlightWork(item.id),
          onEnterBack: () => highlightWork(item.id),
        });
      });
      function highlightWork(id) {
        workLinks.forEach(a => {
          gsap.to(a, {
            color: a.getAttribute('href') === '#' + id ? 'var(--accent)' : 'var(--grey-light)',
            duration: 0.3
          });
        });
      }
    });

    // ── STAT COUNT-UP ─────────────────────────────────────
    safe(() => {
      qsa('.about-stat-num').forEach(el => {
        // grab only leading digits/decimals, preserve rest as suffix
        const raw    = el.textContent.trim();
        const match  = raw.match(/^([\d.]+)(.*)/);
        if (!match) return;
        const num    = parseFloat(match[1]);
        const suffix = match[2] || '';
        if (isNaN(num)) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: num, duration: 2, ease: 'power2.out',
          onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
          scrollTrigger: { trigger: el, start: 'top 85%' }
        });
      });
    });

    // ── SKILL TAGS STAGGER ────────────────────────────────
    safe(() => {
      const tags = qsa('.skill-tag');
      if (!tags.length) return;
      gsap.fromTo(tags,
        { y: 22, opacity: 0, scale: 0.92 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.04, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.skills-list', start: 'top 88%' }
        }
      );
    });

    // ── EXPERIENCE ROWS ───────────────────────────────────
    safe(() => {
      qsa('.exp-row').forEach(row => {
        gsap.fromTo(row,
          { x: -28, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top 90%' }
          }
        );
      });
    });

    // ── FOOTER NAME ───────────────────────────────────────
    safe(() => {
      const fn = qs('.footer-name');
      if (!fn) return;
      gsap.fromTo(fn,
        { yPercent: 20, opacity: 0 },
        {
          yPercent: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: fn, start: 'top 92%' }
        }
      );
    });

    // ── CTA EMAIL ─────────────────────────────────────────
    safe(() => {
      qsa('.cta-email').forEach(el => {
        gsap.fromTo(el,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.9, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
          }
        );
      });
    });

    // ── ABOUT HERO IMG PARALLAX ───────────────────────────
    safe(() => {
      const img = qs('.about-hero-img');
      if (!img) return;
      gsap.fromTo(img,
        { yPercent: -8 },
        {
          yPercent: 8, ease: 'none',
          scrollTrigger: {
            trigger: '.about-hero', start: 'top top', end: 'bottom top', scrub: 1.5
          }
        }
      );
    });

    // ── MARQUEE SPEED ON SCROLL ───────────────────────────
    safe(() => {
      const track = qs('.marquee-track');
      if (!track) return;
      ScrollTrigger.create({
        trigger: '.marquee-wrap',
        start: 'top bottom', end: 'bottom top',
        onUpdate(self) {
          const v   = Math.abs(self.getVelocity()) / 500;
          const dur = Math.max(5, 18 - v * 5);
          track.style.animationDuration = dur + 's';
        }
      });
    });

  } // end initScrollAnims

}); // end DOMContentLoaded
