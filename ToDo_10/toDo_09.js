let lotteryBalls = document.querySelectorAll(".lottery-ball");

let drawButton = document.getElementById("drawButton");

let statusText = document.getElementById("statusText");


// Convert NodeList into Array
let convertBalls = Array.from(lotteryBalls);


// =====================================
// Lottery Settings
// =====================================

let totalTime = 2000;

let minNumber = 1;

let maxNumber = 99;


// =====================================
// Random Number Function
// =====================================

function randomNumber() {

  return Math.floor(
    Math.random() * (maxNumber - minNumber + 1)
  ) + minNumber;

}


// =====================================
// Start Lottery
// =====================================

drawButton.addEventListener("click", () => {

  // Disable button
  drawButton.disabled = true;

  // Change button text
  drawButton.innerHTML = "🎲 Drawing...";


  // Change status
  statusText.innerHTML =
    "Lucky numbers are being drawn...";


  // -----------------------------------
  // Start every ball
  // -----------------------------------

  convertBalls.forEach((ball) => {

    // Remove old classes
    ball.classList.remove("stopped");

    // Add running class
    ball.classList.add("running");

  });


  // -----------------------------------
  // Create counter for every ball
  // -----------------------------------

  convertBalls.forEach((ball, index) => {

    let numberElement =
      ball.querySelector(".number");


    // ---------------------------------
    // Random number counter
    // ---------------------------------

    let counterStop = setInterval(() => {

      let randomNumberValue = randomNumber();

      numberElement.innerHTML =
        String(randomNumberValue).padStart(2, "0");

    }, 70);


    // ---------------------------------
    // Stop each ball after 2 seconds
    // ---------------------------------

    setTimeout(() => {

      // Stop counter
      clearInterval(counterStop);


      // Generate final number
      let finalNumber = randomNumber();


      // Show final number
      numberElement.innerHTML =
        String(finalNumber).padStart(2, "0");


      // Remove running
      ball.classList.remove("running");


      // Add stopped
      ball.classList.add("stopped");


      // Update status
      statusText.innerHTML =
        `Ball ${index + 1} stopped — Lucky Number: ${String(finalNumber).padStart(2, "0")}`;


      // ---------------------------------
      // Last Ball
      // ---------------------------------

      if (index === convertBalls.length - 1) {

        setTimeout(() => {

          drawButton.disabled = false;

          drawButton.innerHTML =
            "🎟 Draw Again";

          statusText.innerHTML =
            "🎉 All lucky numbers have been selected!";

        }, 700);

      }

    }, (index + 1) * totalTime);

  });

});