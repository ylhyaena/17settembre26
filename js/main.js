// =======================
// SCROLL PROGRESS BAR
// =======================
(function initScrollProgress() {
  const scrollBar = document.createElement('div');
  scrollBar.id = 'scrollProgress';
  document.body.appendChild(scrollBar);

  const onScroll = () => {
    const scrollTop = window.scrollY || 0;
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
      button.classList.toggle('open');
      if (answer) answer.classList.toggle('open');
    });
  });
})();


// =======================
// SEZIONI & IMMAGINI FADE-IN
// =======================
(function initFadeIn() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.section, .timeline li, img')
    .forEach(el => observer.observe(el));
})();


// =======================
// SOLE PARALLAX (DESKTOP + MOBILE)
// =======================
(function initSunParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  let ticking = false;

  const update = () => {
    const y = window.scrollY * 0.25;
    hero.style.setProperty('--sun-offset', `${y}px`);
    hero.style.setProperty('--sun-transform', `translateY(${-y}px)`);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();
