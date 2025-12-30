// js/main.js (COMPLETO)

// =======================
// CONFIG
// =======================
// Più basso = più lento
const SUN_PARALLAX_SPEED = 0.06;


// =======================
// SCROLL PROGRESS BAR
// =======================
(function initScrollProgress() {
  const scrollBar = document.createElement('div');
  scrollBar.id = 'scrollProgress';
  document.body.appendChild(scrollBar);

  const onScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollBar.style.width = scrollPercent + '%';
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


// =======================
// MENU MOBILE TOGGLE
// =======================
(function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  if (!navToggle || !navList) return;

  navToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
  });

  document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!navList.classList.contains('open')) return;
    const inside = navList.contains(e.target) || navToggle.contains(e.target);
    if (!inside) navList.classList.remove('open');
  });
})();


// =======================
// FAQ ACCORDION (se presente)
// =======================
(function initFaqAccordion() {
  const questions = document.querySelectorAll('.faq-question');
  if (!questions.length) return;

  questions.forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      if (!answer) return;

      document.querySelectorAll('.faq-question.open').forEach(openBtn => {
        if (openBtn !== button) {
          openBtn.classList.remove('open');
          const openAnswer = openBtn.nextElementSibling;
          if (openAnswer) openAnswer.classList.remove('open');
        }
      });

      button.classList.toggle('open');
      answer.classList.toggle('open');
    });
  });
})();


// =======================
// SEZIONI & IMMAGINI FADE-IN
// =======================
(function initFadeIn() {
  if (!('IntersectionObserver' in window)) return;

  const els = document.querySelectorAll('.section, .timeline li, img');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  els.forEach(el => observer.observe(el));
})();


// =======================
// SOLE PARALLAX (sale verso alto-destra)
// =======================
(function initSunParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const reduceMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) return;

  let ticking = false;

  const update = () => {
    // negativo => sale verso l'alto mentre scrolli
    const y = -(window.scrollY * SUN_PARALLAX_SPEED);
    hero.style.setProperty('--sun-parallax', `${y}px`);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
})();

console.log('Sito matrimonio – JS dinamico caricato ✓');
