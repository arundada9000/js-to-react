const words = ["javascript", "react", "frontend", "nepal", "momo", "async", "promise", "developer"];
let activeWords = [];
let score = 0;
let lives = 3;
let gameInterval;
let animationFrameId;
let isPlaying = false;

const board = document.getElementById("game-board");
const overlay = document.getElementById("overlay");
const msg = document.getElementById("msg");
const startBtn = document.getElementById("start-btn");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const input = document.getElementById("type-input");

function spawnWord() {
  if (!isPlaying) return;
  const wordText = words[Math.floor(Math.random() * words.length)];
  const el = document.createElement("div");
  el.className = "falling-word";
  el.textContent = wordText;
  el.style.left = Math.random() * (board.clientWidth - 80) + "px";
  el.style.top = "0px";
  board.appendChild(el);

  activeWords.push({ text: wordText, el, y: 0, speed: 1 + Math.random() * 1.5 });
}

function updateGame() {
  if (!isPlaying) return;
  
  for (let i = activeWords.length - 1; i >= 0; i--) {
    const word = activeWords[i];
    word.y += word.speed;
    word.el.style.top = word.y + "px";

    // Word reached bottom
    if (word.y > board.clientHeight - 30) {
      word.el.remove();
      activeWords.splice(i, 1);
      lives--;
      livesEl.textContent = lives;

      // Check Game Over
      if (lives <= 0) {
        gameOver();
        return;
      }
    }
  }

  animationFrameId = requestAnimationFrame(updateGame);
}

function gameOver() {
  isPlaying = false;
  clearInterval(gameInterval);
  cancelAnimationFrame(animationFrameId);

  // Clear elements
  activeWords.forEach(w => w.el.remove());
  activeWords = [];

  input.disabled = true;
  input.value = "";
  msg.textContent = "GAME OVER";
  msg.style.color = "#ff3b30";
  startBtn.textContent = "Play Again";
  overlay.style.display = "flex";
}

function startGame() {
  isPlaying = true;
  score = 0;
  lives = 3;
  scoreEl.textContent = "0";
  livesEl.textContent = "3";
  overlay.style.display = "none";
  input.disabled = false;
  input.focus();

  // Spawn word every 2 seconds
  gameInterval = setInterval(spawnWord, 1800);
  
  // Start loop
  updateGame();
}

startBtn.addEventListener("click", startGame);

input.addEventListener("input", (e) => {
  const typed = e.target.value.trim().toLowerCase();
  const matchIndex = activeWords.findIndex(w => w.text === typed);

  if (matchIndex > -1) {
    // Correct word typed
    activeWords[matchIndex].el.remove();
    activeWords.splice(matchIndex, 1);
    score += 10;
    scoreEl.textContent = score;
    e.target.value = "";
  }
});
