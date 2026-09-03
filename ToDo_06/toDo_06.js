let counter01 = document.querySelectorAll(".counter01");
let convertcounter01 = Array.from(counter01);
let totalTime = 20000;

convertcounter01.map((item) => {
  let count = 0;
  let targetNumber = Number(item.dataset.number01);
  let counterSpeed = totalTime / targetNumber;

  function counterjs() {
    if (count < targetNumber) {
      count++;
      item.innerHTML = `${count}`;
      let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      item.style.color = randomColor;
      item.classList.remove("scale-110");
      setTimeout(() => {
        item.classList.add("scale-110");
      }, 50);
    } else {
      clearInterval(counterStop);
      item.style.color = "#fff";
      item.classList.remove("scale-110");
    }
    console.log(count);
  }

  let counterStop = setInterval(() => {
    counterjs();
  }, counterSpeed);
});
