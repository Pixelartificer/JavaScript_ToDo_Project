let nameInput = document.getElementById("nameInput");

let nameCount = document.getElementById("nameCount");

let selectedName = document.getElementById("selectedName");

let pickButton = document.getElementById("pickButton");

let clearButton = document.getElementById("clearButton");

let errorMessage = document.getElementById("errorMessage");

let statusText = document.getElementById("statusText");

let pickerBox = document.getElementById("pickerBox");


// =====================================
// Update Name Count
// =====================================

nameInput.addEventListener("input", () => {

  let names = getNames();

  nameCount.innerHTML =
    `${names.length} ${names.length === 1 ? "Name" : "Names"}`;

});


// =====================================
// Get Names
// =====================================

function getNames() {

  let names = nameInput.value
    .split("\n")
    .map((name) => name.trim())
    .filter((name) => name !== "");

  return names;

}


// =====================================
// Random Name
// =====================================

function randomName(names) {

  let randomIndex =
    Math.floor(Math.random() * names.length);

  return names[randomIndex];

}


// =====================================
// PICK BUTTON
// =====================================

pickButton.addEventListener("click", () => {

  let names = getNames();


  // =================================
  // Validation
  // =================================

  if (names.length === 0) {

    errorMessage.classList.remove("hidden");

    statusText.innerHTML =
      "Please enter some names";

    return;

  }


  // Hide error
  errorMessage.classList.add("hidden");


  // Disable button
  pickButton.disabled = true;


  // Button text
  pickButton.innerHTML =
    "🎲 Picking...";


  // Status
  statusText.innerHTML =
    "Choosing a lucky name...";


  // =================================
  // Start Animation
  // =================================

  pickerBox.classList.add("running");

  selectedName.classList.remove("winner-animation");

  selectedName.classList.add("selected-running");


  // =================================
  // Name Counter
  // =================================

  let counterStop = setInterval(() => {

    let randomNameValue =
      randomName(names);

    selectedName.innerHTML =
      randomNameValue;

  }, 80);


  // =================================
  // Stop After 2 Seconds
  // =================================

  setTimeout(() => {

    // Stop counter
    clearInterval(counterStop);


    // Get final name
    let winner =
      randomName(names);


    // Show winner
    selectedName.innerHTML =
      winner;


    // Remove running animation
    selectedName.classList.remove(
      "selected-running"
    );

    pickerBox.classList.remove("running");


    // Winner animation
    selectedName.classList.add(
      "winner-animation"
    );


    // Update status
    statusText.innerHTML =
      "🎉 We have a winner!";


    // Change button
    pickButton.innerHTML =
      "🎲 Pick Again";


    // Enable button
    pickButton.disabled = false;


  }, 2000);

});


// =====================================
// CLEAR BUTTON
// =====================================

clearButton.addEventListener("click", () => {

  nameInput.value = "";

  selectedName.innerHTML = "?";

  nameCount.innerHTML = "0 Names";

  statusText.innerHTML =
    "Ready to pick";

  errorMessage.classList.add("hidden");

});