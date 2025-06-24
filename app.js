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

  window.changeScore = changeScore;

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

  // --- POPUP LOGIC ---

  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popup-text");
  const closePopupBtn = document.getElementById("close-popup");

  const popupSets = [
    [
      { title: "3x Boost", desc: "Move 3 extra spaces", img: null },
      { title: "Shield", desc: "Immune to traps for 3 turns", img: "https://png.pngtree.com/png-vector/20231116/ourmid/pngtree-elegant-golden-shield-png-image_10625519.png" },
      { title: "Free Lateral Move", desc: "Move as far as you want sideways", img: "https://cdn-icons-png.flaticon.com/512/10731/10731661.png" }
    ],
    [
      { title: "Trap!", desc: "You're stuck for a turn", img: null },
      { title: "Pitfall", desc: "Go back 2 spaces", img: null },
      { title: "Freeze", desc: "Miss next turn", img: null }
    ],
    [
      { title: "Heads!", desc: "Flipped a coin", img: "https://cdn-icons-png.flaticon.com/512/8012/8012840.png" },
      { title: "Tails!", desc: "Flipped a coin", img: "https://cdn-icons-png.flaticon.com/512/8012/8012840.png" },
    ],
    [
      { title: "Information", desc: "NULL", img: null }
    ]
  ];

  const buttons = document.querySelectorAll(".large-utility-button");

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const messages = popupSets[index];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];

      let html = "";
      if (randomMessage.img) {
        html += `<img src="${randomMessage.img}" alt="${randomMessage.title}" class="popup-image" />`;
      }
      html += `<strong>${randomMessage.title}</strong> - ${randomMessage.desc}`;

      popupText.innerHTML = html;
      popup.classList.remove("hidden");
    });
  });

  closePopupBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.add("hidden");
    }
  });
});
