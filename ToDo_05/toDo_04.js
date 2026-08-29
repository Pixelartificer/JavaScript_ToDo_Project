let playerOneSection = document.getElementById("playerOneSection");
let playerOneInput = document.getElementById("playerOneInput");
let playerOneBtn = document.getElementById("playerOneBtn");
let playerOneResult = document.getElementById("playerOneResult");

let playerTwoSection = document.getElementById("playerTwoSection");
let playerTwoInput = document.getElementById("playerTwoInput");
let playerTwoBtn = document.getElementById("playerTwoBtn");
let playerTwoResult = document.getElementById("playerTwoResult");

let playerTwoCounter = document.getElementById("playerTwoCounter");
let playerTwoCounterBar = document.getElementById("playerTwoCounterBar");

// Player Two - Have 5 chances
let chance = 5;

// ======================================
// PLAYER ONE
// ======================================

playerOneBtn.addEventListener("click", () =>{
  // Input empty
  if (playerOneInput.value.trim() === "") {
    playerOneResult.innerHTML = "Player One Input is empty";
  }

  // Number 
  else if (isNaN(playerOneInput.value)) {
    playerOneResult.innerHTML = "Please enter a valid number";
  } else {
    let playerOneNumber = Number(playerOneInput.value);

    // 1 to 10
    if (playerOneNumber < 1 || playerOneNumber > 10) {
      playerOneResult.innerHTML = "Please enter a number between 1 and 10";
    }

    // Everything Ok
    else {
      playerOneSection.style.display = "none";
      playerTwoSection.style.display = "block";

      // ======================================
      // RESET CHANCE
      // ======================================

      chance = 5;
      playerTwoCounter.innerHTML = chance;
      playerTwoCounterBar.style.width = "100%";

      // ======================================
      // CLEAR PLAYER TWO
      // ======================================
      playerTwoInput.value = "";
      playerTwoResult.innerHTML = "";

      // ======================================
      // ENABLE PLAYER TWO
      // ======================================

      playerTwoBtn.disabled = false;
      playerTwoInput.disabled = false;
      // Focus
      playerTwoInput.focus();
    }
  }
});

// ======================================
// PLAYER TWO
// ======================================

playerTwoBtn.addEventListener("click", () => {
  // ======================================
  // INPUT EMPTY
  // ======================================

  if (playerTwoInput.value.trim() === "") {
    playerTwoResult.innerHTML = "Player Two Input is empty";

    return;
  }

  // ======================================
  // NUMBER CHECK
  // ======================================

  if (isNaN(playerTwoInput.value)) {
    playerTwoResult.innerHTML = "Please enter a valid number";

    return;
  }

  let playerTwoNumber = Number(playerTwoInput.value);
  let playerOneNumber = Number(playerOneInput.value);

  // ======================================
  // RANGE CHECK
  // ======================================

  if (playerTwoNumber < 1 || playerTwoNumber > 10) {
    playerTwoResult.innerHTML = "Please enter a number between 1 and 10";

    return;
  }

  // ======================================
  // 🎉 WINNER
  // ======================================

  if (playerTwoNumber === playerOneNumber) {
    // Disable button
    playerTwoBtn.disabled = true;

    // Disable input
    playerTwoInput.disabled = true;

    // ======================================
    // WIN MESSAGE
    // ======================================

    playerTwoResult.innerHTML = `

            <div id="winnerBox">
                <div class="winnerTitle">
                    🎉 YOU WIN! 🎉
                </div>
                <button id="playAgainBtn">
                    PLAY AGAIN
                </button>
            </div>

        `;

    // ======================================
    // WINNER ANIMATION
    // ======================================

    playerTwoResult.classList.remove(
      "text-red-500",
      "animate-pulse",
      "animate-bounce",
    );

    playerTwoResult.classList.add("text-green-400", "text-2xl", "font-bold");

    // ======================================
    // START FIREWORKS
    // ======================================

    startFireworks();

    // ======================================
    // PLAY AGAIN BUTTON
    // ======================================

    let playAgainBtn = document.getElementById("playAgainBtn");
    playAgainBtn.addEventListener("click", function () {
      resetGame();
    });
    return;
  }

  // ======================================
  // ❌ WRONG ANSWER
  // ======================================

  chance--;

  // Counter update
  playerTwoCounter.innerHTML = chance;

  // Progress bar
  playerTwoCounterBar.style.width = (chance / 5) * 100 + "%";
  playerTwoResult.innerHTML = "❌ Wrong Answer! Try Again.";
  // Wrong answer animation
  playerTwoResult.classList.remove("animate-bounce");
  void playerTwoResult.offsetWidth;
  playerTwoResult.classList.add("animate-bounce");

  // ======================================
  // 😢 ৫টি সুযোগ শেষ
  // ======================================

  if (chance === 0) {
    playerTwoResult.innerHTML = `

            <div id="loserBox">
                <div>
                    😢 YOU ARE A LOSER!
                </div>
                <button id="playAgainBtn">
                    PLAY AGAIN
                </button>
            </div>

        `;

    // Animation remove
    playerTwoResult.classList.remove("animate-bounce");

    playerTwoResult.classList.add(
      "text-red-500",
      "text-2xl",
      "font-bold",
      "animate-pulse",
    );

    // ======================================
    // DISABLE PLAYER TWO
    // ======================================

    playerTwoBtn.disabled = true;

    playerTwoInput.disabled = true;

    // ======================================
    // LOSER EFFECT
    // ======================================

    let loserEffect = document.createElement("div");
    loserEffect.id = "loserEffect";
    loserEffect.innerHTML = "😭 💀 😭";
    loserEffect.style.position = "fixed";
    loserEffect.style.inset = "0";
    loserEffect.style.pointerEvents = "none";
    loserEffect.style.zIndex = "9999";
    loserEffect.style.display = "flex";
    loserEffect.style.alignItems = "center";
    loserEffect.style.justifyContent = "center";
    loserEffect.style.fontSize = "60px";
    document.body.appendChild(loserEffect);

    // ======================================
    // LOSER ANIMATION CSS
    // ======================================

    let loserStyle = document.createElement("style");

    loserStyle.innerHTML = `

            @keyframes loserAnimation {

                0% {
                    transform: scale(0);
                    opacity: 0;
                }

                50% {
                    transform: scale(1.5);
                    opacity: 1;
                }

                100% {
                    transform: scale(1);
                    opacity: 0;
                }

            }

        `;

    document.head.appendChild(loserStyle);

    loserEffect.style.animation = "loserAnimation 2s ease-in-out";
    setTimeout(() => {
      loserEffect.remove();
      loserStyle.remove();
    }, 2000);

    // ======================================
    // PLAY AGAIN BUTTON
    // ======================================

    let playAgainBtn = document.getElementById("playAgainBtn");

    playAgainBtn.addEventListener("click", function () {
      resetGame();
    });
  }
});

// =====================================================
// 🔄 RESET GAME
// =====================================================

function resetGame() {
  // ======================================
  // REMOVE FIREWORK CANVAS
  // ======================================

  let canvas = document.getElementById("fireworksCanvas");

  if (canvas) {
    canvas.remove();
  }

  // ======================================
  // REMOVE LOSER EFFECT
  // ======================================

  let loserEffect = document.getElementById("loserEffect");
  if (loserEffect) {
    loserEffect.remove();
  }

  // ======================================
  // RESET CHANCE
  // ======================================

  chance = 5;

  // ======================================
  // RESET PLAYER ONE
  // ======================================

  playerOneInput.value = "";
  playerOneResult.innerHTML = "";
  playerOneSection.style.display = "block";

  // ======================================
  // RESET PLAYER TWO
  // ======================================

  playerTwoSection.style.display = "none";
  playerTwoInput.value = "";
  playerTwoInput.disabled = false;
  playerTwoBtn.disabled = false;
  playerTwoResult.innerHTML = "";

  // ======================================
  // RESET COUNTER
  // ======================================

  playerTwoCounter.innerHTML = "5";
  playerTwoCounterBar.style.width = "100%";

  // ======================================
  // REMOVE ANIMATION CLASSES
  // ======================================

  playerTwoResult.classList.remove(
    "text-green-400",
    "text-red-500",
    "text-2xl",
    "font-bold",
    "animate-pulse",
    "animate-bounce",
  );

  // ======================================
  // FOCUS PLAYER ONE
  // ======================================

  playerOneInput.focus();
}

// =====================================================
// 🎆 MODERN FIREWORKS SYSTEM
// =====================================================

function startFireworks() {
  // ======================================
  // CANVAS
  // ======================================

  let canvas = document.createElement("canvas");
  canvas.id = "fireworksCanvas";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "10000";
  document.body.appendChild(canvas);
  let ctx = canvas.getContext("2d");

  // ======================================
  // CANVAS SIZE
  // ======================================

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // ======================================
  // ARRAYS
  // ======================================

  let fireworks = [];
  let particles = [];

  // ======================================
  // RANDOM COLOR
  // ======================================

  function randomColor() {
    let colors = [
      "#ff004c",
      "#00e5ff",
      "#ffe600",
      "#7cff00",
      "#ff6b00",
      "#a855f7",
      "#ffffff",
      "#00ff9d",
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }

  // ======================================
  // FIREWORK CLASS
  // ======================================

  class Firework {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height;
      this.targetY = Math.random() * (canvas.height * 0.65);
      this.speed = 8 + Math.random() * 5;
      this.color = randomColor();
      this.exploded = false;
      this.trail = [];
    }

    update() {
      // Trail
      this.trail.push({
        x: this.x,
        y: this.y,
      });

      if (this.trail.length > 8) {
        this.trail.shift();
      }

      // Rocket movement
      this.y -= this.speed;

      // Explode
      if (this.y <= this.targetY) {
        this.explode();
      }
    }

    draw() {
      // Rocket
      ctx.beginPath();

      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = this.color;
      ctx.fill();

      // Rocket trail
      for (let i = 0; i < this.trail.length; i++) {
        let point = this.trail[i];
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
        ctx.globalAlpha = i / this.trail.length;
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    explode() {
      this.exploded = true;

      let particleCount = 100 + Math.floor(Math.random() * 80);

      for (let i = 0; i < particleCount; i++) {
        let angle = Math.random() * Math.PI * 2;
        let speed = 2 + Math.random() * 7;
        particles.push(
          new Particle(
            this.x,
            this.y,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
            this.color,
          ),
        );
      }
    }
  }

  // ======================================
  // PARTICLE CLASS
  // ======================================

  class Particle {
    constructor(x, y, vx, vy, color) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.color = color;
      this.alpha = 1;
      this.gravity = 0.08;
      this.friction = 0.985;
      this.size = 1 + Math.random() * 2.5;
    }

    update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 0.012;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  // ======================================
  // CREATE FIREWORK
  // ======================================

  function createFirework() {
    fireworks.push(new Firework());
  }

  
  for (let i = 0; i < 5; i++) {
    setTimeout(createFirework, i * 250);
  }

  // ======================================
  // CONTINUOUS FIREWORKS
  // ======================================

  let fireworkInterval = setInterval(createFirework, 450);

  // ======================================
  // ANIMATION LOOP
  // ======================================

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.18)";

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ======================================
    // FIREWORK UPDATE
    // ======================================

    for (let i = fireworks.length - 1; i >= 0; i--) {
      let firework = fireworks[i];

      firework.update();

      firework.draw();

      if (firework.exploded) {
        fireworks.splice(i, 1);
      }
    }

    // ======================================
    // PARTICLE UPDATE
    // ======================================

    for (let i = particles.length - 1; i >= 0; i--) {
      let particle = particles[i];

      particle.update();

      particle.draw();

      if (particle.alpha <= 0) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();

  // ======================================
  // STOP FIREWORKS
  // ======================================

  setTimeout(() => {
    clearInterval(fireworkInterval);
  }, 8000);

  // ======================================
  // REMOVE CANVAS
  // ======================================

  setTimeout(() => {
    canvas.remove();

    window.removeEventListener("resize", resizeCanvas);
  }, 11000);
}
