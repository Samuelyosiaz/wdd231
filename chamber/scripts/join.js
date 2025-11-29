const navbutton = document.querySelector('#nav-button');
const navbar = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navbar.classList.toggle('show');
});


/***** Copy Right ******/
const year = new Date().getFullYear();
const copyright = document.querySelector('#currentyear');
copyright.innerHTML = year;


const lastModified = document.querySelector('#lastModified');
lastModified.innerHTML = `Last Modified: ${document.lastModified}`;



// NP Membership
const npDialog = document.querySelector('#npDialog');
const openNp = document.querySelector('#openNp');
const closeNp = document.querySelector('#closeNp');

openNp.addEventListener('click', () => {
  npDialog.showModal();
});
closeNp.addEventListener('click', () => {
  npDialog.close();
});

// Bronze Membership
const bronzeDialog = document.querySelector('#bronzeDialog');
const openBronze = document.querySelector('#openBronze');
const closeBronze = document.querySelector('#closeBronze');

openBronze.addEventListener('click', () => {
  bronzeDialog.showModal();
});
closeBronze.addEventListener('click', () => {
  bronzeDialog.close();
});

// Silver Membership
const silverDialog = document.querySelector('#silverDialog');
const openSilver = document.querySelector('#openSilver');
const closeSilver = document.querySelector('#closeSilver');

openSilver.addEventListener('click', () => {
  silverDialog.showModal();
});
closeSilver.addEventListener('click', () => {
  silverDialog.close();
});

// Gold Membership
const goldDialog = document.querySelector('#goldDialog');
const openGold = document.querySelector('#openGold');
const closeGold = document.querySelector('#closeGold');

openGold.addEventListener('click', () => {
  goldDialog.showModal();
});
closeGold.addEventListener('click', () => {
  goldDialog.close();
});





/////TIME STAMP
document.addEventListener('DOMContentLoaded', () => {
  const tsInput = document.querySelector('#timestamp');
  
  // Set timestamp when page loads
  function setTimestamp() {
    const now = new Date();
    // Use toISOString for consistent format that works across browsers
    tsInput.value = now.toISOString();
  }
  
  setTimestamp();
  
  // Update timestamp when form is submitted
  const form = document.querySelector('form');
  form.addEventListener('submit', () => {
    setTimestamp();
  });
});
