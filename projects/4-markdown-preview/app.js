const input = document.getElementById("md-input");
const preview = document.getElementById("md-preview");

function parseMarkdown(text) {
  let html = text;

  // Escaping simple HTML entities to prevent raw code injection
  html = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Regex replacement patterns
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  html = html.replace(/_(.*?)_/gim, '<em>$1</em>');
  html = html.replace(/\`([^\`]+)\`/g, '<code>$1</code>');
  html = html.replace(/\n/gim, '<br>');

  return html.trim();
}

input.addEventListener("input", (e) => {
  preview.innerHTML = parseMarkdown(e.target.value);
});

// Load default text on start
preview.innerHTML = parseMarkdown(input.value);
