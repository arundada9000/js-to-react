(function () {
  var deferredPrompt = null;
  var swRegistration = null;

  var installBtn = document.getElementById("pwa-install-btn");
  var updateToast = document.getElementById("pwa-update-toast");
  var updateBtn = document.getElementById("pwa-update-btn");
  var updateClose = document.getElementById("pwa-update-close");

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) installBtn.classList.add("visible");
  });

  window.addEventListener("appinstalled", function () {
    deferredPrompt = null;
    if (installBtn) installBtn.classList.remove("visible");
    console.log("PWA installed successfully.");
  });

  if (installBtn) {
    installBtn.addEventListener("click", function () {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function (choice) {
        if (choice.outcome === "accepted") {
          console.log("User accepted PWA install");
        } else {
          console.log("User dismissed PWA install");
        }
        deferredPrompt = null;
        installBtn.classList.remove("visible");
      });
    });
  }

  if (updateClose) {
    updateClose.addEventListener("click", function () {
      updateToast.classList.remove("visible");
    });
  }

  if (updateBtn && updateToast) {
    updateBtn.addEventListener("click", function () {
      if (swRegistration && swRegistration.waiting) {
        swRegistration.waiting.postMessage({ type: "SKIP_WAITING" });
        swRegistration.waiting.addEventListener("statechange", function () {
          if (this.state === "activated") {
            window.location.reload();
          }
        });
      }
    });
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js").then(function (reg) {
        swRegistration = reg;
        console.log("SW registered: " + reg.scope);

        if (reg.waiting) {
          showUpdateToast();
        }

        reg.addEventListener("updatefound", function () {
          var newWorker = reg.installing;
          newWorker.addEventListener("statechange", function () {
            if (this.state === "installed" && navigator.serviceWorker.controller) {
              showUpdateToast();
            }
          });
        });
      }).catch(function (err) {
        console.log("SW registration failed: " + err);
      });

      navigator.serviceWorker.addEventListener("controllerchange", function () {
        console.log("SW controller changed");
      });
    });
  }

  function showUpdateToast() {
    if (updateToast) {
      updateToast.classList.add("visible");
    }
  }
})();
