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

navToggle.addEventListener('click', () => {
  navList.classList.toggle('open');
});

document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
  });
});


// =======================
// FAQ ACCORDION
// =======================
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
// HERO PARALLAX (CONTENUTO) - mantiene il tuo effetto
// =======================
const hero = document.querySelector('.hero');
if (hero) {
  const heroContent = hero.querySelector('.container');

  window.addEventListener('scroll', () => {
    if (!heroContent) return;
    heroContent.style.transform = `translateY(${window.scrollY * 0.05}px)`;
  }, { passive: true });
}


// =======================
// SOLE PARALLAX (SEPARATO) - sale più lentamente della pagina
// =======================
if (hero) {
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion) {
    let ticking = false;

    const update = () => {
      // negativo => sale, e più lentamente dello scroll
      const y = -(window.scrollY * 0.12);
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

console.log('Sito matrimonio – JS dinamico caricato ✓');
