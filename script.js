let balance = 0;
let boost = 1;
let autoClicks = 0;

const balanceElem = document.getElementById("balance");
const clickBtn = document.getElementById("clickButton");
const audio = new Audio("click.mp3");
const shopToggle = document.getElementById("shopToggle");
const shopModal = document.getElementById("shopModal");
const closeShop = document.getElementById("closeShop");

function updateBalance() {
  balanceElem.innerText = balance + " 💰";
}

clickBtn.addEventListener("click", () => {
  balance += boost;
  updateBalance();
  audio.currentTime = 0;
  audio.play();
});

// Автоклики
setInterval(() => {
  balance += autoClicks;
  updateBalance();
}, 1000);

// Открытие/закрытие магазина
shopToggle.addEventListener("click", () => {
  shopModal.style.display = "block";
});

closeShop.addEventListener("click", () => {
  shopModal.style.display = "none";
});

// Вкладки
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabContents.forEach(content => (content.style.display = "none"));
    const tabId = tab.dataset.tab;
    document.getElementById(tabId).style.display = "block";
  });
});

// Покупка бустов и автокликов
const shopItems = document.querySelectorAll(".shop-item");
shopItems.forEach(item => {
  item.addEventListener("click", () => {
    const cost = parseInt(item.dataset.cost);
    if (balance < cost) {
      alert("❌ Недостаточно средств");
      return;
    }

    if (item.dataset.power) {
      const power = parseInt(item.dataset.power);
      boost += power;
      balance -= cost;
      alert(`✅ Куплен буст +${power} за ${cost} 💰`);
    } else if (item.dataset.autoclick) {
      const ac = parseInt(item.dataset.autoclick);
      autoClicks += ac;
      balance -= cost;
      alert(`✅ Куплено ${ac} автокликов за ${cost} 💰`);
    }

    updateBalance();
  });
});

updateBalance();
