document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas-bg");
    const ctx = canvas.getContext("2d");
    let particles = [];
    
    // MODIFICA QUI: Colori delle bolle e quantità
    const colors = ["#7f9f8c", "#cf845e", "#e8e2d9", "#ffffff"];
    const particleCount = 25;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.init();
        }
        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 40 + 10;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.2 + 0.05;
            this.speedX = (Math.random() - 0.5) * 0.4; // Lentezza
            this.speedY = (Math.random() - 0.5) * 0.4;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < -50 || this.x > canvas.width + 50) this.speedX *= -1;
            if (this.y < -50 || this.y > canvas.height + 50) this.speedY *= -1;
        }
    }

    function setup() {
        resize();
        particles = [];
        for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    }

    setup();
    loop();
    window.addEventListener("resize", setup);

    // FAQ Accordion
    document.querySelectorAll(".faq-question").forEach(q => {
        q.addEventListener("click", () => {
            const ans = q.nextElementSibling;
            ans.style.maxHeight = ans.style.maxHeight ? null : ans.scrollHeight + "px";
        });
    });
});
