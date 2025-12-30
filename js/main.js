// =======================
// SCROLL PROGRESS BAR
// =======================
(function () {
  const bar = document.createElement('div');
  bar.id = 'scrollProgress';
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = (window.scrollY / h) * 100;
    bar.style.width = p + '%';
  });
})();

// =======================
// MOBILE MENU
// =======================
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const list = document.querySelector('.nav-list');
  if (!toggle || !list) return;

  toggle.addEventListener('click', () => {
    list.classList.toggle('open');
  });
})();

// =======================
// SOLE PARALLAX
// =======================
const SUN_SPEED = 0.04;

(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

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
