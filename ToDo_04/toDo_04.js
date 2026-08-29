const buttons =
    document.querySelectorAll(".mode");

const currentMode =
    document.getElementById("currentMode");


buttons.forEach(function (button) {

    button.addEventListener("click", function () {

        /* ==========================
           যদি ইতিমধ্যে active হয়
        ========================== */

        if (button.classList.contains("active")) {

            button.classList.add("flipping");


            setTimeout(function () {

                button.classList.remove("flipping");

            }, 650);

            return;
        }


        /* ==========================
           সব button থেকে active remove
        ========================== */

        buttons.forEach(function (item) {

            item.classList.remove("active");

        });


        /* ==========================
           নতুন button active
        ========================== */

        button.classList.add("active");


        /* ==========================
           3D flip animation
        ========================== */

        button.classList.add("flipping");


        setTimeout(function () {

            button.classList.remove("flipping");

        }, 650);


        /* ==========================
           Current mode পরিবর্তন
        ========================== */

        const selectedMode =
            button.dataset.mode;

        currentMode.textContent =
            selectedMode;

    });

});