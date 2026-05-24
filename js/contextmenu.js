document.addEventListener("DOMContentLoaded", () => {
  // Create the custom context menu element
  const menu = document.createElement("div");
  menu.id = "custom-context-menu";
  menu.innerHTML = `
        <div class="ctx-menu">
            <button class="ctx-item" data-action="top"><i class="fa-solid fa-arrow-up"></i> Go to Top</button>
            <button class="ctx-item" data-action="search"><i class="fa-solid fa-magnifying-glass"></i> Search</button>
            <button class="ctx-item" data-action="collapse"><i class="fa-solid fa-compress"></i> Collapse All</button>
            <button class="ctx-item" data-action="expand"><i class="fa-solid fa-expand"></i> Expand All</button>
            <div class="ctx-separator"></div>
            <button class="ctx-item" data-action="theme"><i class="fa-solid fa-moon" id="ctx-theme-icon"></i> <span id="ctx-theme-label">Dark Mode</span></button>
            <button class="ctx-item" data-action="study"><i class="fa-solid fa-layer-group"></i> Study Mode</button>
            <button class="ctx-item" data-action="download"><i class="fa-solid fa-download"></i> Download .md</button>
            <div class="ctx-separator"></div>
            <button class="ctx-item ctx-danger" data-action="reset"><i class="fa-solid fa-rotate-left"></i> Reset Progress</button>
        </div>
    `;
  document.body.appendChild(menu);

  // Show custom menu on right-click
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    // Update theme label
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    const themeIcon = document.getElementById("ctx-theme-icon");
    const themeLabel = document.getElementById("ctx-theme-label");
    if (themeIcon)
      themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    if (themeLabel)
      themeLabel.textContent = isDark ? "Light Mode" : "Dark Mode";

    // Position the menu
    const menuEl = menu.querySelector(".ctx-menu");
    menu.classList.add("visible");

    // Ensure menu doesn't overflow viewport
    const menuRect = menuEl.getBoundingClientRect();
    let x = e.clientX;
    let y = e.clientY;

    if (x + menuRect.width > window.innerWidth) {
      x = window.innerWidth - menuRect.width - 8;
    }
    if (y + menuRect.height > window.innerHeight) {
      y = window.innerHeight - menuRect.height - 8;
    }

    menuEl.style.left = x + "px";
    menuEl.style.top = y + "px";
  });

  // Hide menu on click anywhere or Escape
  document.addEventListener("click", () => {
    menu.classList.remove("visible");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      menu.classList.remove("visible");
    }
  });

  // Handle menu actions
  menu.addEventListener("click", (e) => {
    const item = e.target.closest(".ctx-item");
    if (!item) return;

    const action = item.dataset.action;
    menu.classList.remove("visible");

    switch (action) {
      case "top":
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "search":
        const searchInput = document.getElementById("search-input");
        if (searchInput) searchInput.focus();
        break;
      case "collapse":
        const collapseBtn = document.getElementById("btn-collapse-all");
        if (collapseBtn) collapseBtn.click();
        break;
      case "expand":
        const expandBtn = document.getElementById("btn-expand-all");
        if (expandBtn) expandBtn.click();
        break;
      case "theme":
        const themeToggle = document.getElementById("theme-toggle");
        if (themeToggle) themeToggle.click();
        break;
      case "study":
        const studyBtn = document.getElementById("btn-study-mode");
        if (studyBtn) studyBtn.click();
        break;
      case "download":
        const dlBtn = document.getElementById("btn-download");
        if (dlBtn) dlBtn.click();
        break;
      case "reset":
        const resetBtn = document.getElementById("reset-btn");
        if (resetBtn) resetBtn.click();
        break;
    }
  });
});
