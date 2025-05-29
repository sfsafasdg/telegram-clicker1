let balance = parseInt(localStorage.getItem("balance")) || 0;
let boost = parseInt(localStorage.getItem("boost")) || 1;

const balanceElem = document.getElementById("balance");
const clickBtn = document.getElementById("clickButton");
const audio = new Audio("click.mp3");

function updateBalance() {
  balanceElem.innerText = balance + " 💰";
  localStorage.setItem("balance", balance);
  localStorage.setItem("boost", boost);
}

clickBtn.addEventListener("click", () => {
  balance += boost;
  updateBalance();
  audio.currentTime = 0;
  audio.play();
});

// Навигация между экранами
function switchScreen(targetId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(targetId).classList.add('active');
}

document.getElementById("openShop").addEventListener("click", () => {
  switchScreen("shopScreen");
});

document.querySelectorAll(".shop-tab-btn, .back-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;
    switchScreen(target);
  });
});

// Покупка бустов
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

// Автоклики
document.querySelectorAll(".autoclick-item").forEach(item => {
  item.addEventListener("click", () => {
    const cost = parseInt(item.getAttribute("data-cost"));
    const count = parseInt(item.getAttribute("data-count"));
    if (balance >= cost) {
      balance -= cost;
      updateBalance();
      alert(`✅ Куплено ${count} автокликов`);
      setInterval(() => {
        balance += count;
        updateBalance();
      }, 1000);
    } else {
      alert("❌ Недостаточно средств");
    }
  });
});

updateBalance();
