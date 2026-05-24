(function () {
  var isOpen = false;
  var msgShown = false;
  var konami = [];
  var konamiCode = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a",
  ];

  function styledLog(msg, style) {
    console.log("%c" + msg, style);
  }

  function showWelcome() {
    var banner =
      "background:linear-gradient(135deg,#5856d6,#ff6b81);color:#fff;padding:14px 20px 4px;font-size:20px;font-weight:800;font-family:Inter,sans-serif;border-radius:8px 8px 0 0;line-height:1.4";
    var sub =
      "background:linear-gradient(135deg,#5856d6,#ff6b81);color:rgba(255,255,255,0.85);padding:4px 20px 14px;font-size:13px;font-weight:500;font-family:Inter,sans-serif;border-radius:0 0 8px 8px;line-height:1.4";

    console.log(
      "%c\u{1F525} JS \u2192 React Roadmap%c  \n%cMaster JavaScript, Build Anything.",
      banner, "", sub
    );
    console.log(
      "%c  Repo: github.com/arundada9000/js-to-react  |  Live: pre-mern.vercel.app  ",
      "background:#1e1e2e;color:#cdd6f4;padding:6px 14px;font-size:12px;font-family:monospace;border-radius:4px"
    );
    styledLog("Built with \u2764\uFE0F by Arun Neupane", "color:#6e6e73;font-size:12px;font-family:Inter,sans-serif");
    console.log(
      "%cType %c help() %c to see available console commands",
      "color:#aeaeb2;font-size:12px;font-family:Inter,sans-serif",
      "background:var(--c-surface-alt,#f0f0f3);color:var(--c-primary,#5856d6);padding:2px 8px;border-radius:4px;font-size:12px;font-weight:700;font-family:monospace",
      "color:#aeaeb2;font-size:12px;font-family:Inter,sans-serif"
    );
  }

  function showDevToolsMsg() {
    if (msgShown) return;
    msgShown = true;
    styledLog("\u{1F440} Hi there, curious dev!", "font-size:16px;font-weight:700;color:#5856d6;font-family:Inter,sans-serif");
    console.log(
      "%cPeeking under the hood? This whole app is vanilla JS - no frameworks, no shortcuts. Just like the curriculum teaches.\n\nTry editing code in the console. Break things. Fix them. That's how you learn.",
      "color:#6e6e73;font-size:13px;font-family:Inter,sans-serif;line-height:1.6"
    );
    console.log(
      "%c\u{1F4A1} Tip: Check js/curriculum.js to see all 10 phases of exercises!",
      "background:#eeedfc;color:#5856d6;padding:6px 12px;border-radius:6px;font-size:12px;font-weight:600;font-family:Inter,sans-serif"
    );
    console.log(
      "%cType %c help() %c for more console tricks",
      "color:#aeaeb2;font-size:12px;font-family:Inter,sans-serif",
      "background:var(--c-surface-alt,#f0f0f3);color:var(--c-primary,#5856d6);padding:2px 8px;border-radius:4px;font-size:12px;font-weight:700;font-family:monospace",
      "color:#aeaeb2;font-size:12px;font-family:Inter,sans-serif"
    );
  }

  window.help = function () {
    console.log(
      "%c\u{1F4DD} Available Console Commands",
      "font-size:18px;font-weight:800;color:#5856d6;font-family:Inter,sans-serif;padding:10px 0 4px"
    );
    var cmds = [
      ["help()", "Show this list"],
      ["stats()", "Show curriculum stats"],
      ["surprise()", "Trigger a confetti explosion!"],
      ["quote()", "Get a random JavaScript wisdom"],
      ["curriculum", "Explore the full curriculum data"],
    ];
    cmds.forEach(function (c) {
      console.log(
        "%c  " + c[0] + " %c" + c[1],
        "color:#5856d6;font-weight:700;font-size:13px;font-family:monospace;padding:2px 0",
        "color:#6e6e73;font-size:13px;font-family:Inter,sans-serif;padding:2px 0"
      );
    });
  };

  window.stats = function () {
    if (typeof curriculum === "undefined") {
      styledLog("Curriculum data not loaded yet.", "color:#ff6b6b;font-size:13px;font-family:Inter,sans-serif");
      return;
    }
    var phases = curriculum.length;
    var exercises = 0;
    var topics = new Set();
    curriculum.forEach(function (p) {
      exercises += p.exercises.length;
      (p.topics || []).forEach(function (t) { topics.add(t); });
    });
    console.log(
      "%c\u{1F4CA} Curriculum Stats",
      "font-size:16px;font-weight:800;color:#5856d6;font-family:Inter,sans-serif;padding:8px 0 4px"
    );
    console.log("  Phases:    " + phases);
    console.log("  Exercises: " + exercises);
    console.log("  Topics:    " + topics.size);
  };

  window.surprise = function () {
    if (typeof confetti === "function") {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
      setTimeout(function () {
        confetti({ particleCount: 100, spread: 120, origin: { y: 0.4, x: 0.3 } });
        confetti({ particleCount: 100, spread: 120, origin: { y: 0.4, x: 0.7 } });
      }, 200);
    }
    styledLog("\u2728 Surprise! You found the confetti cannon!", "font-size:14px;font-weight:700;color:#f59e0b;font-family:Inter,sans-serif;padding:6px 0");
  };

  window.quote = function () {
    var quotes = [
      '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
      '"First, solve the problem. Then, write the code." - John Johnson',
      '"The best way to learn JavaScript is to write JavaScript." - Unknown',
      '"Code is like humor. When you have to explain it, it\u2019s bad." - Cory House',
      '"JavaScript is the only language that people feel they don\u2019t need to learn before using." - Douglas Crockford',
      '"Make it work, make it right, make it fast." - Kent Beck',
      '"The only way to learn a new programming language is by writing programs in it." - Dennis Ritchie',
      '"The cheapest, fastest, and most reliable components are those that aren\u2019t there." - Gordon Bell',
    ];
    var q = quotes[Math.floor(Math.random() * quotes.length)];
    styledLog("\u{1F4AC} " + q, "color:#6e6e73;font-size:13px;font-family:Inter,sans-serif;font-style:italic;line-height:1.6;padding:6px 0");
  };

  function showKonami() {
    styledLog("\u{1F389} KONAMI CODE ACTIVATED! \u{1F389}", "font-size:18px;font-weight:900;color:#ff6b81;font-family:Inter,sans-serif;padding:8px 0");
    styledLog("You found the secret easter egg! You're a true developer.", "color:#5856d6;font-size:14px;font-weight:600;font-family:Inter,sans-serif");
    if (typeof confetti === "function") {
      var end = Date.now() + 3000;
      (function frame() {
        confetti({ particleCount: 5, spread: 360, origin: { y: 0.5 } });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }
  }

  function checkDevTools() {
    var threshold = 160;
    var widthDiff = window.outerWidth - window.innerWidth;
    var heightDiff = window.outerHeight - window.innerHeight;
    var nowOpen = widthDiff > threshold || heightDiff > threshold;

    if (nowOpen && !isOpen) {
      isOpen = true;
      showDevToolsMsg();
    } else if (!nowOpen) {
      isOpen = false;
    }
  }

  document.addEventListener("keydown", function (e) {
    konami.push(e.key);
    if (konami.length > konamiCode.length) konami.shift();
    if (konami.join(",") === konamiCode.join(",")) {
      konami = [];
      showKonami();
    }
  });

  showWelcome();
  var interval = setInterval(checkDevTools, 1500);

  window.addEventListener("beforeunload", function () {
    clearInterval(interval);
  });
})();
