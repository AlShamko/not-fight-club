document.addEventListener("DOMContentLoaded", () => {
    const screens = document.querySelectorAll(".screen");
    const nextBtns = document.querySelectorAll(".nextBtn");
    const restartBtn = document.querySelector(".restartBtn");
    const headerTitle = document.querySelector(".header__title");
    const playerNameInput = document.getElementById("playerNameInput");
    const playerNameHeader = document.getElementById("playerNameHeader");

    const items = document.querySelectorAll(".item");

    let current = 0;
    let playerName = "";
    let selectedPlayer = null;     // alt выбранного игрока
    let selectedPlayerImg = "";    // путь к картинке выбранного игрока

    function showScreen(index) {
        screens.forEach((s, i) => {
            s.classList.toggle("active", i === index);
        });

        if (index > 0) {
            headerTitle.classList.add("visible");
        } else {
            headerTitle.classList.remove("visible");
        }

        // когда показываем экран боя — вставляем имя и аватар
        if (index === 3) {
            const fightName = document.getElementById("playerName");
            const fightAvatar = document.querySelector(".avatar__player");

            if (fightName) fightName.textContent = playerName || "Player";
            if (fightAvatar && selectedPlayerImg) {
                fightAvatar.innerHTML = `<img src="${selectedPlayerImg}" alt="${selectedPlayer}">`;
            }
        }
    }

    // Проверка input для разблокировки кнопки
    if (playerNameInput) {
        const btn = screens[1].querySelector(".nextBtn");
        btn.disabled = true;

        playerNameInput.addEventListener("input", () => {
            btn.disabled = playerNameInput.value.trim() === "";
        });
    }

    nextBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (current === 1) {
                const value = playerNameInput.value.trim();
                if (!value) {
                    alert("Пожалуйста, введите имя!");
                    return;
                }
                playerName = value;
                if (playerNameHeader) {
                    playerNameHeader.textContent = playerName;
                }
            }

            if (current < screens.length - 1) {
                current++;
                showScreen(current);
            }
        });
    });

    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            current = 0;
            playerName = "";
            selectedPlayer = null;
            selectedPlayerImg = "";
            playerNameInput.value = "";
            screens[1].querySelector(".nextBtn").disabled = true;

            if (playerNameHeader) {
                playerNameHeader.textContent = "";
            }

            items.forEach(i => i.classList.remove("selected", "dimmed"));

            showScreen(current);
        });
    }

    // выбор игрока
    if (items.length) {
        const nextBtnOnPlayer = screens[2].querySelector(".nextBtn");
        nextBtnOnPlayer.disabled = true;

        items.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();

                // если нажали на уже выбранного — снимаем выбор
                if (item.classList.contains("selected")) {
                    item.classList.remove("selected");
                    items.forEach(i => i.classList.remove("dimmed"));
                    selectedPlayer = null;
                    selectedPlayerImg = "";
                    nextBtnOnPlayer.disabled = true;
                    return;
                }

                // снимаем выделение со всех
                items.forEach(i => i.classList.remove("selected", "dimmed"));

                // выделяем нового
                item.classList.add("selected");
                const img = item.querySelector("img");
                selectedPlayer = img.alt;
                selectedPlayerImg = img.getAttribute("src");

                // остальные затемняем
                items.forEach(i => {
                    if (i !== item) i.classList.add("dimmed");
                });

                nextBtnOnPlayer.disabled = false;
            });
        });
    }

    showScreen(current);
});
