// =======================
// SCROLL PROGRESS BAR
// =======================
const scrollBar = document.createElement('div');
scrollBar.id = 'scrollProgress';
document.body.appendChild(scrollBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollBar.style.width = scrollPercent + '%';
}, { passive: true });


// =======================
// MENU MOBILE TOGGLE
// =======================
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
  });

  document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
    });
  });
}


// =======================
// FAQ ACCORDION
// =======================
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;

    document.querySelectorAll('.faq-question.open').forEach(openBtn => {
      if (openBtn !== button) {
        openBtn.classList.remove('open');
        if (openBtn.nextElementSibling) openBtn.nextElementSibling.classList.remove('open');
      }
    });

    button.classList.toggle('open');
    if (answer) answer.classList.toggle('open');
  });
});


// =======================
// SEZIONI & IMMAGINI FADE-IN
// =======================
if ('IntersectionObserver' in window) {
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
}


// =======================
// SOLE PARALLAX (DESKTOP + MOBILE)
// =======================
const hero = document.querySelector('.hero');

if (hero) {
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion) {
    let ticking = false;

    const update = () => {
      // valore negativo: sale più lentamente della pagina
      const y = -(window.scrollY * 0.18);
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
  }
}


// =======================
// HERO PARALLAX (contenuto hero) - lasciare com'è se lo vuoi
// =======================
if (hero) {
  window.addEventListener('scroll', () => {
    hero.style.transform = `translateY(${window.scrollY * 0.05}px)`;
  }, { passive: true });
}


// =======================
// LOG
// =======================
console.log('Sito matrimonio – JS dinamico caricato ✓');
