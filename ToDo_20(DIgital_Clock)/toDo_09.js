const hourDots = document.getElementById("hourDots");
const minuteDots = document.getElementById("minuteDots");
const secondDots = document.getElementById("secondDots");

const calendarDate = document.getElementById("calendarDate");
const calendarDay = document.getElementById("calendarDay");

const clockModeButton = document.getElementById("clockModeButton");
const clockModeText = document.getElementById("clockModeText");

let is24HourMode = false;

function addLeadingZero(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

function createDots(totalDots, currentValue, stepAngle, dotClass) {
  let dots = "";
  for (let index = 1; index <= totalDots; index++) {
    const rotation = index * stepAngle;
    const activeClass = index === currentValue ? "active" : "";
    dots += `
      <div class="clockDot ${dotClass} ${activeClass}" style="transform: rotate(${rotation}deg)"></div>`;
  }
  return dots;
}

function updateClock() {
  const currentDate = new Date();

  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const currentSecond = currentDate.getSeconds();

  let displayHour;
  let amPm = "";

  if (is24HourMode) {
    displayHour = currentHour;
  } else {
    displayHour = currentHour % 12;

    if (displayHour === 0) {
      displayHour = 12;
    }
    amPm = currentHour >= 12 ? "PM" : "AM";
  }

  const hourClockValue =
    currentHour % 12 === 0
      ? 12
      : currentHour % 12;

  const hourDotsHtml = createDots(12, hourClockValue, 30, "hourDot");
  const minuteDotsHtml = createDots(60, currentMinute, 6, "minuteDot");
  const secondDotsHtml = createDots(60, currentSecond, 6, "secondDot");

  hourDots.innerHTML = `
    ${hourDotsHtml}
    <h2 class="clockTitle">
      ${addLeadingZero(displayHour)}
      <span>Hours</span>
    </h2>
  `;

  minuteDots.innerHTML = `
    ${minuteDotsHtml}
    <h2 class="clockTitle">
      ${addLeadingZero(currentMinute)}
      <span>Minutes</span>
    </h2>`;

  secondDots.innerHTML = `
    ${secondDotsHtml}
    ${
      is24HourMode
        ? ""
        : `<b class="amPmText">${amPm}</b>`
    }
    <h2 class="clockTitle">
      ${addLeadingZero(currentSecond)}
      <span>Seconds</span>
    </h2>
  `;
  updateCalendar(currentDate);
}

function updateCalendar(currentDate) {
  const day = addLeadingZero(currentDate.getDate());
  const month = addLeadingZero(currentDate.getMonth() + 1);
  const year = currentDate.getFullYear();

  calendarDate.textContent = `${day} : ${month} : ${year}`;

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  calendarDay.textContent = dayNames[currentDate.getDay()];
}

clockModeButton.addEventListener("click", () => {
  is24HourMode = !is24HourMode;
  if (is24HourMode) {
    clockModeText.textContent = "Switch to 12 Hour";
  } else {
    clockModeText.textContent = "Switch to 24 Hour";
  }
  updateClock();
});
updateClock();
setInterval(updateClock, 1000);