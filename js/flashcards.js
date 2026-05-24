document.addEventListener("DOMContentLoaded", () => {
  const btnStudy = document.getElementById("btn-study-mode");
  const curriculumContainer = document.getElementById("curriculum-container");
  const flashcardContainer = document.getElementById("flashcard-container");
  const projectsSection = document.getElementById("projects-section");

  if (!btnStudy || !flashcardContainer || !curriculumContainer) return;

  let isStudyMode = false;
  let flashcards = [];
  let currentIndex = 0;

  // Extract all exercises from curriculum
  if (typeof curriculum !== "undefined") {
    curriculum.forEach((phase) => {
      phase.exercises.forEach((ex) => {
        flashcards.push({
          question: ex.question,
          solution: ex.solutionCode,
          phase: phase.title,
        });
      });
    });
  }

  btnStudy.addEventListener("click", () => {
    isStudyMode = !isStudyMode;

    if (isStudyMode) {
      curriculumContainer.style.display = "none";
      if (projectsSection) projectsSection.style.display = "none";
      flashcardContainer.style.display = "flex";
      btnStudy.innerHTML =
        '<i class="fa-solid fa-book-open"></i> Back to Curriculum';
      btnStudy.style.background = "linear-gradient(135deg, #ef4444, #b91c1c)";

      if (flashcardContainer.innerHTML === "") {
        renderFlashcardUI();
      }
    } else {
      curriculumContainer.style.display = "block";
      if (projectsSection) projectsSection.style.display = "block";
      flashcardContainer.style.display = "none";
      btnStudy.innerHTML = '<i class="fa-solid fa-layer-group"></i> Study Mode';
      btnStudy.style.background = "linear-gradient(135deg, #10b981, #059669)";
    }
  });

  function renderFlashcardUI() {
    if (flashcards.length === 0) return;

    const cardHtml = `
      <div style="margin-bottom: 20px; font-weight:bold; color:var(--c-text-secondary);">
        Card <span id="fc-current">1</span> of ${flashcards.length}
      </div>
      <div class="flashcard" id="fc-card">
        <div class="card-face card-front">
          <span style="position:absolute; top:15px; left:15px; font-size:0.7rem; color:var(--c-text-tertiary); text-transform:uppercase;">Question</span>
          <span id="fc-phase" style="position:absolute; top:15px; right:15px; font-size:0.7rem; background:var(--c-primary-bg); color:var(--c-primary); padding:2px 8px; border-radius:10px;">Phase</span>
          <h3 id="fc-q" style="font-size: 1.1rem; line-height: 1.6;">Question Text</h3>
          <p style="position:absolute; bottom:15px; font-size:0.8rem; color:var(--c-text-tertiary);">Click to flip</p>
        </div>
        <div class="card-face card-back">
          <span style="position:absolute; top:15px; left:15px; font-size:0.7rem; color:#30d158; text-transform:uppercase;">Solution</span>
          <pre style="width:100%; height:80%; text-align:left; overflow:auto; margin-top:20px; background:transparent; padding:0;"><code id="fc-a" class="language-javascript" style="font-size:0.85rem;">Answer Text</code></pre>
        </div>
      </div>
      <div class="flashcard-controls">
        <button id="fc-prev" class="toolbar-btn"><i class="fa-solid fa-arrow-left"></i> Prev</button>
        <button id="fc-next" class="toolbar-btn">Next <i class="fa-solid fa-arrow-right"></i></button>
      </div>
    `;

    flashcardContainer.innerHTML = cardHtml;

    const cardEl = document.getElementById("fc-card");
    cardEl.addEventListener("click", () => {
      cardEl.classList.toggle("is-flipped");
    });

    document.getElementById("fc-prev").addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCard();
      }
    });

    document.getElementById("fc-next").addEventListener("click", () => {
      if (currentIndex < flashcards.length - 1) {
        currentIndex++;
        updateCard();
      }
    });

    updateCard();
  }

  function updateCard() {
    const card = flashcards[currentIndex];
    document.getElementById("fc-current").textContent = currentIndex + 1;
    document.getElementById("fc-phase").textContent = card.phase;
    document.getElementById("fc-q").innerHTML = card.question.replace(
      /\\n/g,
      "<br>",
    );
    document.getElementById("fc-a").textContent = card.solution;

    const cardEl = document.getElementById("fc-card");
    cardEl.classList.remove("is-flipped");

    if (window.Prism) {
      Prism.highlightElement(document.getElementById("fc-a"));
    }
  }
});
