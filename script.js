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

clickBtn.addEventListener("click", () => {
  balance += boost;
  updateBalance();
  audio.currentTime = 0;
  audio.play();
});

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

if (autoclick > 0) {
  setInterval(() => {
    balance += autoclick;
    updateBalance();
  }, 1000);
}

document.getElementById("openShopButton").addEventListener("click", () => {
  document.getElementById("shop").style.display = "block";
});

document.getElementById("backToMain").addEventListener("click", () => {
  document.getElementById("shop").style.display = "none";
  document.querySelectorAll(".shop-tab-content").forEach(el => el.style.display = "none");
});

document.querySelectorAll(".shop-tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".shop-tab-content").forEach(tab => tab.style.display = "none");
    document.getElementById(button.dataset.tab).style.display = "block";
  });
});

updateBalance();
