(function () {
  var isOpen = false;
  var msgShown = false;

  function showWelcome() {
    console.log(
      "%c🔥 JS \u2192 React Roadmap%c  \n%cMaster JavaScript, Build Anything.",
      "background:linear-gradient(135deg,#5856d6,#ff6b81);color:#fff;padding:14px 20px 4px;font-size:20px;font-weight:800;font-family:Inter,sans-serif;border-radius:8px 8px 0 0;line-height:1.4",
      "",
      "background:linear-gradient(135deg,#5856d6,#ff6b81);color:rgba(255,255,255,0.85);padding:4px 20px 14px;font-size:13px;font-weight:500;font-family:Inter,sans-serif;border-radius:0 0 8px 8px;line-height:1.4"
    );
    console.log(
      "%c  Repo: github.com/arundada9000/js-to-react  |  Live: pre-mern.vercel.app  ",
      "background:#1e1e2e;color:#cdd6f4;padding:6px 14px;font-size:12px;font-family:monospace;border-radius:4px"
    );
    console.log(
      "%cBuilt with \u2764\ufe0f by Arun Neupane",
      "color:#6e6e73;font-size:12px;font-family:Inter,sans-serif"
    );
  }

  function showDevToolsMsg() {
    if (msgShown) return;
    msgShown = true;
    console.log(
      "%c\u{1F440} Hi there, curious dev!",
      "font-size:16px;font-weight:700;color:#5856d6;font-family:Inter,sans-serif"
    );
    console.log(
      "%cPeeking under the hood? This whole app is vanilla JS - no frameworks, no shortcuts. Just like the curriculum teaches.\n\nTry editing code in the console. Break things. Fix them. That's how you learn.",
      "color:#6e6e73;font-size:13px;font-family:Inter,sans-serif;line-height:1.6"
    );
    console.log(
      "%c\u{1F4A1} Tip: Check js/curriculum.js to see all 10 phases of exercises!",
      "background:#eeedfc;color:#5856d6;padding:6px 12px;border-radius:6px;font-size:12px;font-weight:600;font-family:Inter,sans-serif"
    );
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

  showWelcome();

  var interval = setInterval(checkDevTools, 1500);

  window.addEventListener("beforeunload", function () {
    clearInterval(interval);
  });
})();
