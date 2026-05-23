const projectIdeas = [
  {
    title: "1. Random Quote Generator",
    difficulty: "easy",
    description: "A simple tool that displays a random inspirational quote from an array when a button is clicked. It teaches DOM manipulation, arrays, and Math.random().",
    code: `// 1. Create the HTML
// <div id="quote-box">
//   <p id="quote-text">"Click the button for a quote!"</p>
//   <button id="quote-btn">New Quote</button>
// </div>

const quotes = [
  "Code is like humor. When you have to explain it, it's bad.",
  "First, solve the problem. Then, write the code.",
  "Make it work, make it right, make it fast.",
  "Clean code always looks like it was written by someone who cares."
];

const btn = document.getElementById("quote-btn");
const text = document.getElementById("quote-text");

btn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  text.textContent = \`"\${quotes[randomIndex]}"\`;
});`
  },
  {
    title: "2. Color Palette Generator",
    difficulty: "easy",
    description: "Generates a set of 5 random hex colors and displays them as colored boxes. Teaches loops, strings, and dynamic inline styles.",
    code: `// HTML needed:
// <button id="gen-btn">Generate Palette</button>
// <div id="palette-container" style="display:flex; gap:10px;"></div>

function getRandomHex() {
  const chars = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.getElementById("gen-btn").addEventListener("click", () => {
  const container = document.getElementById("palette-container");
  container.innerHTML = ""; // Clear old colors
  
  for (let i = 0; i < 5; i++) {
    const hex = getRandomHex();
    const box = document.createElement("div");
    box.style.width = "100px";
    box.style.height = "100px";
    box.style.backgroundColor = hex;
    box.textContent = hex;
    container.appendChild(box);
  }
});`
  },
  {
    title: "3. Simple Expense Tracker",
    difficulty: "medium",
    description: "A tool to track your spending. It takes an item name and amount, displays it in a list, and updates the total. Teaches state management (arrays of objects), forms, and reduce().",
    code: `// HTML needed:
// <input id="item-name" placeholder="Item (e.g. Momo)">
// <input id="item-cost" type="number" placeholder="Cost">
// <button id="add-btn">Add Expense</button>
// <ul id="expense-list"></ul>
// <h3>Total: Rs. <span id="total-cost">0</span></h3>

let expenses = [];

document.getElementById("add-btn").addEventListener("click", () => {
  const name = document.getElementById("item-name").value;
  const cost = Number(document.getElementById("item-cost").value);
  
  if (!name || cost <= 0) return alert("Enter valid info!");
  
  expenses.push({ name, cost });
  renderExpenses();
});

function renderExpenses() {
  const list = document.getElementById("expense-list");
  list.innerHTML = "";
  
  let total = 0;
  expenses.forEach(exp => {
    const li = document.createElement("li");
    li.textContent = \`\${exp.name}: Rs. \${exp.cost}\`;
    list.appendChild(li);
    total += exp.cost;
  });
  
  document.getElementById("total-cost").textContent = total;
}`
  },
  {
    title: "4. Live Markdown Previewer",
    difficulty: "medium",
    description: "A split-screen tool where you type Markdown (like **bold** or # Heading) in a textarea and it instantly converts to HTML. Teaches the 'input' event and basic string replacement.",
    code: `// HTML needed:
// <textarea id="md-input"></textarea>
// <div id="md-preview"></div>

document.getElementById("md-input").addEventListener("input", (e) => {
  let text = e.target.value;
  
  // Very basic regex replacements for Markdown
  text = text.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  text = text.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  text = text.replace(/\\*\\*(.*?)\\*\\*/gim, '<strong>$1</strong>');
  text = text.replace(/_(.*?)_/gim, '<em>$1</em>');
  text = text.replace(/\\n/gim, '<br>');
  
  document.getElementById("md-preview").innerHTML = text.trim();
});`
  },
  {
    title: "5. Weather Dashboard (Fetch API)",
    difficulty: "hard",
    description: "Fetches live weather data for a searched city using a public API (like Open-Meteo or OpenWeatherMap). Teaches async/await, fetch, JSON parsing, and handling errors.",
    code: `// HTML needed:
// <input id="city-input" placeholder="Enter city name">
// <button id="search-btn">Search</button>
// <div id="weather-info"></div>

document.getElementById("search-btn").addEventListener("click", async () => {
  const city = document.getElementById("city-input").value;
  const info = document.getElementById("weather-info");
  info.textContent = "Loading...";
  
  try {
    // Note: This uses a free geocoding + weather API pattern
    const geoRes = await fetch(\`https://geocoding-api.open-meteo.com/v1/search?name=\${city}&count=1\`);
    const geoData = await geoRes.json();
    
    if (!geoData.results) throw new Error("City not found");
    
    const { latitude, longitude, name } = geoData.results[0];
    
    const weatherRes = await fetch(\`https://api.open-meteo.com/v1/forecast?latitude=\${latitude}&longitude=\${longitude}&current_weather=true\`);
    const weatherData = await weatherRes.json();
    
    const temp = weatherData.current_weather.temperature;
    info.innerHTML = \`<h3>\${name}</h3><p>\${temp}°C</p>\`;
    
  } catch (error) {
    info.innerHTML = \`<p style="color:red">\${error.message}</p>\`;
  }
});`
  },
  {
    title: "6. Typo Ninja (Speed Typing Game)",
    difficulty: "hard",
    description: "A game where words fall from the top of the screen and you must type them correctly before they hit the bottom. Teaches requestAnimationFrame, complex state (multiple falling objects), and keyboard event handling.",
    code: `// Note: This is an advanced project. The logic involves a game loop.
// HTML: <div id="game-board" style="position:relative; height:400px; border:1px solid #ccc; overflow:hidden;"></div>
// <input id="type-input" placeholder="Type here">

const words = ["javascript", "react", "frontend", "subekshya", "developer", "promise"];
let activeWords = [];
const board = document.getElementById("game-board");

// Spawn a new word every 2 seconds
setInterval(() => {
  const wordText = words[Math.floor(Math.random() * words.length)];
  const el = document.createElement("div");
  el.textContent = wordText;
  el.style.position = "absolute";
  el.style.left = Math.random() * 80 + "%";
  el.style.top = "0px";
  board.appendChild(el);
  
  activeWords.push({ text: wordText, el, y: 0 });
}, 2000);

// Game Loop
function gameLoop() {
  activeWords.forEach((wordObj, index) => {
    wordObj.y += 1; // Move down 1px per frame
    wordObj.el.style.top = wordObj.y + "px";
    
    if (wordObj.y > 400) {
      wordObj.el.remove();
      activeWords.splice(index, 1);
      console.log("Missed a word!");
    }
  });
  requestAnimationFrame(gameLoop);
}
gameLoop();

// Check typing
document.getElementById("type-input").addEventListener("input", (e) => {
  const typed = e.target.value.trim();
  const matchIndex = activeWords.findIndex(w => w.text === typed);
  
  if (matchIndex > -1) {
    // Word destroyed!
    activeWords[matchIndex].el.remove();
    activeWords.splice(matchIndex, 1);
    e.target.value = ""; // Clear input
  }
});`
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('projects-section');
  if (!section) return;
  
  let html = `<div class="info-header" style="margin-bottom: 30px;">
    <i class="fa-solid fa-hammer" style="font-size: 2rem; color: #ff6b81;"></i>
    <h2 style="font-size: 1.8rem; font-weight: 800;">Build These Next (Project Ideas)</h2>
  </div>
  <p style="color: var(--c-text-secondary); margin-bottom: 40px; font-size: 1.05rem;">
    The best way to master JavaScript before React is to build tools from scratch. Here are unique projects arranged in increasing difficulty, complete with explanations and starter code!
  </p>`;
  
  projectIdeas.forEach(p => {
    html += `
      <div class="project-card">
        <span class="project-difficulty diff-${p.difficulty}">${p.difficulty.toUpperCase()}</span>
        <h3 style="font-size: 1.3rem; margin-bottom: 12px;">${p.title}</h3>
        <p style="color: var(--c-text-secondary); margin-bottom: 20px;">${p.description}</p>
        <div class="code-container">
          <pre><code class="language-javascript">${p.code}</code></pre>
        </div>
      </div>
    `;
  });
  
  section.innerHTML = html;
});
