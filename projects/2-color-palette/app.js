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
generatePalette();
