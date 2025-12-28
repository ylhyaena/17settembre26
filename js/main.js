document.addEventListener("DOMContentLoaded", () => {
    // --- CANVAS BACKGROUND ANIMATION ---
    const canvas = document.getElementById("canvas-bg");
    const ctx = canvas.getContext("2d");

    let particles = [];
    const particleCount = 20; // Numero di cerchi "fluttuanti"
    const colors = ["#7f9f8c", "#cf845e", "#e8e2d9", "#f8f3ec"]; // Colori del tuo tema

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 30 + 10; // Raggio tra 10 e 40
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speedX = (Math.random() - 0.5) * 0.5; // Velocità lenta
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.4 + 0.1; // Opacità bassa per effetto sfocato
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${parseInt(this.color.slice(1, 3), 16)}, ${parseInt(this.color.slice(3, 5), 16)}, ${parseInt(this.color.slice(5, 7), 16)}, ${this.opacity})`;
            ctx.fill();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Fai rimbalzare le particelle dai bordi
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.speedX *= -1;
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.speedY *= -1;
            }

            // Reset se escono troppo
            if (this.x < -this.radius || this.x > canvas.width + this.radius ||
                this.y < -this.radius || this.y > canvas.height + this.radius) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            }
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Cancella il frame precedente
        ctx.fillStyle = "#f8f3ec"; // Sfondo leggermente colorato per base
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    // Inizializza e avvia l'animazione
    resizeCanvas();
    initParticles();
    animateParticles();
    window.addEventListener("resize", () => {
        resizeCanvas();
        initParticles(); // Reinizializza le particelle al ridimensionamento
    });


    // --- SCROLL REVEAL EFFECT ---
    const sections = document.querySelectorAll(".section");

    const observerOptions = {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.1 // Appare quando il 10% della sezione è visibile
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Ferma l'osservazione dopo l'animazione
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- NAVBAR TOGGLE (MOBILE) ---
    const navToggle = document.querySelector(".nav-toggle");
    const navList = document.querySelector(".nav-list");

    navToggle.addEventListener("click", () => {
        navList.classList.toggle("active");
    });

    // Chiudi il menu mobile quando si clicca su un link
    navList.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navList.classList.remove("active");
        });
    });

    // --- FAQ ACCORDION ---
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            question.classList.toggle("active");
            answer.classList.toggle("open");

            if (answer.classList.contains("open")) {
                answer.style.maxHeight = answer.
