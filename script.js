document.addEventListener("DOMContentLoaded", () => {
  let balance = parseInt(localStorage.getItem("balance")) || 0;
  let boost = parseInt(localStorage.getItem("boost")) || 1;
  let autoclick = parseInt(localStorage.getItem("autoclick")) || 0;

  const balanceElem = document.getElementById("balance");
  const clickBtn = document.getElementById("clickButton");
  const audio = new Audio("click.mp3");

  // Обновляем отображение баланса и сохраняем в localStorage
  function updateBalance() {
    balanceElem.innerText = balance + " 💰";
    localStorage.setItem("balance", balance);
    localStorage.setItem("boost", boost);
    localStorage.setItem("autoclick", autoclick);
  }

  // Клик по основной кнопке
  clickBtn.addEventListener("click", () => {
    balance += boost;
    updateBalance();
    audio.currentTime = 0;
    audio.play();
  });

  // Работа с магазином
  const openShopBtn = document.getElementById("openShop");
  const shopModal = document.getElementById("shopModal");
  const closeShopBtn = document.getElementById("closeShop");
  const shopMenu = document.getElementById("shopMenu");
  const shopTitle = document.getElementById("shopTitle");
  const shopContent = document.getElementById("shopContent");

  // Объекты с товарами для каждого раздела магазина
  const boosts = [
    { name: "Улучшенный буст +1", cost: 10, power: 1, time: 30 }, // 30 сек буст
    { name: "Супер буст +5", cost: 50, power: 5, time: 60 }, // 60 сек
  ];

  const autoclicks = [
    { name: "Автоклик +1", cost: 20, count: 1 },
    { name: "Автоклик +5", cost: 90, count: 5 },
  ];

  const skins = [
    { name: "Классический скин", cost: 100 },
    { name: "Фиолетовый скин", cost: 300 },
  ];

  // Запускаем таймеры для временных бустов
  let activeBoostTimers = [];

  // Функция для отображения товаров
  function renderItems(type) {
    shopContent.innerHTML = "";
    let items = [];
    if (type === "boosts") items = boosts;
    else if (type === "autoclick") items = autoclicks;
    else if (type === "skins") items = skins;

    items.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("shop-item");

      if(type === "boosts") {
        div.innerText = `${item.name} — Цена: ${item.cost} 💰 (длительность: ${item.time} сек)`;
      } else if(type === "autoclick") {
        div.innerText = `${item.name} — Цена: ${item.cost} 💰`;
      } else if(type === "skins") {
        div.innerText = `${item.name} — Цена: ${item.cost} 💰`;
      }

      div.addEventListener("click", () => {
        if (balance < item.cost) {
          alert("❌ Недостаточно средств");
          return;
        }

        balance -= item.cost;
        if (type === "boosts") {
          // Добавляем буст временно
          boost += item.power;
          updateBalance();
          alert(`✅ Куплен буст +${item.power} на ${item.time} секунд`);

          // Таймер для отката буста
          const timerId = setTimeout(() => {
            boost -= item.power;
            updateBalance();
            activeBoostTimers = activeBoostTimers.filter(t => t !== timerId);
          }, item.time * 1000);
          activeBoostTimers.push(timerId);

        } else if (type === "autoclick") {
          autoclick += item.count;
          updateBalance();
          alert(`✅ Куплено ${item.count} автокликов`);
        } else if (type === "skins") {
          alert(`✅ Куплен скин "${item.name}" (пока только для красоты)`);
          // Тут можно добавить применение скина
        }
      });

      shopContent.appendChild(div);
    });
  }

  // Открыть магазин
  openShopBtn.addEventListener("click", () => {
    shopModal.classList.remove("hidden");
    shopMenu.style.display = "block";
    shopTitle.innerText = "Магазин";
    shopContent.innerHTML = "";
  });

  // Закрыть магазин
  closeShopBtn.addEventListener("click", () => {
    shopModal.classList.add("hidden");
  });

  // Переключение вкладок магазина
  document.querySelectorAll(".shop-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const tabName = tab.dataset.tab;
      shopMenu.style.display = "none";
      shopTitle.innerText = tab.innerText;
      renderItems(tabName);
    });
  });

  // Автоклик каждые 1 сек (если есть)
  if (autoclick > 0) {
    setInterval(() => {
      balance += autoclick;
      updateBalance();
    }, 1000);
  }

  updateBalance();

  // --- Анимация монет (простая) ---
  // Добавим при клике на кнопку рандомные монеты, падающие вниз

  clickBtn.addEventListener("click", () => {
    for(let i=0; i<5; i++) {
      createCoinAnimation();
    }
  });

  function createCoinAnimation() {
    const coin = document.createElement("div");
    coin.innerText = "💰";
    coin.style.position = "fixed";
    coin.style.left = (clickBtn.getBoundingClientRect().left + 75) + "px"; // центр иконки клика
    coin.style.top = (clickBtn.getBoundingClientRect().top + 50) + "px";
    coin.style.fontSize = "24px";
    coin.style.userSelect = "none";
    coin.style.zIndex = 1000;
    document.body.appendChild(coin);

    let xMove = (Math.random() - 0.5) * 100; // рандомное отклонение по X
    let yMove = -150 - Math.random() * 100; // движение вверх

    let start = null;
    function animate(timestamp) {
      if (!start) start = timestamp;
      let progress = timestamp - start;

      coin.style.transform = `translate(${xMove * (progress / 1000)}px, ${yMove * (progress / 1000)}px)`;
      coin.style.opacity = 1 - progress / 1000;

      if (progress < 1000) {
        requestAnimationFrame(animate);
      } else {
        coin.remove();
      }
    }
    requestAnimationFrame(animate);
  }
});
