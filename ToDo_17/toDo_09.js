const marksInput = document.getElementById("marksInput");
const checkBtn = document.getElementById("checkBtn");

const result = document.getElementById("result");
const grade = document.getElementById("grade");
const message = document.getElementById("message");

checkBtn.addEventListener("click", () => {
  const marks = Number(marksInput.value);

  // Validate input
  if (marksInput.value === "" || marks < 0 || marks > 100) {
    grade.textContent = "⚠️";
    message.textContent = "Please enter a valid mark between 0 and 100.";

    result.classList.remove("hidden");

    return;
  }

  const range = Math.floor(marks / 10);

  let gradeText;
  let messageText;

  switch (range) {
    case 10:
    case 9:
    case 8:
      gradeText = "A+";
      messageText = "Excellent! Outstanding result. 🌟";
      break;

    case 7:
      gradeText = "A";
      messageText = "Very good result! 👏";
      break;

    case 6:
      gradeText = "B";
      messageText = "Good job! Keep improving. 👍";
      break;

    case 5:
      gradeText = "C";
      messageText = "You passed. Keep working hard. 💪";
      break;

    case 4:
      gradeText = "D";
      messageText = "You passed, but you can do better.";
      break;

    default:
      gradeText = "F";
      messageText = "You failed. Don't give up! Try again. ❤️";
  }

  grade.textContent = gradeText;
  message.textContent = messageText;

  result.classList.remove("hidden");
});
