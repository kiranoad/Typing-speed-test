const words =
  "Technology is changing the world in many ways People use smartphones computers and the internet every day These tools help us talk to friends study and even do our jobs Many companies now use technology to work faster and serve their customers better Schools also use online learning making it easier for students to study from anywhere However technology also has some problems Many people worry about their personal information being stolen online Cyber crime is increasing and hackers try to break into accounts This is why it is important to use strong passwords and be careful while using the internet Another big concern is jobs Many factories and offices now use machines and robots instead of people While this makes work faster it also means some people lose their jobs To solve this workers need to learn new skills so they can find different jobs in the future Social media has changed the way people communicate It helps us stay in touch with family and friends even if they live far away But too much time on social media can be harmful Some people feel lonely or compare their lives to others which can make them sad Also fake news spreads easily and many people believe things that are not true At the same time scientists are working on better ways to use energy Solar and wind power are becoming more common helping reduce pollution People are also trying to create better batteries to store energy for longer The future of technology is full of possibilities New inventions in space medicine and computers can make life better However we must use technology wisely to avoid problems and make sure it helps everyone.";

const wordArray = words.split(/\s+/);

function addClass(el, name) {
  el.className += " " + name;
}

function removeClass(el, name) {
  el.className = el.className.replace(name, "");
}

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  return wordArray[randomIndex];
}

function formatWord(word) {
  const letters = word.split("");
  if (letters.length === 0) {
    return;
  }
  return `<div class="word">
                <span class="letter">${letters.join(
                  '</span><span class="letter">')}</span><span class="letter">&nbsp</span>
            </div>`;
}

let timeStart = 10; // Timer starts from 10 seconds
let timerRunning = false; // Initial timer condition
let gameOver = false; // Timer over flag
let typedWords = 0;

function newGame() {
  // document.getElementById("words").innerHTML = ""; // Clear words
  for (let i = 0; i < 200; i++) {
    document.getElementById("words").innerHTML += formatWord(getRandomWord());
  }
  addClass(document.querySelector(".word"), "current");
  addClass(document.querySelector(".letter"), "current");
  timeStart = 10;
  timerRunning = false;
  gameOver = false;
  typedWords = 0;
  // document.getElementById("WPM").textContent = "WPM: 0"; // Reset WPM
}

document.getElementById("game").addEventListener("click", onClick);

document.getElementById("game").addEventListener("keydown", (ev) => {
  if (gameOver) return; // Stop typing when time is over

  if (!timerRunning) {
    startTimer();
    timerRunning = true;
  }

  const key = ev.key;
  if (key === "Shift") return;

  const currentLetter = document.querySelector(".letter.current");
  const currentWord = document.querySelector(".word.current");

  if (key === "Backspace") {
    const previousLetter = currentLetter.previousSibling;
    if (previousLetter && previousLetter.tagName === "SPAN") {
      removeClass(currentLetter, "current");
      addClass(previousLetter, "current");
      removeClass(previousLetter, "correct");
      removeClass(previousLetter, "incorrect");
    }
    return;
  }

  const expected = currentLetter.innerHTML;
  if (key === expected) {
    addClass(currentLetter, "correct");
  } else {
    addClass(currentLetter, "incorrect");
  }

  removeClass(currentLetter, "current");

  if (currentLetter.nextSibling && currentLetter.nextSibling.tagName === "SPAN") {
    addClass(currentLetter.nextSibling, "current");
  } else {
    // Word is completed
    if (!currentWord.querySelector(".incorrect")) {
      typedWords++; // Increment only if word is typed correctly
    }

    removeClass(currentWord, "current");

    if (currentWord.nextSibling) {
      addClass(currentWord.nextSibling, "current");
      const nextWordFirstLetter = currentWord.nextSibling.querySelector("span");
      addClass(nextWordFirstLetter, "current");
    }
  }
});

// Start Timer Function
function startTimer() {
  const timerElement = document.getElementById("timer");

  function updateTimer() {
    timerElement.textContent = `${timeStart}s`;
    timeStart--;

    if (timeStart < 0) {
      clearInterval(interval);
      timerElement.textContent = "00s";
      gameOver = true;
      document.getElementById("focus_error").textContent = "Time over";
      showResults();
    }
  }

  const interval = setInterval(updateTimer, 1000); // Update every second
}

// Show Results Function
function showResults() {
  const wpm = Math.round((typedWords * 60) / 10);

  console.log(wpm);
  document.getElementById("WPM").textContent = `WPM: ${wpm}`;
}

// Button Reload Active
document.getElementById("buttons").addEventListener("click", onClick);

function onClick() {
  console.log("Try Again clicked");
  newGame();
  

}
