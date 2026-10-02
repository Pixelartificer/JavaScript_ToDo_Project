const marksInput = document.getElementById("marksInput");
const checkBtn = document.getElementById("checkBtn");

const result = document.getElementById("result");
const grade = document.getElementById("grade");
const message = document.getElementById("message");

checkBtn.addEventListener("click", () => {
  const marks = Number(marksInput.value);

  if (marks < 0 || marks > 100 || marksInput.value === "") {
    grade.textContent = "⚠️";
    message.textContent = "Please enter a valid mark between 0 and 100.";

    result.classList.remove("hidden");
    return;
  }

  // Nested Ternary Operator
  const resultData =
    marks >= 80
      ? { grade: "A+", message: "Excellent! Outstanding result. 🌟" }
      : marks >= 70
        ? { grade: "A", message: "Very good result! 👏" }
        : marks >= 60
          ? { grade: "B", message: "Good job! Keep improving. 👍" }
          : marks >= 50
            ? { grade: "C", message: "You passed. Keep working hard. 💪" }
            : marks >= 40
              ? { grade: "D", message: "You passed, but you can do better." }
              : {
                  grade: "F",
                  message: "You failed. Don't give up! Try again. ❤️",
                };

  grade.textContent = resultData.grade;
  message.textContent = resultData.message;

  result.classList.remove("hidden");
});
