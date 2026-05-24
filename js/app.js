document.addEventListener("DOMContentLoaded", () => {
  // ─── State ───
  let totalExercises = 0;
  let completedExercises = 0;
  const completedSet = new Set(
    JSON.parse(localStorage.getItem("jsGuideCompleted") || "[]"),
  );
  const collapsedPhases = new Set();

  // ─── DOM Elements ───
  const sidebarNav = document.getElementById("sidebar-nav");
  const curriculumContainer = document.getElementById("curriculum-container");
  const progressText = document.getElementById("progress-text");
  const progressBar = document.getElementById("progress-bar");
  const particlesContainer = document.body;
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  // ─── Init ───
  initApp();

  function initApp() {
    initSearch();
    initResetBtn();
    renderSidebar();
    renderCurriculum();
    initFloatingParticles();
    updateProgress();
    setupIntersectionObserver();

    if (window.Prism) {
      Prism.highlightAll();
    }
  }

  // ─── Search Bar ───
  function initSearch() {
    const searchInput = document.getElementById("search-input");
    const searchClear = document.getElementById("search-clear");

    if (!searchInput) return;

    let debounceTimer;
    searchInput.addEventListener("input", () => {
      const val = searchInput.value.trim().toLowerCase();
      if (searchClear) {
        if (val) searchClear.classList.add("visible");
        else searchClear.classList.remove("visible");
      }
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        filterExercises(val);
      }, 250);
    });

    if (searchClear) {
      searchClear.addEventListener("click", () => {
        searchInput.value = "";
        searchClear.classList.remove("visible");
        filterExercises("");
        searchInput.focus();
      });
    }

    // Inject dynamic styles not covered by styles.css
    const style = document.createElement("style");
    style.textContent = `
      .exercise-card.search-hidden,
      .phase-card.search-hidden {
        display: none !important;
      }
      .phase-topics {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 8px;
      }
      .topic-tag {
        display: inline-block;
        padding: 3px 10px;
        background: var(--c-surface-alt);
        border: 1px solid var(--c-border);
        border-radius: var(--r-pill);
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--c-text-tertiary);
        transition: all var(--t-fast);
        cursor: default;
      }
      .topic-tag:hover {
        background: var(--c-primary-bg);
        border-color: var(--c-primary-light);
        color: var(--c-primary);
        transform: translateY(-2px);
        box-shadow: var(--shadow-xs);
      }
      .topic-tag:active {
        transform: translateY(0) scale(0.95);
      }
      .hint-block {
        background: var(--c-warning-bg);
        border-left: 4px solid var(--c-warning);
        padding: 10px 14px;
        border-radius: 0 8px 8px 0;
        font-size: 0.88rem;
        color: #92400e;
        margin-bottom: 12px;
        display: none;
      }
      .hint-block.show {
        display: block;
      }
      .hint-toggle {
        background: none;
        border: none;
        color: var(--c-warning);
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        padding: 0;
        margin-bottom: 8px;
        font-family: 'Inter', sans-serif;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .hint-toggle:hover {
        color: #d97706;
      }
      .sparkle-particle {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        font-size: 14px;
      }
      .heart-particle {
        position: fixed;
        pointer-events: none;
        z-index: 0;
        color: var(--c-primary);
        opacity: 0.2;
        animation: floatParticle linear forwards;
      }
      @keyframes floatParticle {
        0% { transform: translateY(100vh); opacity: 0; }
        10% { opacity: 0.2; }
        90% { opacity: 0.2; }
        100% { transform: translateY(-10vh); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // ─── Reset Button ───
  function initResetBtn() {
    const resetBtn = document.getElementById("reset-btn");
    if (!resetBtn) return;
    resetBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to reset your progress?")) {
        completedSet.clear();
        saveProgress();
        updateProgress();
        document
          .querySelectorAll(".exercise-card.completed")
          .forEach((card) => card.classList.remove("completed"));
      }
    });
  }

  function filterExercises(query) {
    const exerciseCards = document.querySelectorAll(".exercise-card");
    const phaseCards = document.querySelectorAll(".phase-card");

    if (!query) {
      exerciseCards.forEach((card) => card.classList.remove("search-hidden"));
      phaseCards.forEach((card) => card.classList.remove("search-hidden"));
      return;
    }

    phaseCards.forEach((phaseCard) => {
      const exercises = phaseCard.querySelectorAll(".exercise-card");
      let hasVisible = false;

      exercises.forEach((card) => {
        const questionText = card
          .querySelector(".exercise-question")
          .textContent.toLowerCase();
        if (questionText.includes(query)) {
          card.classList.remove("search-hidden");
          hasVisible = true;
        } else {
          card.classList.add("search-hidden");
        }
      });

      if (hasVisible) {
        phaseCard.classList.remove("search-hidden");
        // Auto-expand phase if it has results
        const body = phaseCard.querySelector(".phase-body");
        if (body && body.classList.contains("collapsed")) {
          body.classList.remove("collapsed");
          body.classList.add("expanded");
          const icon = phaseCard.querySelector(".collapse-icon");
          if (icon) icon.classList.remove("collapsed");
        }
      } else {
        phaseCard.classList.add("search-hidden");
      }
    });
  }

  // ─── Render Sidebar ───
  function renderSidebar() {
    sidebarNav.innerHTML = "";
    curriculum.forEach((phase) => {
      const a = document.createElement("a");
      a.href = `#phase-${phase.phase}`;
      a.className = "nav-link";
      a.dataset.phase = phase.phase;
      a.innerHTML = `
        <i class="${phase.icon} nav-icon"></i>
        <span class="nav-label">Phase ${phase.phase}</span>
      `;

      a.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.getElementById(`phase-${phase.phase}`);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
        document
          .querySelectorAll(".nav-link")
          .forEach((nav) => nav.classList.remove("active"));
        a.classList.add("active");

        // Close mobile sidebar on click
        if (window.innerWidth <= 900) {
          sidebar.classList.remove("open");
        }
      });

      sidebarNav.appendChild(a);
    });

    if (sidebarNav.firstChild) {
      sidebarNav.firstChild.classList.add("active");
    }
  }

  // ─── Render Curriculum ───
  function renderCurriculum() {
    curriculumContainer.innerHTML = "";
    totalExercises = 0;

    curriculum.forEach((phase) => {
      const phaseEl = document.createElement("div");
      phaseEl.className = "phase-card";
      phaseEl.id = `phase-${phase.phase}`;

      // Phase Header
      const headerEl = document.createElement("div");
      headerEl.className = "phase-header";

      const isCollapsed = phase.phase !== 1;
      if (isCollapsed) collapsedPhases.add(phase.phase);
      if (!isCollapsed) phaseEl.classList.add("open");

      // Build topics HTML
      const topicsHtml = (phase.topics || [])
        .map((t) => `<span class="topic-tag">${t}</span>`)
        .join("");

      headerEl.innerHTML = `
        <div class="phase-icon" style="background-color: ${phase.color}1a; color: ${phase.color}">
          <i class="${phase.icon}"></i>
        </div>
        <div class="phase-title">
          <h2>Phase ${phase.phase}: ${phase.title}</h2>
          <p>${phase.description}</p>
          <div class="phase-topics">${topicsHtml}</div>
        </div>
        <i class="fa-solid fa-chevron-down phase-chevron"></i>
      `;

      phaseEl.appendChild(headerEl);

      // Phase Body
      const bodyEl = document.createElement("div");
      bodyEl.className = "phase-body";

      // Exercises
      phase.exercises.forEach((exercise, idx) => {
        totalExercises++;
        const exId = `ex-${phase.phase}-${idx}`;
        const isCompleted = completedSet.has(exId);
        if (isCompleted) completedExercises++;

        const exCard = document.createElement("div");
        exCard.className = `exercise-card${isCompleted ? " completed" : ""}`;
        exCard.id = exId;

        const formatQuestion = exercise.question.replace(/\n/g, "<br>");

        exCard.innerHTML = `
          <button class="complete-btn" aria-label="Mark Complete">
            <i class="fa-solid fa-check"></i>
          </button>
          <div class="exercise-question">${formatQuestion}</div>

          ${
            exercise.hint
              ? `
            <button class="hint-toggle">
              <i class="fa-solid fa-lightbulb"></i> Show Hint
            </button>
            <div class="hint-block">${exercise.hint}</div>
          `
              : ""
          }

          <div class="expected-result">
            <span class="expected-result-label">Expected Output in Console:</span>
            ${exercise.expectedResult.replace(/\n/g, "<br>")}
          </div>

          <button class="solution-toggle-btn">
            <i class="fa-solid fa-code"></i> Show Code Solution
          </button>

          <div class="solution-wrapper">
            <div style="position: relative;">
              <button class="copy-code-btn">
                <i class="fa-regular fa-copy"></i> Copy
              </button>
              <pre><code class="language-javascript">${escapeHtml(exercise.solutionCode)}</code></pre>
            </div>
          </div>
        `;

        // Hint Toggle
        const hintToggle = exCard.querySelector(".hint-toggle");
        const hintBlock = exCard.querySelector(".hint-block");
        if (hintToggle && hintBlock) {
          hintToggle.addEventListener("click", () => {
            const showing = hintBlock.classList.contains("show");
            hintBlock.classList.toggle("show");
            hintToggle.innerHTML = showing
              ? '<i class="fa-solid fa-lightbulb"></i> Show Hint'
              : '<i class="fa-solid fa-lightbulb"></i> Hide Hint';
          });
        }

        // Solution Toggle
        const toggleBtn = exCard.querySelector(".solution-toggle-btn");
        const solutionDiv = exCard.querySelector(".solution-wrapper");
        toggleBtn.addEventListener("click", () => {
          const isShowing = solutionDiv.classList.contains("show");
          if (isShowing) {
            solutionDiv.classList.remove("show");
            toggleBtn.classList.remove("active");
            toggleBtn.innerHTML =
              '<i class="fa-solid fa-code"></i> Show Code Solution';
          } else {
            solutionDiv.classList.add("show");
            toggleBtn.classList.add("active");
            toggleBtn.innerHTML =
              '<i class="fa-solid fa-eye-slash"></i> Hide Code Solution';
            if (window.Prism) Prism.highlightAll();
          }
        });

        // Copy Button
        const copyBtn = exCard.querySelector(".copy-code-btn");
        copyBtn.addEventListener("click", () => {
          navigator.clipboard.writeText(exercise.solutionCode).then(() => {
            copyBtn.classList.add("copied");
            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            setTimeout(() => {
              copyBtn.classList.remove("copied");
              copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
            }, 2000);
          });
        });

        // Complete Button
        const completeBtn = exCard.querySelector(".complete-btn");
        completeBtn.addEventListener("click", () => {
          if (completedSet.has(exId)) {
            completedSet.delete(exId);
            exCard.classList.remove("completed");
            completedExercises--;
          } else {
            completedSet.add(exId);
            exCard.classList.add("completed");
            completedExercises++;
            spawnSparkleBurst(completeBtn);
          }
          saveProgress();
          updateProgress();
        });

        bodyEl.appendChild(exCard);
      });

      phaseEl.appendChild(bodyEl);

      // Collapse/Expand toggle on header click
      headerEl.addEventListener("click", () => {
        phaseEl.classList.toggle("open");
        if (phaseEl.classList.contains("open")) {
          collapsedPhases.delete(phase.phase);
        } else {
          collapsedPhases.add(phase.phase);
        }
      });

      curriculumContainer.appendChild(phaseEl);
    });
  }

  // ─── IntersectionObserver for active nav ───
  function setupIntersectionObserver() {
    const phaseElements = document.querySelectorAll(".phase-card");
    const navItems = document.querySelectorAll(".nav-link");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const phaseNum = entry.target.id.replace("phase-", "");
            navItems.forEach((nav) => {
              nav.classList.toggle("active", nav.dataset.phase === phaseNum);
            });
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      },
    );

    phaseElements.forEach((el) => observer.observe(el));
  }

  // ─── Progress ───
  function updateProgress() {
    progressText.textContent = `${completedExercises} / ${totalExercises} Completed`;
    const percentage =
      totalExercises === 0 ? 0 : (completedExercises / totalExercises) * 100;
    progressBar.style.width = `${percentage}%`;
  }

  function saveProgress() {
    localStorage.setItem("jsGuideCompleted", JSON.stringify([...completedSet]));
  }

  // ─── Helpers ───
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ─── Sparkle Animation (stars, NOT hearts) ───
  function spawnSparkleBurst(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const sparkleChars = ["✦", "✧", "⭐", "✨", "·", "★"];

    for (let i = 0; i < 10; i++) {
      const sparkle = document.createElement("span");
      sparkle.className = "sparkle-particle";
      sparkle.textContent =
        sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.color = [
        "#6366f1",
        "#f59e0b",
        "#10b981",
        "#ef4444",
        "#ec4899",
        "#06b6d4",
      ][Math.floor(Math.random() * 6)];
      sparkle.style.transition = "all 0.8s cubic-bezier(0.1, 0.8, 0.3, 1)";
      sparkle.style.opacity = "1";

      document.body.appendChild(sparkle);

      // Trigger reflow
      void sparkle.offsetWidth;

      const angle = (i / 10) * Math.PI * 2;
      const velocity = 40 + Math.random() * 60;

      sparkle.style.transform = `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity - 40}px) scale(${0.8 + Math.random()})`;
      sparkle.style.opacity = "0";

      setTimeout(() => sparkle.remove(), 850);
    }
  }

  // ─── Floating Particles (subtle dots/stars, NOT hearts) ───
  function initFloatingParticles() {
    if (!particlesContainer) return;

    const particleSymbols = ["·", "•", "✦", "✧"];

    setInterval(() => {
      if (document.hidden) return;

      const particle = document.createElement("span");
      particle.className = "heart-particle";
      particle.textContent =
        particleSymbols[Math.floor(Math.random() * particleSymbols.length)];

      const size = Math.random() * 14 + 8;
      const left = Math.random() * 100;
      const duration = Math.random() * 12 + 12;

      particle.style.fontSize = `${size}px`;
      particle.style.left = `${left}vw`;
      particle.style.animationDuration = `${duration}s`;

      particlesContainer.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, duration * 1000);
    }, 2000);
  }

  // ─── Mobile Menu Toggle ───
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 900 && sidebar.classList.contains("open")) {
      if (
        !sidebar.contains(e.target) &&
        e.target !== menuToggle &&
        !menuToggle.contains(e.target)
      ) {
        sidebar.classList.remove("open");
      }
    }
  });

  // ─── Hero Stats (animate counting) ───
  function animateStats() {
    const totalPhases = curriculum.length;
    let totalEx = 0;
    const topicsSet = new Set();
    curriculum.forEach((p) => {
      totalEx += p.exercises.length;
      (p.topics || []).forEach((t) => topicsSet.add(t));
    });

    animateCount("stat-phases", totalPhases);
    animateCount("stat-exercises", totalEx);
    animateCount("stat-topics", topicsSet.size);
  }

  function animateCount(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = current;
    }, 30);
  }

  animateStats();

  // ─── Collapse All / Expand All ───
  const btnCollapseAll = document.getElementById("btn-collapse-all");
  const btnExpandAll = document.getElementById("btn-expand-all");

  if (btnCollapseAll) {
    btnCollapseAll.addEventListener("click", () => {
      document.querySelectorAll(".phase-card").forEach((card) => {
        card.classList.remove("open");
      });
      rippleButton(btnCollapseAll);
    });
  }

  if (btnExpandAll) {
    btnExpandAll.addEventListener("click", () => {
      document.querySelectorAll(".phase-card").forEach((card) => {
        card.classList.add("open");
      });
      rippleButton(btnExpandAll);
    });
  }

  // ─── Grid View Toggle ───
  const btnGridView = document.getElementById("btn-grid-view");
  let isGridView = false;

  if (btnGridView) {
    btnGridView.addEventListener("click", () => {
      isGridView = !isGridView;
      const container = document.getElementById("curriculum-container");
      if (isGridView) {
        container.classList.add("grid-layout");
        btnGridView.classList.add("active-toggle");
        btnGridView.innerHTML = '<i class="fa-solid fa-list"></i> List View';
      } else {
        container.classList.remove("grid-layout");
        btnGridView.classList.remove("active-toggle");
        btnGridView.innerHTML =
          '<i class="fa-solid fa-table-cells-large"></i> Grid View';
      }
      rippleButton(btnGridView);
    });
  }

  // ─── Topics Modal ───
  const btnTopicsView = document.getElementById("btn-topics-view");
  const topicsModal = document.getElementById("topics-modal");
  const closeTopics = document.getElementById("close-topics");
  const topicsCloud = document.getElementById("topics-cloud");

  function populateTopicsCloud() {
    if (!topicsCloud) return;
    topicsCloud.innerHTML = "";
    const allTopics = [];
    curriculum.forEach((p) => {
      (p.topics || []).forEach((t) => {
        if (!allTopics.includes(t)) allTopics.push(t);
      });
    });
    allTopics.sort();
    allTopics.forEach((topic) => {
      const chip = document.createElement("span");
      chip.className = "topic-chip";
      chip.textContent = topic;
      chip.addEventListener("click", () => {
        closeModal(topicsModal);
        const searchInput = document.getElementById("search-input");
        if (searchInput) {
          searchInput.value = topic;
          searchInput.dispatchEvent(new Event("input"));
          searchInput.focus();
        }
      });
      topicsCloud.appendChild(chip);
    });
  }

  if (btnTopicsView) {
    btnTopicsView.addEventListener("click", () => {
      populateTopicsCloud();
      openModal(topicsModal);
    });
  }

  if (closeTopics) {
    closeTopics.addEventListener("click", () => closeModal(topicsModal));
  }

  // ─── Shortcuts Modal ───
  const btnShortcuts = document.getElementById("btn-shortcuts");
  const shortcutsModal = document.getElementById("shortcuts-modal");
  const closeShortcuts = document.getElementById("close-shortcuts");

  if (btnShortcuts) {
    btnShortcuts.addEventListener("click", () => openModal(shortcutsModal));
  }

  if (closeShortcuts) {
    closeShortcuts.addEventListener("click", () => closeModal(shortcutsModal));
  }

  // ─── Modal Helpers ───
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  // Close modals when clicking overlay
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // ─── Download Curriculum as Markdown ───
  const btnDownload = document.getElementById("btn-download");

  if (btnDownload) {
    btnDownload.addEventListener("click", () => {
      let md = "# JavaScript → React Roadmap\n\n";
      md +=
        "> A structured curriculum covering every JavaScript concept you need before jumping into React.\n\n";
      md += "---\n\n";

      curriculum.forEach((phase) => {
        md += `## Phase ${phase.phase}: ${phase.title}\n\n`;
        md += `${phase.description}\n\n`;
        md += `**Topics:** ${(phase.topics || []).join(", ")}\n\n`;

        phase.exercises.forEach((ex, idx) => {
          md += `### Exercise ${idx + 1}\n\n`;
          md += `**Question:** ${ex.question}\n\n`;
          if (ex.hint) md += `> 💡 **Hint:** ${ex.hint}\n\n`;
          md += `**Expected Output:**\n\`\`\`\n${ex.expectedResult}\n\`\`\`\n\n`;
          md += `**Solution:**\n\`\`\`javascript\n${ex.solutionCode}\n\`\`\`\n\n`;
          md += "---\n\n";
        });
      });

      const blob = new Blob([md], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "js-react-roadmap.md";
      a.click();
      URL.revokeObjectURL(url);

      // Visual feedback
      const originalHTML = btnDownload.innerHTML;
      btnDownload.innerHTML = '<i class="fa-solid fa-check"></i> Downloaded!';
      btnDownload.style.pointerEvents = "none";
      setTimeout(() => {
        btnDownload.innerHTML = originalHTML;
        btnDownload.style.pointerEvents = "";
      }, 2000);
    });
  }

  // ─── Back to Top ───
  const backToTopBtn = document.getElementById("back-to-top");
  const mainEl = document.querySelector(".main");

  if (backToTopBtn && mainEl) {
    mainEl.addEventListener("scroll", () => {
      if (mainEl.scrollTop > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    // Also listen on window scroll as fallback
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      mainEl.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ─── Keyboard Shortcuts ───
  document.addEventListener("keydown", (e) => {
    // Don't trigger shortcuts when typing in input fields
    const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(
      document.activeElement.tagName,
    );

    // Ctrl+K or / → Focus search
    if ((e.ctrlKey && e.key === "k") || (!isTyping && e.key === "/")) {
      e.preventDefault();
      const searchInput = document.getElementById("search-input");
      if (searchInput) searchInput.focus();
      return;
    }

    // Escape → Close modals / clear search
    if (e.key === "Escape") {
      const openModals = document.querySelectorAll(".modal-overlay.open");
      if (openModals.length > 0) {
        openModals.forEach((m) => closeModal(m));
      } else {
        const searchInput = document.getElementById("search-input");
        if (searchInput && searchInput.value) {
          searchInput.value = "";
          const clearBtn = document.getElementById("search-clear");
          if (clearBtn) clearBtn.classList.remove("visible");
          filterExercises("");
          searchInput.blur();
        }
      }
      return;
    }

    if (isTyping) return;

    // [ → Collapse All
    if (e.key === "[") {
      e.preventDefault();
      if (btnCollapseAll) btnCollapseAll.click();
      return;
    }

    // ] → Expand All
    if (e.key === "]") {
      e.preventDefault();
      if (btnExpandAll) btnExpandAll.click();
      return;
    }

    // G → Toggle Grid View
    if (e.key === "g" || e.key === "G") {
      e.preventDefault();
      if (btnGridView) btnGridView.click();
      return;
    }

    // Ctrl+D → Download
    if (e.ctrlKey && e.key === "d") {
      e.preventDefault();
      if (btnDownload) btnDownload.click();
      return;
    }

    // ? → Shortcuts modal
    if (e.key === "?") {
      e.preventDefault();
      openModal(shortcutsModal);
      return;
    }
  });

  // ─── Button Ripple Effect ───
  function rippleButton(btn) {
    btn.style.transform = "scale(0.95)";
    setTimeout(() => {
      btn.style.transform = "";
    }, 150);
  }

  // ─── Active toggle styling for toolbar buttons ───
  const toolbarStyle = document.createElement("style");
  toolbarStyle.textContent = `
    .toolbar-btn.active-toggle {
      background: var(--c-primary-bg);
      border-color: var(--c-primary-light);
      color: var(--c-primary);
    }
  `;
  document.head.appendChild(toolbarStyle);
});
