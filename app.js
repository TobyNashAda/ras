document.addEventListener("DOMContentLoaded", () => {
  let playerCount = 2;
  const maxPlayers = 4;
  const addBtn = document.getElementById("add-player-button");
  const playersContainer = document.getElementById("players-container");

  function changeScore(playerId, delta) {
    const scoreElement = document.getElementById(`score-${playerId}`);
    let score = parseInt(scoreElement.textContent, 10);
    score = Math.max(0, score + delta);
    scoreElement.textContent = score;
  }

  window.changeScore = changeScore; // make accessible in inline onclick

  addBtn.addEventListener("click", () => {
    if (playerCount >= maxPlayers) return;

    playerCount++;
    const playerId = `player${playerCount}`;

    const playerDiv = document.createElement("div");
    playerDiv.className = "player";
    playerDiv.id = playerId;

    playerDiv.innerHTML = `
      <div class="name" contenteditable="true">Player ${playerCount}</div>
      <div class="score-controls">
        <button onclick="changeScore('${playerId}', -1)">−</button>
        <span class="score" id="score-${playerId}">0</span>
        <button onclick="changeScore('${playerId}', 1)">+</button>
      </div>
      <button class="delete-button" onclick="removePlayer('${playerId}')">Delete</button>
    `;

    playersContainer.appendChild(playerDiv);

    if (playerCount >= maxPlayers) {
      addBtn.style.display = "none";
    }
  });

  window.removePlayer = function(playerId) {
    const playerDiv = document.getElementById(playerId);
    if (playerDiv) {
      playerDiv.remove();
      playerCount--;
      if (playerCount < maxPlayers) {
        addBtn.style.display = "inline-block";
      }
    }
  };

  // Popup related code
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popup-text");
  const closePopupBtn = document.getElementById("close-popup");

  const messages = [
    {
      title: "2x boost",
      desc: "move 2 more spaces",
      img: null // no image
    },
    {
      title: "Shield",
      desc: "can't be pushed down by other players for 3 turns",
      img: "https://png.pngtree.com/png-vector/20231116/ourmid/pngtree-elegant-golden-shield-png-image_10625519.png"
    },
    {
      title: "Free lateral movement",
      desc: "move as far as you want laterally",
      img: "https://cdn-icons-png.flaticon.com/512/10731/10731661.png"
    }
  ];

  // The question mark button is the first large-utility-button
  const questionBtn = document.querySelector(".large-utility-button");

  questionBtn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const message = messages[randomIndex];

    let html = "";
    if (message.img) {
      html += `<img src="${message.img}" alt="${message.title}" class="popup-image" />`;
    }
    html += `<strong>${message.title}</strong> - ${message.desc}`;

    popupText.innerHTML = html;
    popup.classList.remove("hidden");
  });

  closePopupBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
  });

  // Close popup if clicking outside the content box
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.add("hidden");
    }
  });
});
