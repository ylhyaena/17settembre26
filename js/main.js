const canvas = document.getElementById("canvas-bg");
const ctx = canvas.getContext("2d");

// Imposta il canvas per coprire l'intera finestra
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawBackground(); // Ridisegna lo sfondo ogni volta che il canvas cambia dimensione
}

// Funzione per creare un sfondo con un gradiente semplice
function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#7f9f8c"); // Verde salvia
  gradient.addColorStop(1, "#cf845e"); // Terracotta

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Riempi lo sfondo con il gradiente
}

// Imposta il canvas e disegna lo sfondo iniziale
resizeCanvas();

// Rileva il ridimensionamento della finestra per adattarsi al dispositivo
window.addEventListener("resize", resizeCanvas);

// Ridisegna il canvas ogni volta che la finestra viene ridimensionata
function animate() {
  drawBackground();
  requestAnimationFrame(animate); // Mantieni l'animazione in loop
}

animate(); // Inizializza l'animazione
