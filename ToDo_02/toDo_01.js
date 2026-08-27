const moreText = document.getElementById("moreText");

const seeMore = document.getElementById("seeMore");

seeMore.addEventListener("click", function () {
  if (moreText.style.display === "none") {
    moreText.style.display = "inline";

    seeMore.innerText = " See Less";
  } else {
    moreText.style.display = "none";

    seeMore.innerText = " See More";
  }
});
