document.addEventListener("DOMContentLoaded", () => {
  // --- Web Audio API for Sleek Sounds ---
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playSound(type) {
    if (audioCtx.state === "suspended") audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        300,
        audioCtx.currentTime + 0.05,
      );
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioCtx.currentTime + 0.05,
      );
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === "success") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } else if (type === "error") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } else if (type === "mac-click") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        800,
        audioCtx.currentTime + 0.03,
      );
      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioCtx.currentTime + 0.03,
      );
      osc.start();
      osc.stop(audioCtx.currentTime + 0.03);
    }
  }

  // Add click sound to all buttons globally
  document.addEventListener("click", (e) => {
    if (e.target.closest("button") && !e.target.closest(".mac-btn")) {
      playSound("click");
    }
  });

  const romanticPrompt = `<span style="color:#ff6b81">C:\\CFCRupandehi\\Terminal></span> `;

  // Create runner UI for each exercise
  function injectRunners() {
    const wrappers = document.querySelectorAll(".solution-wrapper");
    wrappers.forEach((wrapper) => {
      if (wrapper.querySelector(".runner-container")) return;

      const runnerContainer = document.createElement("div");
      runnerContainer.className = "runner-container";

      runnerContainer.innerHTML = `
        <div class="runner-header">
          <div class="mac-buttons">
            <div class="mac-btn close-btn" title="Close"></div>
            <div class="mac-btn min-btn" title="Minimize"></div>
            <div class="mac-btn max-btn" title="Maximize"></div>
          </div>
          <span class="runner-title">JS Code Runner</span>
          <button class="btn-run"><i class="fa-solid fa-play"></i> Run</button>
        </div>
        <div class="runner-body">
          <textarea class="runner-editor" placeholder="Write your JavaScript here..." spellcheck="false"></textarea>
          <pre class="runner-output">${romanticPrompt}Ready for magic...</pre>
        </div>
      `;

      wrapper.appendChild(runnerContainer);

      const btnRun = runnerContainer.querySelector(".btn-run");
      const editor = runnerContainer.querySelector(".runner-editor");
      const output = runnerContainer.querySelector(".runner-output");
      const body = runnerContainer.querySelector(".runner-body");

      // Mac Buttons functionality
      const closeBtn = runnerContainer.querySelector(".close-btn");
      const minBtn = runnerContainer.querySelector(".min-btn");
      const maxBtn = runnerContainer.querySelector(".max-btn");

      const placeholder = document.createElement("div");
      placeholder.style.display = "none";

      closeBtn.addEventListener("click", () => {
        playSound("mac-click");
        runnerContainer.style.display = "none";

        if (runnerContainer.classList.contains("maximized")) {
          runnerContainer.classList.remove("maximized");
          document.body.classList.remove("has-maximized-terminal");
          if (placeholder.parentNode) {
            placeholder.parentNode.insertBefore(runnerContainer, placeholder);
            placeholder.remove();
          }
        }
      });

      minBtn.addEventListener("click", () => {
        playSound("mac-click");
        if (body.style.display === "none") {
          body.style.display = "block";
        } else {
          body.style.display = "none";
        }
      });

      maxBtn.addEventListener("click", () => {
        playSound("mac-click");

        // Create a fullscreen overlay with a fresh terminal
        const overlay = document.createElement("div");
        overlay.className = "terminal-fullscreen-overlay";

        // Copy current editor and output content
        const currentCode = editor.value;
        const currentOutput = output.innerHTML;

        overlay.innerHTML = `
          <div class="fullscreen-terminal">
            <div class="runner-header">
              <div class="mac-buttons">
                <div class="mac-btn close-btn" title="Close"></div>
                <div class="mac-btn min-btn" title="Minimize"></div>
                <div class="mac-btn max-btn" title="Exit Fullscreen"></div>
              </div>
              <span class="runner-title">JS Code Runner - Fullscreen</span>
              <button class="btn-run"><i class="fa-solid fa-play"></i> Run</button>
            </div>
            <div class="runner-body" style="display:flex; flex-direction:column; flex:1; min-height:0;">
              <textarea class="runner-editor" spellcheck="false" style="flex:1; resize:none; min-height:0;">${currentCode.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</textarea>
              <pre class="runner-output" style="flex:1; overflow-y:auto; max-height:none;">${currentOutput}</pre>
            </div>
          </div>
        `;

        document.body.appendChild(overlay);
        document.body.classList.add("has-maximized-terminal");

        // Force reflow then trigger entrance animation
        void overlay.offsetWidth;
        overlay.classList.add("visible");

        const fsEditor = overlay.querySelector(".runner-editor");
        const fsOutput = overlay.querySelector(".runner-output");
        const fsRunBtn = overlay.querySelector(".btn-run");
        const fsCloseBtn = overlay.querySelector(".close-btn");
        const fsMaxBtn = overlay.querySelector(".max-btn");

        // Unescape textarea value
        fsEditor.value = currentCode;

        // Run button in fullscreen
        fsRunBtn.addEventListener("click", () => {
          executeCode(fsEditor.value, fsOutput);
          // Sync back to original
          editor.value = fsEditor.value;
        });

        function closeFullscreen() {
          playSound("mac-click");
          overlay.classList.remove("visible");
          document.body.classList.remove("has-maximized-terminal");
          // Sync any changes back
          editor.value = fsEditor.value;
          output.innerHTML = fsOutput.innerHTML;
          setTimeout(() => overlay.remove(), 300);
        }

        fsCloseBtn.addEventListener("click", closeFullscreen);
        fsMaxBtn.addEventListener("click", closeFullscreen);

        // Escape key closes fullscreen
        function handleEsc(e) {
          if (e.key === "Escape") {
            closeFullscreen();
            document.removeEventListener("keydown", handleEsc);
          }
        }
        document.addEventListener("keydown", handleEsc);
      });

      const codeBlock = wrapper.querySelector("code");
      if (codeBlock) {
        editor.value = codeBlock.textContent;
      }

      btnRun.addEventListener("click", () => {
        executeCode(editor.value, output);
      });
    });
  }

  function executeCode(code, outputEl) {
    outputEl.innerHTML = `${romanticPrompt}Running...`;
    outputEl.style.color = "#a3be8c";

    const originalLog = console.log;
    let logs = [];

    console.log = function (...args) {
      const formattedArgs = args.map((arg) => {
        if (typeof arg === "object") return JSON.stringify(arg, null, 2);
        return String(arg);
      });
      logs.push(formattedArgs.join(" "));
      originalLog.apply(console, args);
    };

    try {
      const fn = new Function(code);
      fn();

      if (logs.length > 0) {
        outputEl.innerHTML = `${romanticPrompt}\n${logs.join("\n")}`;
      } else {
        outputEl.innerHTML = `${romanticPrompt}Code executed successfully (no output).`;
      }
      playSound("success");
    } catch (err) {
      outputEl.style.color = "#ff6b81";
      outputEl.innerHTML = `${romanticPrompt}<br/>${err.toString()}`;
      playSound("error");
    } finally {
      console.log = originalLog;
    }
  }

  setTimeout(injectRunners, 500);
});
