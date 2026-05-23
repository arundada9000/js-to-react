document.addEventListener('DOMContentLoaded', () => {
  
  // Create runner UI for each exercise
  function injectRunners() {
    const wrappers = document.querySelectorAll('.solution-wrapper');
    wrappers.forEach(wrapper => {
      // Prevent double injection
      if (wrapper.querySelector('.runner-container')) return;
      
      const runnerContainer = document.createElement('div');
      runnerContainer.className = 'runner-container';
      
      runnerContainer.innerHTML = `
        <div class="runner-header">
          <span class="runner-title"><i class="fa-solid fa-terminal"></i> JS Code Runner</span>
          <button class="btn-run"><i class="fa-solid fa-play"></i> Run Code</button>
        </div>
        <textarea class="runner-editor" placeholder="Write your JavaScript here..." spellcheck="false"></textarea>
        <pre class="runner-output">Console output will appear here...</pre>
      `;
      
      wrapper.appendChild(runnerContainer);
      
      // Get the elements
      const btnRun = runnerContainer.querySelector('.btn-run');
      const editor = runnerContainer.querySelector('.runner-editor');
      const output = runnerContainer.querySelector('.runner-output');
      
      // Pre-fill the editor with the solution code
      const codeBlock = wrapper.querySelector('code');
      if (codeBlock) {
        editor.value = codeBlock.textContent;
      }
      
      btnRun.addEventListener('click', () => {
        executeCode(editor.value, output);
      });
    });
  }

  function executeCode(code, outputEl) {
    outputEl.textContent = 'Running...';
    outputEl.style.color = '#a3be8c';
    
    // Intercept console.log
    const originalLog = console.log;
    let logs = [];
    
    console.log = function(...args) {
      // stringify objects beautifully
      const formattedArgs = args.map(arg => {
        if (typeof arg === 'object') return JSON.stringify(arg, null, 2);
        return String(arg);
      });
      logs.push(formattedArgs.join(' '));
      // Call original too
      originalLog.apply(console, args);
    };

    try {
      // Use new Function to execute code
      // We wrap it so it doesn't leak into global scope immediately, though it can still access window
      const fn = new Function(code);
      fn();
      
      if (logs.length > 0) {
        outputEl.textContent = logs.join('\n');
      } else {
        outputEl.textContent = 'Code executed successfully (no console output).';
      }
    } catch (err) {
      outputEl.style.color = '#bf616a';
      outputEl.textContent = err.toString();
    } finally {
      // Restore console.log
      console.log = originalLog;
    }
  }

  // Inject runners after a short delay to allow app.js to render
  setTimeout(injectRunners, 500);

});
