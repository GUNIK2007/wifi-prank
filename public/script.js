// Aucune donnée n'est collectée, stockée ou envoyée : tout se passe dans le navigateur.
(function () {
  "use strict";

  var card = document.getElementById("card");
  var screens = {
    login: document.getElementById("screen-login"),
    loading: document.getElementById("screen-loading"),
    reveal: document.getElementById("screen-reveal")
  };
  var btnConnect = document.getElementById("btn-connect");
  var btnRestart = document.getElementById("btn-restart");
  var progress = document.getElementById("progress");
  var progressBar = document.getElementById("progress-bar");
  var loadingText = document.getElementById("loading-text");
  var confettiLayer = document.getElementById("confetti");

  var messages = [
    "Recherche du réseau…",
    "Vérification de la connexion…",
    "Négociation avec le routeur…",
    "Chargement de la surprise…"
  ];

  var timers = [];

  function showScreen(name) {
    Object.keys(screens).forEach(function (key) {
      screens[key].classList.toggle("active", key === name);
    });
  }

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function setProgress(value) {
    progressBar.style.width = value + "%";
    progress.setAttribute("aria-valuenow", String(value));
  }

  function startLoading() {
    clearTimers();
    showScreen("loading");
    setProgress(0);
    loadingText.textContent = messages[0];

    var steps = [
      { at: 600,  value: 25, msg: 1 },
      { at: 1500, value: 50, msg: 2 },
      { at: 2500, value: 80, msg: 3 },
      { at: 3500, value: 100, msg: 3 }
    ];

    steps.forEach(function (step) {
      timers.push(setTimeout(function () {
        setProgress(step.value);
        loadingText.textContent = messages[step.msg];
      }, step.at));
    });

    timers.push(setTimeout(reveal, 4000));
  }

  function reveal() {
    showScreen("reveal");
    card.classList.remove("shake");
    void card.offsetWidth; // relance l'animation
    card.classList.add("shake");
    launchConfetti();
  }

  function launchConfetti() {
    var colors = ["#7c3aed", "#a78bfa", "#ffffff", "#5b21b6", "#c4b5fd"];
    for (var i = 0; i < 60; i++) {
      var piece = document.createElement("span");
      piece.className = "confetti";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = 2 + Math.random() * 2.5 + "s";
      piece.style.animationDelay = Math.random() * 0.8 + "s";
      confettiLayer.appendChild(piece);
    }
    setTimeout(function () { confettiLayer.innerHTML = ""; }, 5500);
  }

  function restart() {
    clearTimers();
    confettiLayer.innerHTML = "";
    card.classList.remove("shake");
    setProgress(0);
    showScreen("login");
  }

  btnConnect.addEventListener("click", startLoading);
  btnRestart.addEventListener("click", restart);
})();