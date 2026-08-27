//////////////////////////////////////////////////////////
// GOALKEEPER
//////////////////////////////////////////////////////////

const playerImage = document.getElementById("playerImage");

const leftArrow = document.getElementById("leftArrow");

const rightArrow = document.getElementById("rightArrow");

const players = [
  "./Image/G_David_Raya.png",

  "./Image/G_Joan_Garcia.png",

  "./Image/G_Unai_Simon.png",
];

let currentPlayer = 0;

// Right Arrow

rightArrow.addEventListener("click", function () {
  currentPlayer++;

  if (currentPlayer >= players.length) {
    currentPlayer = 0;
  }

  playerImage.src = players[currentPlayer];
});

// Left Arrow

leftArrow.addEventListener("click", function () {
  currentPlayer--;

  if (currentPlayer < 0) {
    currentPlayer = players.length - 1;
  }

  playerImage.src = players[currentPlayer];
});

//////////////////////////////////////////////////////////
// DEFENDER 01
//////////////////////////////////////////////////////////

const playerImage01 = document.getElementById("playerImage01");

const leftArrow01 = document.getElementById("leftArrow01");

const rightArrow01 = document.getElementById("rightArrow01");

const players01 = [
  "./Image/D_Alex_Grimaldo.png",

  "./Image/D_Aymeric_Laporte.png",

  "./Image/D_Eric_Garcia.png",

  "./Image/D_Mar_Cucurella.png",

  "./Image/D_Marc_Pubill.png",

  "./Image/D_Marcos_Llorente.png",

  "./Image/D_Pedro_Porro.png",
];

let currentPlayer01 = 0;

// Right Arrow

rightArrow01.addEventListener("click", function () {
  currentPlayer01++;

  if (currentPlayer01 >= players01.length) {
    currentPlayer01 = 0;
  }

  playerImage01.src = players01[currentPlayer01];
});

// Left Arrow

leftArrow01.addEventListener("click", function () {
  currentPlayer01--;

  if (currentPlayer01 < 0) {
    currentPlayer01 = players01.length - 1;
  }

  playerImage01.src = players01[currentPlayer01];
});

//////////////////////////////////////////////////////////
// DEFENDER 02
//////////////////////////////////////////////////////////

const playerImage02 = document.getElementById("playerImage02");

const leftArrow02 = document.getElementById("leftArrow02");

const rightArrow02 = document.getElementById("rightArrow02");

const players02 = [
  "./Image/D_Alex_Grimaldo.png",
  "./Image/D_Aymeric_Laporte.png",
  "./Image/D_Eric_Garcia.png",
  "./Image/D_Mar_Cucurella.png",
  "./Image/D_Marc_Pubill.png",
  "./Image/D_Marcos_Llorente.png",
  "./Image/D_Pedro_Porro.png",
];

let currentPlayer02 = 0;

// Right Arrow

rightArrow02.addEventListener("click", function () {
  currentPlayer02++;

  if (currentPlayer02 >= players02.length) {
    currentPlayer02 = 0;
  }

  playerImage02.src = players02[currentPlayer02];
});

// Left Arrow

leftArrow02.addEventListener("click", function () {
  currentPlayer02--;

  if (currentPlayer02 < 0) {
    currentPlayer02 = players02.length - 1;
  }

  playerImage02.src = players02[currentPlayer02];
});

//////////////////////////////////////////////////////////
// DEFENDER 03
//////////////////////////////////////////////////////////

const playerImage03 = document.getElementById("playerImage03");

const leftArrow03 = document.getElementById("leftArrow03");

const rightArrow03 = document.getElementById("rightArrow03");

const players03 = [
  "./Image/D_Alex_Grimaldo.png",
  "./Image/D_Aymeric_Laporte.png",
  "./Image/D_Eric_Garcia.png",
  "./Image/D_Mar_Cucurella.png",
  "./Image/D_Marc_Pubill.png",
  "./Image/D_Marcos_Llorente.png",
  "./Image/D_Pedro_Porro.png",
];

let currentPlayer03 = 0;

// Right Arrow

rightArrow03.addEventListener("click", function () {
  currentPlayer03++;

  if (currentPlayer03 >= players03.length) {
    currentPlayer03 = 0;
  }

  playerImage03.src = players03[currentPlayer03];
});

// Left Arrow

leftArrow03.addEventListener("click", function () {
  currentPlayer03--;

  if (currentPlayer03 < 0) {
    currentPlayer03 = players03.length - 1;
  }

  playerImage03.src = players03[currentPlayer03];
});

//////////////////////////////////////////////////////////
// DEFENDER 04
//////////////////////////////////////////////////////////

const playerImage04 = document.getElementById("playerImage04");

const leftArrow04 = document.getElementById("leftArrow04");

const rightArrow04 = document.getElementById("rightArrow04");

const players04 = [
  "./Image/D_Alex_Grimaldo.png",
  "./Image/D_Aymeric_Laporte.png",
  "./Image/D_Eric_Garcia.png",
  "./Image/D_Mar_Cucurella.png",
  "./Image/D_Marc_Pubill.png",
  "./Image/D_Marcos_Llorente.png",
  "./Image/D_Pedro_Porro.png",
];

let currentPlayer04 = 0;

// Right Arrow

rightArrow04.addEventListener("click", function () {
  currentPlayer04++;

  if (currentPlayer04 >= players04.length) {
    currentPlayer04 = 0;
  }

  playerImage04.src = players04[currentPlayer04];
});

// Left Arrow

leftArrow04.addEventListener("click", function () {
  currentPlayer04--;

  if (currentPlayer04 < 0) {
    currentPlayer04 = players04.length - 1;
  }

  playerImage04.src = players04[currentPlayer04];
});

//////////////////////////////////////////////////////////
// MIDFIELDER 01
//////////////////////////////////////////////////////////

const playerImage05 = document.getElementById("playerImage05");

const leftArrow05 = document.getElementById("leftArrow05");

const rightArrow05 = document.getElementById("rightArrow05");

const players05 = [
  "./Image/M_Alex_Baena.png",
  "./Image/M_Fabian_Ruiz.png",
  "./Image/M_Gavi.png",
  "./Image/M_Martin_Zubimendi.png",
  "./Image/M_Mikel_Merion.png",
  "./Image/M_Pau_Cubarsi.png",
  "./Image/M_Pedri.png",
  "./Image/M_Rodri.png",
];

let currentPlayer05 = 0;

// Right Arrow

rightArrow05.addEventListener("click", function () {
  currentPlayer05++;

  if (currentPlayer05 >= players05.length) {
    currentPlayer05 = 0;
  }

  playerImage05.src = players05[currentPlayer05];
});

// Left Arrow

leftArrow05.addEventListener("click", function () {
  currentPlayer05--;

  if (currentPlayer05 < 0) {
    currentPlayer05 = players05.length - 1;
  }

  playerImage05.src = players05[currentPlayer05];
});

//////////////////////////////////////////////////////////
// MIDFIELDER 02
//////////////////////////////////////////////////////////

const playerImage06 = document.getElementById("playerImage06");

const leftArrow06 = document.getElementById("leftArrow06");

const rightArrow06 = document.getElementById("rightArrow06");

const players06 = [
  "./Image/M_Alex_Baena.png",
  "./Image/M_Fabian_Ruiz.png",
  "./Image/M_Gavi.png",
  "./Image/M_Martin_Zubimendi.png",
  "./Image/M_Mikel_Merion.png",
  "./Image/M_Pau_Cubarsi.png",
  "./Image/M_Pedri.png",
  "./Image/M_Rodri.png",
];

let currentPlayer06 = 0;

// Right Arrow

rightArrow06.addEventListener("click", function () {
  currentPlayer06++;

  if (currentPlayer06 >= players06.length) {
    currentPlayer06 = 0;
  }

  playerImage06.src = players06[currentPlayer06];
});

// Left Arrow

leftArrow06.addEventListener("click", function () {
  currentPlayer06--;

  if (currentPlayer06 < 0) {
    currentPlayer06 = players06.length - 1;
  }

  playerImage06.src = players06[currentPlayer06];
});

//////////////////////////////////////////////////////////
// MIDFIELDER 03
//////////////////////////////////////////////////////////

const playerImage07 = document.getElementById("playerImage07");

const leftArrow07 = document.getElementById("leftArrow07");

const rightArrow07 = document.getElementById("rightArrow07");

const players07 = [
  "./Image/M_Alex_Baena.png",
  "./Image/M_Fabian_Ruiz.png",
  "./Image/M_Gavi.png",
  "./Image/M_Martin_Zubimendi.png",
  "./Image/M_Mikel_Merion.png",
  "./Image/M_Pau_Cubarsi.png",
  "./Image/M_Pedri.png",
  "./Image/M_Rodri.png",
];

let currentPlayer07 = 0;

// Right Arrow

rightArrow07.addEventListener("click", function () {
  currentPlayer07++;

  if (currentPlayer07 >= players07.length) {
    currentPlayer07 = 0;
  }

  playerImage07.src = players07[currentPlayer07];
});

// Left Arrow

leftArrow07.addEventListener("click", function () {
  currentPlayer07--;

  if (currentPlayer07 < 0) {
    currentPlayer07 = players07.length - 1;
  }

  playerImage07.src = players07[currentPlayer07];
});

//////////////////////////////////////////////////////////
// FORWARD 01
//////////////////////////////////////////////////////////

const playerImage08 = document.getElementById("playerImage08");

const leftArrow08 = document.getElementById("leftArrow08");

const rightArrow08 = document.getElementById("rightArrow08");

const players08 = [
  "./Image/F_Borja_Iglesias.png",
  "./Image/F_Dani_Olmo.png",
  "./Image/F_Ferran_Torres.png",
  "./Image/F_Lamin_Yamal.png",
  "./Image/F_Mikel_Oyarzabal.png",
  "./Image/F_Pino_Yeremy.png",
  "./Image/F_Victor_Munoz.png",
];

let currentPlayer08 = 0;

// Right Arrow

rightArrow08.addEventListener("click", function () {
  currentPlayer08++;

  if (currentPlayer08 >= players08.length) {
    currentPlayer08 = 0;
  }

  playerImage08.src = players08[currentPlayer08];
});

// Left Arrow

leftArrow08.addEventListener("click", function () {
  currentPlayer08--;

  if (currentPlayer08 < 0) {
    currentPlayer08 = players08.length - 1;
  }

  playerImage08.src = players08[currentPlayer08];
});

//////////////////////////////////////////////////////////
// FORWARD 02
//////////////////////////////////////////////////////////

const playerImage09 = document.getElementById("playerImage09");

const leftArrow09 = document.getElementById("leftArrow09");

const rightArrow09 = document.getElementById("rightArrow09");

const players09 = [
  "./Image/F_Borja_Iglesias.png",
  "./Image/F_Dani_Olmo.png",
  "./Image/F_Ferran_Torres.png",
  "./Image/F_Lamin_Yamal.png",
  "./Image/F_Mikel_Oyarzabal.png",
  "./Image/F_Pino_Yeremy.png",
  "./Image/F_Victor_Munoz.png",
];

let currentPlayer09 = 0;

// Right Arrow

rightArrow09.addEventListener("click", function () {
  currentPlayer09++;

  if (currentPlayer09 >= players09.length) {
    currentPlayer09 = 0;
  }

  playerImage09.src = players09[currentPlayer09];
});

// Left Arrow

leftArrow09.addEventListener("click", function () {
  currentPlayer09--;

  if (currentPlayer09 < 0) {
    currentPlayer09 = players09.length - 1;
  }

  playerImage09.src = players09[currentPlayer09];
});

//////////////////////////////////////////////////////////
// FORWARD 03
//////////////////////////////////////////////////////////

const playerImage10 = document.getElementById("playerImage10");

const leftArrow10 = document.getElementById("leftArrow10");

const rightArrow10 = document.getElementById("rightArrow10");

const players10 = [
  "./Image/F_Borja_Iglesias.png",
  "./Image/F_Dani_Olmo.png",
  "./Image/F_Ferran_Torres.png",
  "./Image/F_Lamin_Yamal.png",
  "./Image/F_Mikel_Oyarzabal.png",
  "./Image/F_Pino_Yeremy.png",
  "./Image/F_Victor_Munoz.png",
];

let currentPlayer10 = 0;

// Right Arrow

rightArrow10.addEventListener("click", function () {
  currentPlayer10++;

  if (currentPlayer10 >= players10.length) {
    currentPlayer10 = 0;
  }

  playerImage10.src = players10[currentPlayer10];
});

// Left Arrow

leftArrow10.addEventListener("click", function () {
  currentPlayer10--;

  if (currentPlayer10 < 0) {
    currentPlayer10 = players10.length - 1;
  }

  playerImage10.src = players10[currentPlayer10];
});
