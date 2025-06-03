const carSVG = `data:image/svg+xml;utf8,<svg width='40' height='24' viewBox='0 0 40 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='4' y='10' width='32' height='8' rx='2' fill='%230d6efd'/><rect x='10' y='6' width='20' height='6' rx='3' fill='%230b5ed7'/><circle cx='12' cy='20' r='3' fill='%23333'/><circle cx='28' cy='20' r='3' fill='%23333'/></svg>`;

function startCarRain(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const carImg = new Image();
  carImg.src = carSVG;

  const cars = [];
  const carCount = 18;
  for (let i = 0; i < carCount; i++) {
    const size = 28 + Math.random() * 18;
    cars.push({
      x: Math.random() * (W - size * 2) + size,
      y: Math.random() * H,
      speed: 1.2 + Math.random() * 1.8,
      size: size,
      bouncePhase: Math.random() * Math.PI * 2,
      bounceSpeed: 0.01 + Math.random() * 0.02,
      amplitude: 30 + Math.random() * 30,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let car of cars) {
      car.y += car.speed;
      car.bouncePhase += car.bounceSpeed;
      car.x += Math.sin(car.bouncePhase) * 1.2;
      car.rotation += car.rotationSpeed;

      // Bouncing effect (side-to-side)
      const bounceX = car.x + Math.sin(car.bouncePhase) * car.amplitude;

      if (car.y > H + car.size) {
        car.y = -car.size;
        car.x = Math.random() * (W - car.size * 2) + car.size;
        car.bouncePhase = Math.random() * Math.PI * 2;
        car.amplitude = 30 + Math.random() * 30;
        car.rotation = Math.random() * Math.PI * 2;
      }

      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.translate(bounceX, car.y);
      ctx.rotate(car.rotation);
      ctx.drawImage(carImg, -car.size, -car.size/2, car.size * 2, car.size);
      ctx.restore();
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(draw);
  }

  carImg.onload = draw;
}

startCarRain('carRain');