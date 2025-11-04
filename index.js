const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");
const heartsCanvas = document.getElementById("heartsCanvas");
const hctx = heartsCanvas.getContext("2d");

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  heartsCanvas.width = window.innerWidth;
  heartsCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const confettiCount = window.innerWidth < 600 ? 80 : 150;
const confettis = [];

for (let i = 0; i < confettiCount; i++) {
  confettis.push({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height - confettiCanvas.height,
    r: Math.random() * 6 + 3,
    d: Math.random() * confettiCount,
    color: `hsl(${Math.random() * 360}, 90%, 45%)`,
    tilt: Math.random() * 10 - 10,
    shape: ["circle", "triangle", "square"][Math.floor(Math.random() * 3)],
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettis.forEach((confetti) => {
    ctx.save();
    ctx.translate(confetti.x, confetti.y);
    ctx.fillStyle = confetti.color;

    if (confetti.shape === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, confetti.r, 0, Math.PI * 2);
      ctx.fill();
    } else if (confetti.shape === "square") {
      ctx.rotate((Math.PI / 180) * confetti.tilt);
      ctx.fillRect(-confetti.r / 2, -confetti.r / 2, confetti.r, confetti.r);
    } else if (confetti.shape === "triangle") {
      ctx.beginPath();
      ctx.moveTo(0, -confetti.r);
      ctx.lineTo(confetti.r, confetti.r);
      ctx.lineTo(-confetti.r, confetti.r);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  });

  updateConfetti();
  requestAnimationFrame(drawConfetti);
}

function updateConfetti() {
  confettis.forEach((confetti) => {
    confetti.y += (Math.cos(confetti.d) + 1 + confetti.r / 2) * 0.6; 
    confetti.x += Math.sin(confetti.d) * 0.4; 

    confetti.tilt += 0.5;
    if (confetti.y > confettiCanvas.height) {
      confetti.y = 0 - confetti.r;
      confetti.x = Math.random() * confettiCanvas.width;
    }
  });
}

drawConfetti();

// ===== FLOATING HEARTS =====
const hearts = [];

function createHeart() {
  const heart = {
    x: Math.random() * heartsCanvas.width,
    y: heartsCanvas.height + 10,
    size: Math.random() * 12 + 8,
    speed: Math.random() * 1 + 0.5,
    opacity: Math.random() * 0.8 + 0.2,
  };
  hearts.push(heart);
}

function drawHearts() {
  hctx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
  hearts.forEach((heart, i) => {
    hctx.fillStyle = `hsla(330, 90%, 50%, ${heart.opacity})`;
    hctx.beginPath();
    const s = heart.size;
    hctx.moveTo(heart.x, heart.y);
    hctx.bezierCurveTo(
      heart.x - s / 2,
      heart.y - s / 2,
      heart.x - s,
      heart.y + s / 3,
      heart.x,
      heart.y + s
    );
    hctx.bezierCurveTo(
      heart.x + s,
      heart.y + s / 3,
      heart.x + s / 2,
      heart.y - s / 2,
      heart.x,
      heart.y
    );
    hctx.fill();
    heart.y -= heart.speed;
    if (heart.y + heart.size < 0) hearts.splice(i, 1);
  });
  requestAnimationFrame(drawHearts);
}

setInterval(createHeart, 300);
drawHearts();
