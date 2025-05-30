let balance = parseInt(localStorage.getItem("balance")) || 0;
let boost = parseInt(localStorage.getItem("boost")) || 1;
let autoclick = parseInt(localStorage.getItem("autoclick")) || 0;

const balanceElem = document.getElementById("balance");
const clickBtn = document.getElementById("clickButton");
const audio = new Audio("click.mp3");

function updateBalance() {
  balanceElem.innerText = balance;
  localStorage.setItem("balance", balance);
  localStorage.setItem("boost", boost);
  localStorage.setItem("autoclick", autoclick);
}

clickBtn.addEventListener("click", () => {
  balance += boost;
  updateBalance();
  audio.currentTime = 0;
  audio.play();
});

document.getElementById("openShop").addEventListener("click", () => {
  document.getElementById("shopModal").classList.remove("hidden");
  loadShop('infinite');
});

document.getElementById("closeShop").addEventListener("click", () => {
  document.getElementById("shopModal").classList.add("hidden");
});

document.querySelectorAll(".tab-buttons button").forEach(btn => {
  btn.addEventListener("click", () => {
    loadShop(btn.dataset.tab);
  });
});

function loadShop(type) {
  const container = document.getElementById("shopContent");
  container.innerHTML = "";
  let items = [];

  if (type === "infinite") {
    for (let i = 1; i <= 10; i++) {
      items.push({
        name: `+${i} клик`,
        cost: 200,
        power: i,
        type: "boost"
      });
    }
  } else if (type === "temporary") {
    for (let i = 1; i <= 10; i++) {
      items.push({
        name: `+${i} на 30 сек`,
        cost: 30 * i,
        power: i,
        duration: 30000,
        type: "temp"
      });
    }
  } else if (type === "autoclick") {
    for (let i = 5; i <= 50; i += 5) {
      items.push({
        name: `+${i} автоклик`,
        cost: 5000 * (i / 5),
        count: i,
        type: "auto"
      });
    }
  }

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "shop-item";
    div.innerText = `${item.name} — ${item.cost} 💰`;
    div.addEventListener("click", () => {
      if (balance < item.cost) {
        alert("❌ Недостаточно монет");
        return;
      }

      balance -= item.cost;

      if (item.type === "boost") {
        boost += item.power;
        alert(`✅ Куплен бесконечный буст +${item.power}`);
      } else if (item.type === "temp") {
        boost += item.power;
        alert(`✅ Куплен временный буст +${item.power} на 30 сек`);
        setTimeout(() => {
          boost -= item.power;
          updateBalance();
          alert(`⌛ Временный буст +${item.power} закончился`);
        }, item.duration);
      } else if (item.type === "auto") {
        autoclick += item.count;
        if (!window.autoStarted) {
          startAutoclick();
        }
        alert(`✅ Куплено +${item.count} автокликов`);
      }

      updateBalance();
    });
    container.appendChild(div);
  });
}

function startAutoclick() {
  window.autoStarted = true;
  setInterval(() => {
    balance += autoclick;
    updateBalance();
  }, 1000);
}

updateBalance();
if (autoclick > 0) startAutoclick();
