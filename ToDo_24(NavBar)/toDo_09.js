// ================= 1. BASIC MEGA MENU FUNCTIONS =================
const basicMenu = document.getElementById('basicMenu');
const basicArrowIcon = document.getElementById('basicArrowIcon');

function showBasicMenu() {
  basicMenu.classList.remove('hidden');
  basicMenu.classList.add('flex');
  basicArrowIcon.classList.add('rotate-180');
}

function hideBasicMenu() {
  basicMenu.classList.add('hidden');
  basicMenu.classList.remove('flex');
  basicArrowIcon.classList.remove('rotate-180');
}


// ================= 2. PREMIUM MEGA MENU & INDICATOR FUNCTIONS =================
const premiumNavContainer = document.getElementById('premiumNavContainer');
const activeIndicator = document.getElementById('activeIndicator');
const premiumMenu = document.getElementById('premiumMenu');
const premiumArrowIcon = document.getElementById('premiumArrowIcon');

// Function to move active indicator pill accurately
function moveIndicator(element) {
  const containerRect = premiumNavContainer.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  const leftPosition = elementRect.left - containerRect.left;
  const elementWidth = elementRect.width;

  activeIndicator.style.left = `${leftPosition}px`;
  activeIndicator.style.width = `${elementWidth}px`;
}

// Initial positioning on load
window.addEventListener('load', () => {
  const defaultItem = document.getElementById('pNavHome');
  if (defaultItem) {
    moveIndicator(defaultItem);
  }
});

// Re-align on window resize
window.addEventListener('resize', () => {
  const activeItem = premiumNavContainer.querySelector('.premium-nav-item.text-white');
  if (activeItem) {
    moveIndicator(activeItem);
  }
});

// Function to switch active link styling
function setActiveNav(elementId) {
  const targetElement = document.getElementById(elementId);
  if (!targetElement) return;

  const allItems = premiumNavContainer.querySelectorAll('.premium-nav-item');
  
  allItems.forEach(item => {
    item.classList.remove('text-white');
    item.classList.add('text-gray-600');
  });

  targetElement.classList.remove('text-gray-600');
  targetElement.classList.add('text-white');

  moveIndicator(targetElement);
}

// Show premium mega menu
function showPremiumMenu() {
  setActiveNav('pNavProducts');
  
  premiumMenu.classList.remove('hidden');
  premiumMenu.classList.add('flex');
  premiumArrowIcon.classList.add('rotate-180');
}

// Hide premium mega menu
function hidePremiumMenu() {
  premiumMenu.classList.add('hidden');
  premiumMenu.classList.remove('flex');
  premiumArrowIcon.classList.remove('rotate-180');
}