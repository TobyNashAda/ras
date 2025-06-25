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
      { title: "Lateral Dash", desc: "Move as far as you want sideways", img: "https://cdn-icons-png.flaticon.com/512/10731/10731661.png" },
      { title: "Sandstorm", desc: "Moves everyone down one except you", img: "https://img.pikbest.com/origin/09/24/99/74jpIkbEsTkub.png!sw800" },
      { title: "Snake Bite", desc: "Removes a powerup from a player - Keep for as long as you want", img: "https://images.vexels.com/media/users/3/350720/isolated/preview/14e5d6e96599e8ec03e3c417c1cf7f4e-snake-on-skull.png" }
    ],
    [
      { title: "Place on any tile or other players", desc: "Stuck for 1 turn", img: "https://magipik.com/_next/image?url=https%3A%2F%2Fmedia.magipik.com%2Fsample%2Fdata%2Fpreview%2Fthumbnail%2Fanimal-traps-mouse-trap-metal-bear-trap-butterfly-net-isolated-hunting-catching-cruelty-809847.png&w=1500&q=75" },
      { title: "Place on any tile or other players", desc: "Stuck for 2 turns", img: "https://magipik.com/_next/image?url=https%3A%2F%2Fmedia.magipik.com%2Fsample%2Fdata%2Fpreview%2Fthumbnail%2Fanimal-traps-mouse-trap-metal-bear-trap-butterfly-net-isolated-hunting-catching-cruelty-809847.png&w=1500&q=75" },
      { title: "Place on any tile or other players", desc: "Stuck for 3 turns", img: "https://magipik.com/_next/image?url=https%3A%2F%2Fmedia.magipik.com%2Fsample%2Fdata%2Fpreview%2Fthumbnail%2Fanimal-traps-mouse-trap-metal-bear-trap-butterfly-net-isolated-hunting-catching-cruelty-809847.png&w=1500&q=75" }
    ],
    [
      { title: "Heads!", desc: "Flipped a coin", img: "https://cdn-icons-png.flaticon.com/512/8012/8012840.png" },
      { title: "Tails!", desc: "Flipped a coin", img: "https://cdn-icons-png.flaticon.com/512/8012/8012840.png" }
    ],
    [
      { title: "You may go", desc: "ONE tile, above or laterally", img: 'https://static.vecteezy.com/system/resources/previews/027/388/523/non_2x/white-face-cube-dot-of-game-dice-png.png' },
      { title: "You may go up to", desc: "TWO tile, above or laterally", img: 'https://opengameart.org/sites/default/files/side_2_pips.png' },
      { title: "You may go up to", desc: "THREE tile, above or laterally", img: 'https://opengameart.org/sites/default/files/side_3_pips.png' }
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
