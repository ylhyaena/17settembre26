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

  // Chiudi menu cliccando fuori (utile su mobile)
  document.addEventListener('click', (e) => {
    if (!navList.classList.contains('open')) return;
    const isClickInsideNav = navList.contains(e.target) || navToggle.contains(e.target);
    if (!isClickInsideNav) navList.classList.remove('open');
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

      // chiudi gli altri
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
// HERO PARALLAX (SAFE)
// - Applica il transform al contenuto, non alla sezione intera
// - requestAnimationFrame per evitare jank
// - Disattiva su mobile/utente con reduced motion
// =======================
(function initHeroParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const heroContent = hero.querySelector('.container');
  if (!heroContent) return;

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;

  // Mobile-first: meglio evitare parallax su mobile (prestazioni + leggibilità)
  if (reduceMotion || isMobile) return;

  let ticking = false;

  const update = () => {
    const y = window.scrollY * 0.05;
    heroContent.style.transform = `translateY(${y}px)`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();


// =======================
// LOG
// =======================
console.log('Sito matrimonio – JS dinamico caricato ✓');
