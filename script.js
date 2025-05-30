let balance = parseInt(localStorage.getItem("balance")) || 0;
let boost = parseInt(localStorage.getItem("boost")) || 1;
let autoclick = parseInt(localStorage.getItem("autoclick")) || 0;

const balanceElem = document.getElementById("balance");
const clickBtn = document.getElementById("clickButton");
const clickIcon = document.querySelector(".click-icon");
const audio = new Audio("click.mp3");

function updateBalance() {
  balanceElem.innerText = balance + " 💰";
  localStorage.setItem("balance", balance);
  localStorage.setItem("boost", boost);
  localStorage.setItem("autoclick", autoclick);
}

clickBtn.addEventListener("click", () => {
  clickIcon.classList.add("clicked");
  balance += boost;
  updateBalance();
  audio.currentTime = 0;
  audio.play();

  setTimeout(() => {
    clickIcon.classList.remove("clicked");
  }, 150);
});

function setupShopListeners() {
  document.querySelectorAll(".shop-item").forEach(item => {
    item.addEventListener("click", () => {
      const cost = parseInt(item.getAttribute("data-cost"));
      const power = parseInt(item.getAttribute("data-power"));
      if (balance >= cost) {
        balance -= cost;
        boost += power;
        updateBalance();
        alert(`✅ Куплен буст +${power} за ${cost} 💰`);
      } else {
        alert("❌ Недостаточно средств");
      }
    });
  });

  document.querySelectorAll(".autoclick-item").forEach(item => {
    item.addEventListener("click", () => {
      const cost = parseInt(item.getAttribute("data-cost"));
      const count = parseInt(item.getAttribute("data-count"));
      if (balance >= cost) {
        balance -= cost;
        autoclick += count;
        updateBalance();
        alert(`✅ Куплено ${count} автокликов за ${cost} 💰`);
      } else {
        alert("❌ Недостаточно средств");
      }
    });
  });
}

if (autoclick > 0) {
  setInterval(() => {
    balance += autoclick;
    updateBalance();
  }, 1000);
}

document.getElementById("openShop").addEventListener("click", () => {
  document.getElementById("shopModal").classList.remove("hidden");
});

document.getElementById("closeShop").addEventListener("click", () => {
  document.getElementById("shopModal").classList.add("hidden");
});

document.querySelectorAll(".shop-tab").forEach(button => {
  button.addEventListener("click", () => {
    const tab = button.dataset.tab;
    const content = document.getElementById("shopContent");
    content.innerHTML = "";

    if (tab === "boosts") {
      content.innerHTML = `
        <div class="shop-item" data-cost="10" data-power="1">+1 за 10 💰</div>
        <div class="shop-item" data-cost="50" data-power="5">+5 за 50 💰</div>
        <div class="shop-item" data-cost="150" data-power="15">+15 за 150 💰</div>
      `;
    } else if (tab === "autoclick") {
      content.innerHTML = `
        <div class="shop-item autoclick-item" data-cost="100" data-count="1">1 автоклик/сек за 100 💰</div>
        <div class="shop-item autoclick-item" data-cost="400" data-count="5">5 автокликов/сек за 400 💰</div>
      `;
    } else if (tab === "skins") {
      content.innerHTML = `
        <div class="shop-item">🔒 Скоро будут скины</div>
      `;
    }

    setupShopListeners();
  });
});

updateBalance();
