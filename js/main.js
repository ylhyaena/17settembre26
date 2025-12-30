// js/main.js (COMPLETO)

// =======================
// SCROLL PROGRESS BAR
// =======================
(function initScrollProgress() {
  const scrollBar = document.createElement('div');
  scrollBar.id = 'scrollProgress';
  document.body.appendChild(scrollBar);

  const onScroll = () => {
    const scrollTop = window.scrollY;
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
})();


// =======================
// FAQ ACCORDION
// =======================
(function initFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;

      document.querySelectorAll('.faq-question.open').forEach(openBtn => {
        if (openBtn !== button) {
          openBtn.classList.remove('open');
          openBtn.nextElementSibling.classList.remove('open');
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

  document.querySelectorAll('.section, .timeline li, img').forEach(el => {
    observer.observe(el);
  });
})();


// =======================
// HERO PARALLAX (contenuto, non la sezione intera)
// =======================
(function initHeroParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const heroContent = hero.querySelector('.container');
  if (!heroContent) return;

  window.addEventListener('scroll', () => {
    heroContent.style.transform = `translateY(${window.scrollY * 0.05}px)`;
  }, { passive: true });
})();


// =======================
// SOLE PARALLAX (basso-destra -> alto-destra, più lento dello scroll)
// =======================
(function initSunParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const reduceMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) return;

  const SUN_SPEED = 0.12; // più basso = più lento

  let ticking = false;

  const update = () => {
    const y = -(window.scrollY * SUN_SPEED);
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


// =======================
// LOG
// =======================
console.log('Sito matrimonio – JS dinamico caricato ✓');
  
