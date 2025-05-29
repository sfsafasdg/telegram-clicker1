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

// Магазин бустов
const shopItems = document.querySelectorAll(".shop-item");
shopItems.forEach(item => {
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

updateBalance();
