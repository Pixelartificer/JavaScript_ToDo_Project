let heading = document.querySelector(".heading");

// let text = heading.dataset.text.toUpperCase();
let text = heading.dataset.text;

let count = 0;

let isDeleting = false;

let colors = [
  "#22d3ee",
  "#a78bfa",
  "#f472b6",
  "#fb7185",
  "#facc15",
  "#4ade80",
  "#60a5fa",
  "#c084fc",
  "#2dd4bf",
  "#fb923c",

  "#67e8f9",
  "#c4b5fd",
  "#f9a8d4",
  "#fda4af",
  "#fde68a",
  "#86efac",
  "#93c5fd",
  "#d8b4fe",
  "#5eead4",
  "#fdba74",

  "#7dd3fc",
  "#ddd6fe",
  "#fbcfe8",
  "#fecdd3",
  "#fef08a",
  "#bbf7d0",
  "#bfdbfe",
  "#e9d5ff",
  "#99f6e4",
  "#fed7aa",

  "#38bdf8",
  "#8b5cf6",
  "#ec4899",
  "#fb7185",
  "#fbbf24",
  "#34d399",
  "#60a5fa",
  "#a855f7",
  "#14b8a6",
  "#f97316"
];

function typeWriter() {
  if (!isDeleting) {
    if (count < text.length) {
      let letter = text.charAt(count);

      let color = colors[count % colors.length];

      heading.innerHTML += `
        <span
          style="color: ${color};"
          class="
            inline-block
            transition-all
            duration-200
          "
        >
          ${letter === " " ? "&nbsp;" : letter}
        </span>
      `;

      count++;
    } else {
      isDeleting = true;
    }
  } else {
    if (count > 0) {
      count--;

      let letters = heading.querySelectorAll("span");

      letters[letters.length - 1].remove();
    } else {
      isDeleting = false;
    }
  }
}

setInterval(() => {
  typeWriter();
}, 200);
