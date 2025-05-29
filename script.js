let balance = parseInt(localStorage.getItem("balance")) || 0;
let boost = parseInt(localStorage.getItem("boost")) || 1;
let autoclick = parseInt(localStorage.getItem("autoclick")) || 0;

const balanceElem = document.getElementById("balance");
const clickBtn = document.getElementById("clickButton");
const audio = new Audio("click.mp3");

function updateBalance() {
  balanceElem.innerText = balance + " 💰";
  localStorage.setItem("balance", balance);
  localStorage.setItem("boost", boost);
  localStorage.setItem("autoclick", autoclick);
}

clickBtn.addEventListener("click", (e) => {
  balance += boost;
  updateBalance();
  audio.currentTime = 0;
  audio.play();
  showCoinAnimation(e.clientX, e.clientY);
});

function showCoinAnimation(x, y) {
  const coin = document.createElement("div");
  coin.className = "coin";
  coin.style.left = `${x}px`;
  coin.style.top = `${y}px`;
  coin.innerText = "💰";

  document.getElementById("coin-animations").appendChild(coin);

  setTimeout(() => {
    coin.remove();
  }, 1000);
}

function activateTemporaryBoost(multiplier, seconds) {
  const originalBoost = boost;
  boost *= multiplier;
  updateBalance();
  alert(`🚀 Буст x${multiplier} активирован на ${seconds} сек!`);

  setTimeout(() => {
    boost = originalBoost;
    updateBalance();
    alert("⏱ Временный буст закончился!");
  }, seconds * 1000);
}

document.getElementById("openShop").addEventListener("click", () => {
  document.getElementById("shopModal").classList.remove("hidden");
  document.getElementById("shopContent").innerHTML = "";
  document.getElementById("shopMenu").style.display = "block";
  document.getElementById("shopTitle").innerText = "Магазин";
});

document.getElementById("closeShop").addEventListener("click", () => {
  document.getElementById("shopModal").classList.add("hidden");
});

document.querySelectorAll(".shop-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    const type = tab.dataset.tab;
    document.getElementById("shopMenu").style.display = "none";
    document.getElementById("shopTitle").innerText = tab.innerText;

    const shopContent = document.getElementById("shopContent");
    shopContent.innerHTML = "";

    if (type === "boosts") {
      [
        { name: "+1 клик", cost: 20, power: 1 },
        { name: "+5 клик", cost: 75, power: 5 },
        { name: "x2 на 30 сек", cost: 50, temp: true, multiplier: 2, time: 30 },
      ].forEach(item => {
        const el = document.createElement("div");
        el.className = "shop-item";
        el.innerText = `${item.name} — ${item.cost} 💰`;
        el.addEventListener("click", () => {
          if (balance >= item.cost) {
            balance -= item.cost;
            if (item.temp) {
              activateTemporaryBoost(item.multiplier, item.time);
            } else {
              boost += item.power;
              alert(`✅ Куплен буст: ${item.name}`);
            }
            updateBalance();
          } else {
            alert("❌ Недостаточно монет");
          }
        });
        shopContent.appendChild(el);
      });
    }

    if (type === "autoclick") {
      [
        { name: "1 автоклик", cost: 100, count: 1 },
        { name: "5 автокликов", cost: 400, count: 5 },
      ].forEach(item => {
        const el = document.createElement("div");
        el.className = "shop-item";
        el.innerText = `${item.name} — ${item.cost} 💰`;
        el.addEventListener("click", () => {
          if (balance >= item.cost) {
            balance -= item.cost;
            autoclick += item.count;
            alert(`✅ Куплено: ${item.name}`);
            updateBalance();
          } else {
            alert("❌ Недостаточно монет");
          }
        });
        shopContent.appendChild(el);
      });
    }

    if (type === "skins") {
      const el = document.createElement("div");
      el.className = "shop-item";
      el.innerText = "🧔 Новый скин (Coming soon)";
      el.addEventListener("click", () => alert("🔒 Скин пока недоступен"));
      shopContent.appendChild(el);
    }
  });
});

if (autoclick > 0) {
  setInterval(() => {
    balance += autoclick;
    updateBalance();
  }, 1000);
}

updateBalance();
