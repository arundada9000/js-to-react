const projectIdeas = [
  {
    title: "1. Random Quote Generator",
    difficulty: "easy",
    description:
      "Displays a random inspirational quote on click with a smooth background color transition. Teaches DOM manipulation, Arrays, and Math.random().",
    html: `<!-- HTML structure (index.html) -->
<div class="quote-card">
  <div class="quote-box">
    <i class="fa-solid fa-quote-left quote-icon"></i>
    <p id="quote-text">"First, solve the problem. Then, write the code."</p>
    <p id="quote-author">— John Johnson</p>
  </div>
  <button id="quote-btn">
    <i class="fa-solid fa-rotate"></i> New Quote
  </button>
</div>`,
    css: `/* CSS styling (style.css) */
body {
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f3;
  margin: 0;
  transition: background 0.8s ease;
}

.quote-card {
  background: #ffffff;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  max-width: 500px;
  width: 90%;
  text-align: center;
}

.quote-box {
  margin-bottom: 30px;
}

.quote-icon {
  font-size: 2.5rem;
  color: #5856d6;
  opacity: 0.15;
  margin-bottom: 15px;
}

#quote-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1.6;
  margin: 0 0 10px 0;
}

#quote-author {
  font-size: 0.95rem;
  color: #6e6e73;
  font-style: italic;
  margin: 0;
}

#quote-btn {
  background: #5856d6;
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

#quote-btn:hover {
  background: #4a48c4;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(88, 86, 214, 0.2);
}

#quote-btn:active {
  transform: translateY(0);
}`,
    js: `// JavaScript logic (app.js)
const quotes = [
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Clean code always looks like it was written by someone who cares.", author: "Michael Feathers" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" }
];

const colors = ["#eeedfc", "#eafbef", "#fff8ed", "#fff0f2", "#e8f0fe"];

const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const quoteBtn = document.getElementById("quote-btn");

quoteBtn.addEventListener("click", () => {
  // Get random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = \`"\${randomQuote.text}"\`;
  quoteAuthor.textContent = \`— \${randomQuote.author}\`;

  // Get random soft background color
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.background = randomColor;
});`,
  },
  {
    title: "2. Color Palette Generator",
    difficulty: "easy",
    description:
      "Generates a cohesive 5-color hex palette dynamically on click. Click any color box to copy its hex code to clipboard. Teaches strings, loops, and styles.",
    html: `<!-- HTML structure (index.html) -->
<div class="palette-card">
  <h2>Palette Generator</h2>
  <p>Click any color box to copy the hex code!</p>
  <div id="palette-container"></div>
  <button id="gen-btn">
    <i class="fa-solid fa-wand-magic-sparkles"></i> Generate Palette
  </button>
</div>`,
    css: `/* CSS styling (style.css) */
body {
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f7;
  margin: 0;
}

.palette-card {
  background: #ffffff;
  padding: 32px;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  max-width: 600px;
  width: 90%;
  text-align: center;
}

h2 {
  margin: 0 0 8px 0;
  color: #1d1d1f;
}

p {
  color: #6e6e73;
  font-size: 0.9rem;
  margin: 0 0 24px 0;
}

#palette-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}

.color-box {
  background: #eee;
  height: 120px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05);
}

.color-box:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.hex-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.85);
  padding: 4px 0;
  border-radius: 6px;
  color: #1d1d1f;
}

#gen-btn {
  background: #1d1d1f;
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

#gen-btn:hover {
  background: #333335;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}`,
    js: `// JavaScript logic (app.js)
const container = document.getElementById("palette-container");
const genBtn = document.getElementById("gen-btn");

function getRandomHex() {
  const chars = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generatePalette() {
  container.innerHTML = ""; // Clear palette
  
  for (let i = 0; i < 5; i++) {
    const hex = getRandomHex();
    const box = document.createElement("div");
    box.className = "color-box";
    box.style.backgroundColor = hex;
    
    const label = document.createElement("span");
    label.className = "hex-label";
    label.textContent = hex;
    
    box.appendChild(label);
    
    // Copy code event listener
    box.addEventListener("click", () => {
      navigator.clipboard.writeText(hex).then(() => {
        const originalText = label.textContent;
        label.textContent = "Copied! ✓";
        box.style.transform = "scale(0.95)";
        setTimeout(() => {
          label.textContent = originalText;
          box.style.transform = "";
        }, 1000);
      });
    });
    
    container.appendChild(box);
  }
}

genBtn.addEventListener("click", generatePalette);

// Run initial generation on load
generatePalette();`,
  },
  {
    title: "3. Simple Expense Tracker",
    difficulty: "medium",
    description:
      "Tracks items and costs, showing an updating list and sum total. Persists data locally in localStorage. Teaches State (Arrays/Objects), rendering patterns, and storage.",
    html: `<!-- HTML structure (index.html) -->
<div class="expense-card">
  <h2>Expense Tracker</h2>
  
  <div class="input-form">
    <input id="item-name" type="text" placeholder="Item name (e.g. Momo)">
    <input id="item-cost" type="number" placeholder="Cost (Rs.)">
    <button id="add-btn">Add Item</button>
  </div>

  <ul id="expense-list"></ul>
  
  <div class="summary">
    Total Spending: <span class="total">Rs. <strong id="total-cost">0</strong></span>
  </div>
</div>`,
    css: `/* CSS styling (style.css) */
body {
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f3;
  margin: 0;
}

.expense-card {
  background: #ffffff;
  padding: 32px;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  max-width: 480px;
  width: 90%;
}

h2 {
  margin: 0 0 24px 0;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.input-form {
  display: grid;
  grid-template-columns: 2fr 1fr auto;
  gap: 8px;
  margin-bottom: 20px;
}

input {
  padding: 12px;
  border: 1px solid #e5e5ea;
  border-radius: 8px;
  outline: none;
  font-size: 0.9rem;
}

input:focus {
  border-color: #5856d6;
}

#add-btn {
  background: #5856d6;
  color: white;
  border: none;
  padding: 0 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

#expense-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  max-height: 200px;
  overflow-y: auto;
}

#expense-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #f0f0f3;
  font-size: 0.95rem;
}

.delete-btn {
  background: none;
  border: none;
  color: #ff3b30;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.delete-btn:hover {
  background: #ffebe6;
}

.summary {
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 2px solid #f0f0f3;
  font-weight: 600;
  font-size: 1.1rem;
}

.total {
  color: #5856d6;
}`,
    js: `// JavaScript logic (app.js)
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const nameInput = document.getElementById("item-name");
const costInput = document.getElementById("item-cost");
const addBtn = document.getElementById("add-btn");
const expenseList = document.getElementById("expense-list");
const totalCostEl = document.getElementById("total-cost");

function saveAndRender() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  render();
}

function render() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    
    li.innerHTML = \`
      <span>\${expense.name}</span>
      <span>Rs. \${expense.cost} 
        <button class="delete-btn" onclick="deleteExpense(\${index})">✕</button>
      </span>
    \`;
    
    expenseList.appendChild(li);
    total += expense.cost;
  });

  totalCostEl.textContent = total;
}

window.deleteExpense = (index) => {
  expenses.splice(index, 1);
  saveAndRender();
};

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const cost = Number(costInput.value);

  if (!name || cost <= 0) {
    alert("Please fill in valid name and cost!");
    return;
  }

  expenses.push({ name, cost });
  saveAndRender();

  nameInput.value = "";
  costInput.value = "";
});

// Render initial items
render();`,
  },
  {
    title: "4. Live Markdown Previewer",
    difficulty: "medium",
    description:
      "A split-screen text editor that renders markdown formatting instantly. Teaches layout engines, keyboard input listening, and string replacements.",
    html: `<!-- HTML structure (index.html) -->
<div class="editor-container">
  <h2>Live Markdown Previewer</h2>
  <div class="split-pane">
    <div class="pane">
      <div class="pane-header">Markdown Editor</div>
      <textarea id="md-input" placeholder="Type Markdown here...
# H1 Header
## H2 Header
Use **bold text** or _italics_!"></textarea>
    </div>
    
    <div class="pane">
      <div class="pane-header">HTML Preview</div>
      <div id="md-preview" class="preview-body"></div>
    </div>
  </div>
</div>`,
    css: `/* CSS styling (style.css) */
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  background: #f5f5f7;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editor-container {
  width: 90%;
  max-width: 1000px;
  height: 85vh;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  padding: 24px;
}

h2 {
  margin: 0 0 16px 0;
}

.split-pane {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  flex: 1;
  min-height: 0; /* Important for flex child overflow */
}

.pane {
  border: 1px solid #e5e5ea;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.pane-header {
  background: #fafafa;
  padding: 10px 16px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #6e6e73;
  border-bottom: 1px solid #e5e5ea;
}

textarea {
  flex: 1;
  border: none;
  padding: 16px;
  outline: none;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  resize: none;
  background: #fafafa;
}

.preview-body {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background: white;
}

/* Styles inside rendering area */
.preview-body h1 { margin-top: 0; border-bottom: 1px solid #e5e5ea; padding-bottom: 6px; }
.preview-body h2 { border-bottom: 1px solid #f0f0f3; padding-bottom: 4px; }
.preview-body strong { color: #5856d6; }`,
    js: `// JavaScript logic (app.js)
const input = document.getElementById("md-input");
const preview = document.getElementById("md-preview");

function parseMarkdown(text) {
  let html = text;

  // Escaping simple HTML entities to prevent raw code injection
  html = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Regex replacement patterns
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/\\*\\*(.*?)\\*\\*/gim, '<strong>$1</strong>');
  html = html.replace(/_(.*?)_/gim, '<em>$1</em>');
  html = html.replace(/\\\`([^\\\`]+)\\\`/g, '<code>$1</code>');
  html = html.replace(/\\n/gim, '<br>');

  return html.trim();
}

input.addEventListener("input", (e) => {
  preview.innerHTML = parseMarkdown(e.target.value);
});

// Load default text on start
preview.innerHTML = parseMarkdown(input.value);`,
  },
  {
    title: "5. Weather Dashboard (Fetch API)",
    difficulty: "hard",
    description:
      "Fetches current temperature and weather conditions of any city in real-time. Teaches API consumption, Async/Await operations, and error boundary handling.",
    html: `<!-- HTML structure (index.html) -->
<div class="weather-card">
  <h2>Weather Search</h2>
  <div class="search-box">
    <input id="city-input" type="text" placeholder="Enter city (e.g. Pokhara)">
    <button id="search-btn">Search</button>
  </div>
  
  <div id="weather-info" class="info-box">
    <p class="placeholder">Enter a city to check the weather.</p>
  </div>
</div>`,
    css: `/* CSS styling (style.css) */
body {
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0f2fe, #f0fdf4);
  margin: 0;
}

.weather-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 32px;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  max-width: 400px;
  width: 90%;
}

h2 {
  margin: 0 0 20px 0;
  text-align: center;
}

.search-box {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

input {
  flex: 1;
  padding: 12px;
  border: 1px solid #e5e5ea;
  border-radius: 8px;
  outline: none;
}

button {
  background: #5856d6;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.info-box {
  text-align: center;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.city-name {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 6px 0;
}

.temp {
  font-size: 2.8rem;
  font-weight: 800;
  color: #5856d6;
  margin: 10px 0;
}

.wind {
  font-size: 0.9rem;
  color: #6e6e73;
  margin: 0;
}

.placeholder {
  color: #6e6e73;
  font-style: italic;
}

.error {
  color: #ff3b30;
  font-weight: 500;
}`,
    js: `// JavaScript logic (app.js)
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const infoBox = document.getElementById("weather-info");

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) return;

  infoBox.innerHTML = '<span class="placeholder">Searching weather...</span>';

  try {
    // 1. Fetch Coordinates from Open-Meteo Geocoding
    const geoResponse = await fetch(\`https://geocoding-api.open-meteo.com/v1/search?name=\${city}&count=1\`);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found. Try another city name.");
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2. Fetch Actual Weather Forecast using Coordinates
    const weatherResponse = await fetch(\`https://api.open-meteo.com/v1/forecast?latitude=\${latitude}&longitude=\${longitude}&current_weather=true\`);
    const weatherData = await weatherResponse.json();

    const { temperature, windspeed } = weatherData.current_weather;

    // Render results
    infoBox.innerHTML = \`
      <h3 class="city-name">\${name}, \${country}</h3>
      <div class="temp">\${temperature}°C</div>
      <p class="wind">💨 Wind Speed: \${windspeed} km/h</p>
    \`;

  } catch (error) {
    infoBox.innerHTML = \`<p class="error">\${error.message}</p>\`;
  }
});`,
  },
  {
    title: "6. Typo Ninja (Speed Typing Game)",
    difficulty: "hard",
    description:
      "Type words falling down the screen to slice them before they hit the boundary. Teaches advanced state, animation frames (requestAnimationFrame), and key listeners.",
    html: `<!-- HTML structure (index.html) -->
<div class="game-container">
  <div class="hud">
    <span>Score: <strong id="score">0</strong></span>
    <span>Lives: <strong id="lives">3</strong></span>
  </div>

  <div id="game-board">
    <div id="overlay">
      <h2 id="msg">TYPO NINJA</h2>
      <button id="start-btn">Play Game</button>
    </div>
  </div>

  <input id="type-input" type="text" placeholder="Type here..." disabled>
</div>`,
    css: `/* CSS styling (style.css) */
body {
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #121214;
  color: white;
  margin: 0;
}

.game-container {
  width: 90%;
  max-width: 500px;
  background: #1e1e24;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.hud {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 16px;
}

#game-board {
  height: 380px;
  border: 2px solid #2d2d34;
  border-radius: 12px;
  background: #0f0f12;
  position: relative;
  overflow: hidden;
  margin-bottom: 16px;
}

#overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

#overlay h2 {
  font-size: 2rem;
  color: #ff6b81;
  margin: 0 0 16px 0;
}

#start-btn {
  background: #30d158;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  font-size: 1rem;
}

#type-input {
  width: 100%;
  padding: 14px;
  background: #0f0f12;
  border: 2px solid #2d2d34;
  border-radius: 10px;
  color: white;
  outline: none;
  font-size: 1.1rem;
  text-align: center;
}

#type-input:focus {
  border-color: #5856d6;
}

.falling-word {
  position: absolute;
  background: #5856d6;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  white-space: nowrap;
}`,
    js: `// JavaScript logic (app.js)
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
});`,
  },
];

function initProjects() {
  const section = document.getElementById("projects-section");
  if (!section) {
    console.error("[Projects] #projects-section not found in the DOM!");
    return;
  }

  if (section.hasAttribute("data-initialized")) return;
  section.setAttribute("data-initialized", "true");
  console.log("[Projects] Initializing projects section...");

  let html = `<div class="info-header" style="margin-bottom: 30px;">
    <i class="fa-solid fa-hammer" style="font-size: 2rem; color: #ff6b81;"></i>
    <h2 style="font-size: 1.8rem; font-weight: 800;">Build These Next (Project Ideas)</h2>
  </div>
  <p style="color: var(--c-text-secondary); margin-bottom: 40px; font-size: 1.05rem;">
    The best way to master JavaScript before React is to build tools from scratch. Here are unique projects arranged in increasing difficulty, complete with explanations and full, copy-pasteable HTML, CSS, and JS code!
  </p>
  <div class="projects-grid">`;

  projectIdeas.forEach((p, idx) => {
    html += `
      <div class="project-card">
        <div class="project-card-header">
          <span class="project-difficulty diff-${p.difficulty}">${p.difficulty.toUpperCase()}</span>
          <h3 style="font-size: 1.3rem; margin-bottom: 8px;">${p.title}</h3>
          <p style="color: var(--c-text-secondary); font-size: 0.95rem; margin-bottom: 16px; line-height: 1.5;">${p.description}</p>
        </div>
        
        <div class="tab-container" id="project-${idx}">
          <div class="tab-bar">
            <button class="tab-btn active" data-tab="html">HTML</button>
            <button class="tab-btn" data-tab="css">CSS</button>
            <button class="tab-btn" data-tab="js">JavaScript</button>
            <button class="copy-btn" title="Copy code"><i class="fa-regular fa-copy"></i> Copy</button>
          </div>
          <div class="tab-contents">
            <div class="tab-content active" data-content="html">
              <pre><code class="language-markup">${escapeHtml(p.html)}</code></pre>
            </div>
            <div class="tab-content" data-content="css">
              <pre><code class="language-css">${escapeHtml(p.css)}</code></pre>
            </div>
            <div class="tab-content" data-content="js">
              <pre><code class="language-javascript">${escapeHtml(p.js)}</code></pre>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  section.innerHTML = html;

  // Add click handlers for tabs
  document.querySelectorAll(".tab-container").forEach((container) => {
    const tabs = container.querySelectorAll(".tab-btn");
    const contents = container.querySelectorAll(".tab-content");
    const copyBtn = container.querySelector(".copy-btn");
    const pIdx = container.id.split("-")[1];
    const project = projectIdeas && projectIdeas[pIdx];
    if (!project) return;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabName = tab.getAttribute("data-tab");

        tabs.forEach((t) => t.classList.remove("active"));
        contents.forEach((c) => c.classList.remove("active"));

        tab.classList.add("active");
        container
          .querySelector(`[data-content="${tabName}"]`)
          .classList.add("active");
      });
    });

    // Copy to clipboard
    copyBtn.addEventListener("click", () => {
      const activeTab = container
        .querySelector(".tab-btn.active")
        .getAttribute("data-tab");
      const codeText = project[activeTab];

      navigator.clipboard.writeText(codeText).then(() => {
        const originalContent = copyBtn.innerHTML;
        copyBtn.innerHTML =
          '<i class="fa-solid fa-check" style="color: #30d158;"></i> Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = originalContent;
        }, 1500);
      });
    });
  });

  // Re-highlight codes via Prism
  if (window.Prism) {
    Prism.highlightAllUnder(section);
  }

  console.log("[Projects] Initialization complete!");
}

// Ensure the function runs
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProjects);
  window.addEventListener("load", initProjects); // fallback
} else {
  initProjects();
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
