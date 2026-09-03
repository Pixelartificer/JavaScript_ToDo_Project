// Texts to type
const texts = [
"MERN stack developer",
  "Creative Developer",
  "UI/UX Designer",
  "Problem Solver",
  "Tech Enthusiast",
  "Digital Creator",
  
];

// Colors for each letter
const colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E9",
  "#F8B500",
  "#FF6F61",
  "#6B5B95",
  "#88B04B",
  "#F7CAC9",
  "#92A8D1",
  "#955251",
  "#B565A7",
  "#009B77",
  "#DD4124",
];

// DOM elements
const textElement = document.getElementById("typewriter-text");

// Variables
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let timeoutId;

// Main typing function
function type() {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    // Typing mode
    if (charIndex < currentText.length) {
      const char = currentText[charIndex];
      const span = document.createElement("span");
      span.textContent = char;
      span.style.color = colors[Math.floor(Math.random() * colors.length)];
      textElement.appendChild(span);

      charIndex++;
      timeoutId = setTimeout(type, 100);
    } else {
      // Text complete, wait 2 seconds then delete
      isDeleting = true;
      timeoutId = setTimeout(type, 2000);
    }
  } else {
    // Deleting mode
    if (charIndex > 0) {
      textElement.removeChild(textElement.lastChild);
      charIndex--;
      timeoutId = setTimeout(type, 50);
    } else {
      // Delete complete, move to next text
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      timeoutId = setTimeout(type, 500);
    }
  }
}

// Start typing automatically
type();
