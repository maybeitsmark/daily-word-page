// DOM Elements
const time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name')

// Options
const showAmPm = true;

// Show Time
const showTime = () => {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';
  // 12hr Format
  hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
const addZero = (n) => {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
const setBgGreet = () => {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // Morning
    document.body.style.backgroundImage = "url('../images/Flat-Mountains-day.svg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage = "url('../images/Flat-Mountains-afternoon.svg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage = "url('../images/Flat-Mountains-night.svg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// Get Name from local storage
const getName = () => {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name to local storage
const setName = (e) => {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

// Run
showTime();
setBgGreet();
getName();

// Spinner logic
const loader = document.getElementById("loader");
const showLoader = () => {
  loader.className = "show";
};
const hideLoader = () => {
  loader.className = loader.className.replace("show", "");
}


// More DOM elements
const word = document.getElementById('word'),
    pronunciation = document.getElementById('pronunciation'),
    type = document.getElementById('type'),
    definition = document.getElementById('definition')

// Daily word fetch
const getDailyWord = async () => {
  showLoader();
  fetch('http://localhost:5000/daily-word')
  .then(res => res.json())
  .then((res) => {
    console.log(res);
    hideLoader();
    word.innerHTML = res.word;
    pronunciation.innerHTML = res.pronunciation;
    type.innerHTML = res.type;
    definition.innerHTML = res.definition;
  }).catch(err => console.error(err));
}

// Run
getDailyWord();


