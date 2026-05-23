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
  quoteText.textContent = `"${randomQuote.text}"`;
  quoteAuthor.textContent = `— ${randomQuote.author}`;

  // Get random soft background color
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.background = randomColor;
});
