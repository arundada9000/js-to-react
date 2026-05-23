document.addEventListener('DOMContentLoaded', () => {
  // --- Web Audio API for Sleek Sounds ---
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } else if (type === 'mac-click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.03);
      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.03);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.03);
    }
  }

  // Add click sound to all buttons globally
  document.addEventListener('click', (e) => {
    if (e.target.closest('button') && !e.target.closest('.mac-btn')) {
      playSound('click');
    }
  });

  const romanticPrompt = `<span style="color:#ff6b81">C:\\Arun_❤️_Subekshya\\Terminal></span> `;
  
  // Create runner UI for each exercise
  function injectRunners() {
    const wrappers = document.querySelectorAll('.solution-wrapper');
    wrappers.forEach(wrapper => {
      if (wrapper.querySelector('.runner-container')) return;
      
      const runnerContainer = document.createElement('div');
      runnerContainer.className = 'runner-container';
      
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
      
      const btnRun = runnerContainer.querySelector('.btn-run');
      const editor = runnerContainer.querySelector('.runner-editor');
      const output = runnerContainer.querySelector('.runner-output');
      const body = runnerContainer.querySelector('.runner-body');
      
      // Mac Buttons functionality
      const closeBtn = runnerContainer.querySelector('.close-btn');
      const minBtn = runnerContainer.querySelector('.min-btn');
      const maxBtn = runnerContainer.querySelector('.max-btn');
      
      const placeholder = document.createElement('div');
      placeholder.style.display = 'none';

      closeBtn.addEventListener('click', () => {
        playSound('mac-click');
        runnerContainer.style.display = 'none';
        
        if (runnerContainer.classList.contains('maximized')) {
          runnerContainer.classList.remove('maximized');
          document.body.classList.remove('has-maximized-terminal');
          if (placeholder.parentNode) {
            placeholder.parentNode.insertBefore(runnerContainer, placeholder);
            placeholder.remove();
          }
        }
      });

      minBtn.addEventListener('click', () => {
        playSound('mac-click');
        if (body.style.display === 'none') {
          body.style.display = 'block';
        } else {
          body.style.display = 'none';
        }
      });

      maxBtn.addEventListener('click', () => {
        playSound('mac-click');
        
        if (!runnerContainer.classList.contains('maximized')) {
          // Maximize
          runnerContainer.parentNode.insertBefore(placeholder, runnerContainer);
          document.body.appendChild(runnerContainer);
          
          // Request animation frame ensures the DOM placement is painted before the class triggers the animation
          requestAnimationFrame(() => {
            runnerContainer.classList.add('maximized');
            document.body.classList.add('has-maximized-terminal');
          });
        } else {
          // Restore
          runnerContainer.classList.remove('maximized');
          document.body.classList.remove('has-maximized-terminal');
          
          if (placeholder.parentNode) {
            placeholder.parentNode.insertBefore(runnerContainer, placeholder);
            placeholder.remove();
          }
        }
      });
      
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
    outputEl.innerHTML = `${romanticPrompt}Running...`;
    outputEl.style.color = '#a3be8c';
    
    const originalLog = console.log;
    let logs = [];
    
    console.log = function(...args) {
      const formattedArgs = args.map(arg => {
        if (typeof arg === 'object') return JSON.stringify(arg, null, 2);
        return String(arg);
      });
      logs.push(formattedArgs.join(' '));
      originalLog.apply(console, args);
    };

    try {
      const fn = new Function(code);
      fn();
      
      if (logs.length > 0) {
        outputEl.innerHTML = `${romanticPrompt}\n${logs.join('\n')}`;
      } else {
        outputEl.innerHTML = `${romanticPrompt}Code executed successfully (no output).`;
      }
      playSound('success');
    } catch (err) {
      outputEl.style.color = '#ff6b81';
      outputEl.innerHTML = `${romanticPrompt}<br/>${err.toString()}`;
      playSound('error');
    } finally {
      console.log = originalLog;
    }
  }

  setTimeout(injectRunners, 500);

});
