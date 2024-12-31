const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];
// Load sound effects
const fireworkSound = new Audio('fireworks-29629.mp3');
fireworkSound.volume = 1; // Adjust volume

fireworkSound.play();
class Firework {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = Math.random() * 3 + 2;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * 6 - 3;
    this.opacity = 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size -= 0.002;
    this.opacity -= 0.005;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

function createFirework(x, y) {
  const color = `${Math.random() * 255},${Math.random() * 255},${Math.random() * 255}`;
  for (let i = 0; i < 40; i++) { // Increased particles per firework
    fireworks.push(new Firework(x, y, color));
    
  }
  // Play sound when firework is created
  
}

function generateSpamFireworks() {
  for (let i = 0; i < 2; i++) { // Generate 5 random fireworks at a time
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    createFirework(x, y);
  }
}

function animate() {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();
    if (firework.size <= 0 || firework.opacity <= 0) {
      fireworks.splice(index, 1);
    }
  });
  requestAnimationFrame(animate);
  
}

// Automatically spam fireworks every 100 milliseconds
setInterval(generateSpamFireworks, 100);

animate();