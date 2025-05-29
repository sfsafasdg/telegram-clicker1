let balance = 0;
let boost = 1;
let autoClickers = 0;

const balanceElem = document.getElementById("balance");
const clickBtn = document.getElementById("clickButton");
const audio = new Audio("click.mp3");

const openShopBtn = document.getElementById("openShopBtn");
const shopOverlay = document.getElementById("shopOverlay");
const closeShopBtn = document.getElementById("closeShopBtn");

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

// Обновляем баланс на экране
function updateBalance() {
  balanceElem.innerText = balance + " 💰";
}

// Клик по кнопке
clickBtn.addEventListener("click", () => {
  balance += boost;
  updateBalance();
  audio.currentTime = 0;
  audio.play();
});

// Открытие магазина
openShopBtn.addEventListener("click", () => {
  shopOverlay.classList.remove("hidden");
});

// Закрытие магазина
closeShopBtn.addEventListener("click", () => {
  shopOverlay.classList.add("hidden");
});

// Переключение вкладок в магазине
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Активная кнопка
    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Показ нужного контента
    const tab = btn.getAttribute("data-tab");
    tabContents.forEach(tc => {
      if (tc.id === tab) {
        tc.classList.add("active");
      } else {
        tc.classList.remove("active");
      }
    });
  });
});

// Логика покупки в магазине
const shopItems = document.querySelectorAll(".shop-item");

shopItems.forEach(item => {
  item.addEventListener("click", () => {
    const cost = parseInt(item.getAttribute("data-cost"));
    const power = parseInt(item.getAttribute("data-power"));
    const parentTab = item.closest(".tab-content").id;

    if (balance >= cost) {
      balance -= cost;
      if (parentTab === "boosts") {
        boost += power;
        alert(`✅ Куплен буст +${power} к клику за ${cost} 💰`);
      } else if (parentTab === "autoclicks") {
        autoClickers += power;
        alert(`✅ Куплено +${power} автокликов в секунду за ${cost} 💰`);
      }
      updateBalance();
    } else {
      alert("❌ Недостаточно средств");
    }
  });
});

// Автоклики (каждую секунду добавляем баланс)
setInterval(() => {
  if (autoClickers > 0) {
    balance += autoClickers;
    updateBalance();
  }
}, 1000);

updateBalance();
