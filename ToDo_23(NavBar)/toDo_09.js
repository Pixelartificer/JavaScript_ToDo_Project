// ================= 1. BASIC DROPDOWN FUNCTIONS =================
const basicMenu = document.getElementById('basicMenu');
const basicArrowIcon = document.getElementById('basicArrowIcon');

function showBasicDropdown() {
  basicMenu.classList.remove('hidden');
  basicMenu.classList.add('flex');
  basicArrowIcon.classList.add('rotate-180');
}

function hideBasicDropdown() {
  basicMenu.classList.add('hidden');
  basicMenu.classList.remove('flex');
  basicArrowIcon.classList.remove('rotate-180');
}


// ================= 2. PREMIUM DROPDOWN & INDICATOR FUNCTIONS =================
const premiumNavContainer = document.getElementById('premiumNavContainer');
const activeIndicator = document.getElementById('activeIndicator');
const premiumMenu = document.getElementById('premiumMenu');
const premiumArrowIcon = document.getElementById('premiumArrowIcon');

// Move active indicator pill precisely
function moveIndicator(element) {
  const containerRect = premiumNavContainer.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  const leftPosition = elementRect.left - containerRect.left;
  const elementWidth = elementRect.width;

  activeIndicator.style.left = `${leftPosition}px`;
  activeIndicator.style.width = `${elementWidth}px`;
}

// Initialize active position on window load
window.addEventListener('load', () => {
  const defaultItem = document.getElementById('pNavHome');
  if (defaultItem) {
    moveIndicator(defaultItem);
  }
});

// Window resize handler to maintain exact alignment
window.addEventListener('resize', () => {
  const activeItem = premiumNavContainer.querySelector('.premium-nav-item.text-white');
  if (activeItem) {
    moveIndicator(activeItem);
  }
});

// Handle active state class switching
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

// Show premium dropdown
function showPremiumDropdown() {
  setActiveNav('pNavServices');
  
  premiumMenu.classList.remove('hidden');
  premiumMenu.classList.add('flex');
  premiumArrowIcon.classList.add('rotate-180');
}

// Hide premium dropdown
function hidePremiumDropdown() {
  premiumMenu.classList.add('hidden');
  premiumMenu.classList.remove('flex');
  premiumArrowIcon.classList.remove('rotate-180');
}