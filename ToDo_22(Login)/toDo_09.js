// Password Hide / Show Toggle Function (Video Logic)
function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);
  
  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

// 3D Card Flip Function
function flipCard() {
  const cardInner = document.getElementById("cardInner");
  cardInner.classList.toggle("[transform:rotateY(180deg)]");
}