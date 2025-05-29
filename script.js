let balance = 0;
let boost = 1;

const balanceElem = document.getElementById("balance");
const clickBtn = document.getElementById("clickButton");
const audio = new Audio("click.mp3");

function updateBalance() {
  balanceElem.innerText = balance + " 💰";
}

clickBtn.addEventListener("click", () => {
  balance += boost;
  updateBalance();
  audio.currentTime = 0;
  audio.play();
});

// Магазин
const shopToggle = document.getElementById("shopToggle");
const shopModal = document.getElementById("shopModal");
const shopClose = document.getElementById("shopClose");

shopToggle.addEventListener("click", () => {
  shopModal.style.display = "block";
});

shopClose.addEventListener("click", () => {
  shopModal.style.display = "none";
});

// Вкладки
const tabs = document.querySelectorAll(".shop-tab");
const contents = document.querySelectorAll(".shop-tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    contents.forEach(c => c.style.display = "none");
    const target = document.getElementById(tab.dataset.tab);
    if (target) target.style.display = "block";
  });
});

// Бусты
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

