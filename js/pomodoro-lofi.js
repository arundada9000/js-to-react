document.addEventListener("DOMContentLoaded", () => {
  // --- Pomodoro Logic ---
  const pomoWidget = document.getElementById("pomodoro-widget");
  const pomoTime = document.getElementById("pomo-time");
  const pomoToggle = document.getElementById("pomo-toggle");

  if (pomoWidget) {
    pomoWidget.classList.remove("widget-hidden");
  }

  let pomoInterval = null;
  let timeRemaining = 25 * 60; // 25 minutes in seconds

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  if (pomoToggle && pomoTime) {
    pomoTime.textContent = formatTime(timeRemaining);

    pomoToggle.addEventListener("click", () => {
      const icon = pomoToggle.querySelector("i") || pomoToggle;

      if (pomoInterval) {
        // Pause timer
        clearInterval(pomoInterval);
        pomoInterval = null;
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
      } else {
        // Play timer
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");

        pomoInterval = setInterval(() => {
          timeRemaining--;
          pomoTime.textContent = formatTime(timeRemaining);

          if (timeRemaining <= 0) {
            clearInterval(pomoInterval);
            pomoInterval = null;
            timeRemaining = 25 * 60;
            pomoTime.textContent = formatTime(timeRemaining);

            icon.classList.remove("fa-pause");
            icon.classList.add("fa-play");

            // Small timeout to allow DOM to update before blocking with alert
            setTimeout(() => {
              alert("Pomodoro complete! Take a 5 minute break.");
            }, 10);
          }
        }, 1000);
      }
    });
  }

  // --- LoFi Player Logic ---
  const lofiWidget = document.getElementById("lofi-widget");
  const lofiToggle = document.getElementById("lofi-toggle");
  const lofiPlayer = document.getElementById("lofi-player");

  if (lofiWidget) {
    lofiWidget.classList.remove("widget-hidden");
  }

  let isLofiPlaying = false;
  let isIframeInjected = false;

  if (lofiToggle && lofiPlayer) {
    lofiToggle.addEventListener("click", () => {
      const icon = lofiToggle.querySelector("i") || lofiToggle;

      if (!isIframeInjected) {
        // First click: inject the iframe with autoplay
        lofiPlayer.innerHTML = `<iframe width="240" height="135" style="position:absolute; top:60px; right:20px; border-radius:10px; box-shadow:0 10px 30px rgba(0,0,0,0.5); z-index:9999; display:none;" src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&enablejsapi=1" frameborder="0" allow="autoplay" id="yt-iframe"></iframe>`;
        isIframeInjected = true;
        isLofiPlaying = true;

        document.getElementById("yt-iframe").style.display = "block";
        icon.classList.remove("fa-headphones");
        icon.classList.add("fa-circle-pause");
      } else {
        const iframe = document.getElementById("yt-iframe");
        if (iframe && iframe.contentWindow) {
          if (isLofiPlaying) {
            // Pause video
            iframe.contentWindow.postMessage(
              JSON.stringify({
                event: "command",
                func: "pauseVideo",
                args: "",
              }),
              "*",
            );
            isLofiPlaying = false;

            document.getElementById("yt-iframe").style.display = "none";
            icon.classList.remove("fa-circle-pause");
            icon.classList.add("fa-headphones");
          } else {
            // Play video
            iframe.contentWindow.postMessage(
              JSON.stringify({
                event: "command",
                func: "playVideo",
                args: "",
              }),
              "*",
            );
            isLofiPlaying = true;

            document.getElementById("yt-iframe").style.display = "block";
            icon.classList.remove("fa-headphones");
            icon.classList.add("fa-circle-pause");
          }
        }
      }
    });
  }
});
