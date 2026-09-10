const barsContainer = document.getElementById("barsContainer");

const ascendingBtn = document.getElementById("ascendingBtn");
const descendingBtn = document.getElementById("descendingBtn");
const resetBtn = document.getElementById("resetBtn");

const orderDisplay = document.getElementById("orderDisplay");
const status = document.getElementById("status");

// ----------------------------------------
// DATA
// ----------------------------------------

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let isSorting = false;

// ----------------------------------------
// BAR COLORS
// ----------------------------------------

const barClasses = {
  1: "bar-gradient-1",
  2: "bar-gradient-2",
  3: "bar-gradient-3",
  4: "bar-gradient-4",
  5: "bar-gradient-5",
  6: "bar-gradient-6",
  7: "bar-gradient-7",
  8: "bar-gradient-8",
  9: "bar-gradient-9",
};

// ----------------------------------------
// UTILITY
// ----------------------------------------

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ----------------------------------------
// SHUFFLE ARRAY
// ----------------------------------------

function shuffle(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}

// ----------------------------------------
// CREATE BARS
// ----------------------------------------

function renderBars() {
  barsContainer.innerHTML = "";

  numbers.forEach((number) => {
    const wrapper = document.createElement("div");

    wrapper.className =
      "flex-1 max-w-[70px] h-full flex flex-col items-center justify-end";

    const bar = document.createElement("div");

    bar.className = `
            bar
            ${barClasses[number]}
            w-full
            rounded-t-2xl
            relative
            flex
            items-start
            justify-center
            pt-3
            shadow-lg
        `;

    /*
            1 = 10%
            2 = 20%
            ...
            9 = 90%
        */

    bar.style.height = `${number * 10}%`;

    // Number label
    const numberLabel = document.createElement("span");

    numberLabel.className =
      "text-xs sm:text-sm md:text-base font-bold text-white drop-shadow-lg";

    numberLabel.textContent = number;

    // Bottom value
    const bottomLabel = document.createElement("span");

    bottomLabel.className =
      "absolute -bottom-8 text-xs font-medium text-slate-500";

    bottomLabel.textContent = number;

    bar.appendChild(numberLabel);
    bar.appendChild(bottomLabel);

    wrapper.appendChild(bar);

    barsContainer.appendChild(wrapper);
  });

  updateOrderDisplay();
}

// ----------------------------------------
// UPDATE ORDER TEXT
// ----------------------------------------

function updateOrderDisplay() {
  orderDisplay.textContent = numbers.join("  •  ");
}

// ----------------------------------------
// UPDATE STATUS
// ----------------------------------------

function setStatus(message, type = "ready") {
  let dotClass = "bg-cyan-400";

  if (type === "checking") {
    dotClass = "bg-yellow-400";
  }

  if (type === "sorting") {
    dotClass = "bg-purple-400";
  }

  if (type === "success") {
    dotClass = "bg-emerald-400";
  }

  status.innerHTML = `
        <span class="w-2 h-2 rounded-full ${dotClass}"></span>
        ${message}
    `;
}

// ----------------------------------------
// DISABLE / ENABLE BUTTONS
// ----------------------------------------

function setButtonsDisabled(disabled) {
  ascendingBtn.disabled = disabled;
  descendingBtn.disabled = disabled;
  resetBtn.disabled = disabled;
}

// ----------------------------------------
// GET CURRENT BARS
// ----------------------------------------

function getBars() {
  return [...barsContainer.querySelectorAll(".bar")];
}

// ----------------------------------------
// HIGHLIGHT TWO BARS
// ----------------------------------------

async function highlightBars(indexOne, indexTwo) {
  const bars = getBars();

  bars[indexOne].classList.add("checking");
  bars[indexTwo].classList.add("checking");

  setStatus(
    `Comparing ${numbers[indexOne]} and ${numbers[indexTwo]}`,
    "checking",
  );

  await sleep(450);
}

// ----------------------------------------
// REMOVE HIGHLIGHT
// ----------------------------------------

function removeHighlight(indexOne, indexTwo) {
  const bars = getBars();

  bars[indexOne]?.classList.remove("checking");
  bars[indexTwo]?.classList.remove("checking");
}

// ----------------------------------------
// SWAP ANIMATION
// ----------------------------------------

async function animateSwap(indexOne, indexTwo) {
  const bars = getBars();

  bars[indexOne].classList.add("swapping");
  bars[indexTwo].classList.add("swapping");

  setStatus(
    `Swapping ${numbers[indexOne]} and ${numbers[indexTwo]}`,
    "sorting",
  );

  await sleep(350);

  // Swap values
  [numbers[indexOne], numbers[indexTwo]] = [
    numbers[indexTwo],
    numbers[indexOne],
  ];

  // Re-render
  renderBars();

  await sleep(250);
}

// ----------------------------------------
// MARK SORTED BAR
// ----------------------------------------

function markSorted(index) {
  const bars = getBars();

  if (bars[index]) {
    bars[index].classList.add("sorted");
  }
}

// ----------------------------------------
// BUBBLE SORT ASCENDING
// ----------------------------------------

async function sortAscending() {
  if (isSorting) {
    return;
  }

  isSorting = true;

  setButtonsDisabled(true);

  setStatus("Sorting from small to large...", "sorting");

  const length = numbers.length;

  for (let i = 0; i < length; i++) {
    let swapped = false;

    for (let j = 0; j < length - i - 1; j++) {
      await highlightBars(j, j + 1);

      if (numbers[j] > numbers[j + 1]) {
        removeHighlight(j, j + 1);

        await animateSwap(j, j + 1);

        swapped = true;
      } else {
        removeHighlight(j, j + 1);

        await sleep(150);
      }
    }

    // Mark the last sorted item
    markSorted(length - i - 1);

    if (!swapped) {
      break;
    }
  }

  numbers = [...numbers].sort((a, b) => a - b);

  renderBars();

  // Animate final bars
  const bars = getBars();

  for (let i = 0; i < bars.length; i++) {
    bars[i].classList.add("sorted");

    await sleep(80);
  }

  setStatus("Sorted successfully!", "success");

  isSorting = false;

  setButtonsDisabled(false);
}

// ----------------------------------------
// BUBBLE SORT DESCENDING
// ----------------------------------------

async function sortDescending() {
  if (isSorting) {
    return;
  }

  isSorting = true;

  setButtonsDisabled(true);

  setStatus("Sorting from large to small...", "sorting");

  const length = numbers.length;

  for (let i = 0; i < length; i++) {
    let swapped = false;

    for (let j = 0; j < length - i - 1; j++) {
      await highlightBars(j, j + 1);

      if (numbers[j] < numbers[j + 1]) {
        removeHighlight(j, j + 1);

        await animateSwap(j, j + 1);

        swapped = true;
      } else {
        removeHighlight(j, j + 1);

        await sleep(150);
      }
    }

    markSorted(length - i - 1);

    if (!swapped) {
      break;
    }
  }

  numbers = [...numbers].sort((a, b) => b - a);

  renderBars();

  const bars = getBars();

  for (let i = 0; i < bars.length; i++) {
    bars[i].classList.add("sorted");

    await sleep(80);
  }

  setStatus("Sorted successfully!", "success");

  isSorting = false;

  setButtonsDisabled(false);
}

// ----------------------------------------
// RESET
// ----------------------------------------

function resetBars() {
  if (isSorting) {
    return;
  }

  numbers = shuffle(numbers);

  renderBars();

  setStatus("Randomized and ready", "ready");
}

// ----------------------------------------
// EVENT LISTENERS
// ----------------------------------------

ascendingBtn.addEventListener("click", sortAscending);

descendingBtn.addEventListener("click", sortDescending);

resetBtn.addEventListener("click", resetBars);

// ----------------------------------------
// INITIAL LOAD
// ----------------------------------------

numbers = shuffle(numbers);

renderBars();
