document.addEventListener("DOMContentLoaded", () => {
    const screens = document.querySelectorAll(".screen");
    const nextBtn = document.querySelectorAll(".nextBtn");
    const restartBtn = document.querySelector(".restartBtn");
    const headerTitle = document.querySelector(".header__title");
    const playerNameInput = document.getElementById("playerNameInput");
    const playerNameHeader = document.getElementById("playerNameHeader");

    const items = document.querySelectorAll(".item");

    let current = 0;
    let playerName = "";
    let selectedPlayer = null;

    function showScreen(index) {
        screens.forEach((s, i) => {
            s.classList.toggle("active", i === index);
        });

        if (index > 0) {
            headerTitle.classList.add("visible");
        } else {
            headerTitle.classList.remove("visible");
        }
    }

    if (playerNameInput) {
        const btn = screens[1].querySelector(".nextBtn");
        btn.disabled = true;

        playerNameInput.addEventListener("input", () => {
            btn.disabled = playerNameInput.value.trim() === "";
        });
    }

    nextBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            if (current === 1) {
                const value = playerNameInput.value.trim();
                if (!value) {
                    alert("Your Name!!!!");
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
            playerNameInput.value = "";
            screens[1].querySelector(".nextBtn").disabled = true;

            if (playerNameHeader) {
                playerNameHeader.textContent = "";
            }


            items.forEach(i => i.classList.remove("selected", "dimmed"));

            showScreen(current);
        });
    }

    // choose players
    if (items.length) {
        const nextBtnOnPlayer = screens[2].querySelector(".nextBtn");
        nextBtnOnPlayer.disabled = true;

        items.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();


                if (item.classList.contains("selected")) {
                    item.classList.remove("selected");
                    items.forEach(i => i.classList.remove("dimmed"));
                    selectedPlayer = null;
                    nextBtnOnPlayer.disabled = true;
                    return;
                }

                items.forEach(i => i.classList.remove("selected", "dimmed"));


                item.classList.add("selected");
                selectedPlayer = item.querySelector("img").alt;


                items.forEach(i => {
                    if (i !== item) i.classList.add("dimmed");
                });

                nextBtnOnPlayer.disabled = false;
            });
        });
    }

    showScreen(current);
});
