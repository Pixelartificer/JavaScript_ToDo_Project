const hourDots = document.getElementById("hourDots");
const minuteDots = document.getElementById("minuteDots");
const secondDots = document.getElementById("secondDots");
const analogClock = document.getElementById("analogClock");

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

function renderAnalogClock(hours, minutes, seconds) {
  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = ((minutes + seconds / 60) / 60) * 360;
  const hourDeg = (((hours % 12) + minutes / 60) / 12) * 360;

  let ticksHtml = "";
  for (let i = 1; i <= 12; i++) {
    ticksHtml += `<div class="clockDot" style="transform: rotate(${i * 30}deg); background: rgba(255,255,255,0.25); height: 2px; width: 12px;"></div>`;
  }

  analogClock.innerHTML = `
    ${ticksHtml}
    <!-- Center Dot -->
    <div style="position: absolute; top: 50%; left: 50%; width: 12px; height: 12px; background: #38bdf8; border-radius: 50%; transform: translate(-50%, -50%); z-index: 20; box-shadow: 0 0 10px #38bdf8;"></div>
    
    <!-- Hour Hand -->
    <div class="analogHand" style="width: 5px; height: 28%; background: #c084fc; transform: translateX(-50%) rotate(${hourDeg}deg); box-shadow: 0 0 8px #c084fc;"></div>
    
    <!-- Minute Hand -->
    <div class="analogHand" style="width: 3.5px; height: 38%; background: #e879f9; transform: translateX(-50%) rotate(${minuteDeg}deg); box-shadow: 0 0 8px #e879f9;"></div>
    
    <!-- Second Hand -->
    <div class="analogHand" style="width: 2px; height: 44%; background: #38bdf8; transform: translateX(-50%) rotate(${secondDeg}deg); box-shadow: 0 0 10px #38bdf8;"></div>
    
    <div style="position: absolute; bottom: 18px; width: 100%; text-align: center; font-family: 'Poppins', sans-serif; font-size: 10px; color: #38bdf8; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; text-shadow: 0 0 5px #38bdf8;">Aiden</div>
  `;
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

  const hourClockValue = currentHour % 12 === 0 ? 12 : currentHour % 12;

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
    ${is24HourMode ? "" : `<b class="amPmText">${amPm}</b>`}
    <h2 class="clockTitle">
      ${addLeadingZero(currentSecond)}
      <span>Seconds</span>
    </h2>
  `;

  renderAnalogClock(currentHour, currentMinute, currentSecond);
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
    "Saturday",
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
