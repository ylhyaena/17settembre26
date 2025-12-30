// =======================
// CONFIGURAZIONE
// =======================

// VELOCITÀ PARALLAX SOLE
// 0.03 = lentissimo
// 0.06 = lento (consigliato)
// 0.10 = evidente
const SUN_PARALLAX_SPEED = 0.03;


// =======================
// SCROLL PROGRESS BAR
// =======================
(function initScrollProgress() {
  const scrollBar = document.createElement('div');
  scrollBar.id = 'scrollProgress';
  document.body.appendChild(scrollBar);

  const onScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0
      ? (scrollTop / docHeight) * 100
      : 0;

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
    const inside =
      navList.contains(e.target) || navToggle.contains(e.target);
    if (!inside) navList.classList.remove('open');
  });
})();


// =======================
// FAQ ACCORDION
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

  const elements = document.querySelectorAll(
    '.section, .timeline li, img'
  );
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
})();


// =======================
// HERO PARALLAX (CONTENUTO)
// =======================
(function initHeroContentParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const container = hero.querySelector('.container');
  if (!container) return;

  window.addEventListener('scroll', () => {
    container.style.transform =
      `translateY(${window.scrollY * 0.05}px)`;
  }, { passive: true });
})();


// =======================
// SOLE PARALLAX (DESKTOP + MOBILE)
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
    // negativo = sale verso l’alto più lentamente dello scroll
    const offset = (window.scrollY * SUN_PARALLAX_SPEED);
    hero.style.setProperty('--sun-parallax', `${offset}px`);
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


// =======================
// LOG
// =======================
console.log('Sito matrimonio – JS caricato ✓');
