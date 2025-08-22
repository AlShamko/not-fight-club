document.addEventListener("DOMContentLoaded", () => {
    const screens = document.querySelectorAll(".screen");
    const nextBtn = document.querySelectorAll(".nextBtn");
    const restartBtn = document.querySelector(".restartBtn");
    const headerTitle = document.querySelector(".header__title");

    let current = 0;

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

    nextBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            if (current < screens.length - 1) {
                current++;
                showScreen(current);
            }
        });
    });

    restartBtn.addEventListener("click", () => {
        current = 0;
        showScreen(current);
    });


    showScreen(current);
});
