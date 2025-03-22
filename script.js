const words =
  "Technology is changing the world in many ways People use smartphones computers and the internet every day These tools help us talk to friends study and even do our jobs Many companies now use technology to work faster and serve their customers better Schools also use online learning making it easier for students to study from anywhere However technology also has some problems Many people worry about their personal information being stolen online Cyber crime is increasing and hackers try to break into accounts This is why it is important to use strong passwords and be careful while using the internet Another big concern is jobs Many factories and offices now use machines and robots instead of people While this makes work faster it also means some people lose their jobs To solve this workers need to learn new skills so they can find different jobs in the future Social media has changed the way people communicate It helps us stay in touch with family and friends even if they live far away But too much time on social media can be harmful Some people feel lonely or compare their lives to others which can make them sad Also fake news spreads easily and many people believe things that are not true At the same time scientists are working on better ways to use energy Solar and wind power are becoming more common helping reduce pollution People are also trying to create better batteries to store energy for longer The future of technology is full of possibilities New inventions in space medicine and computers can make life better However we must use technology wisely to avoid problems and make sure it helps everyone.";

const wordArray = words.split(/\s+/);

function addClass(el, name) {
  el.classList.add(name);
}

function removeClass(el, name) {
  el.classList.remove(name);
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

const TOTAL_TIMEER = 60

let timeStart; // Timer starts from 10 seconds
let timerRunning; // Initial timer condition
let gameOver; // Timer over flag
let correctWordsTyped;
let inCorrectWordsTyped;
let totalWordsTyped;
let curectLetter;
let totalLetter;



function reset() {
  timeStart = TOTAL_TIMEER;
  timerRunning = false;
  gameOver = false;
  correctWordsTyped= 0;
  inCorrectWordsTyped = 0;
  totalWordsTyped = 0;
  document.getElementById("focus_error").textContent = "Check Typing";
  const timerElement = document.getElementById("timer");
  document.getElementById("words").style.filter = 'blur(0)';

  timerElement.textContent = `${timeStart}s`;
}

window.addEventListener("load", reset);


function newGame() {
  // document.getElementById("words").innerHTML = ""; // Clear words
  document.getElementById("words").innerHTML = '';
  for (let i = 0; i < 100; i++) {
    document.getElementById("words").innerHTML += formatWord(getRandomWord());
  }
  addClass(document.querySelector(".word"), "current");
  addClass(document.querySelector(".letter"), "current");
  reset();
  // timeStart = 3;
  // timerRunning = false;
  // gameOver = false;
  // correctWordsTyped = 0;
  // totalWordsTyped = 0;
  // document.getElementById("WPM").textContent = "WPM: 0"; // Reset WPM
}

document.getElementById("game").addEventListener("click", onClickTyping);

document.getElementById("game").addEventListener("keydown", (ev) => {
  showResults();
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

  if (key === expected || (key === " " && expected === "&nbsp;")) {
    addClass(currentLetter, "correct");
  } else {
    addClass(currentLetter, "incorrect");
  }

  removeClass(currentLetter, "current");

  if (currentLetter.nextSibling && currentLetter.nextSibling.tagName === "SPAN") {
    addClass(currentLetter.nextSibling, "current");
  } else {
  const letters = currentWord.getElementsByClassName("letter");
  let isWordIncorrect = false;
  Array.from(letters).forEach(letter=>{
    if(Array.from(letter.classList).some(cl => cl ==="incorrect")){
      isWordIncorrect = true;
    }
  })
  // addClass(currentWord, "correct");
  if(isWordIncorrect === false){
    addClass(currentWord, "correctWord");
    // correctWordsTyped++;
  }
  else {
    addClass(currentWord, "incorrectWord");
  }
  // totalWordsTyped++;

    // Word is completed
    // if (!currentWord.querySelector(".incorrect")) {
    //   correctWordsTyped++; // Increment only if word is typed correctly
    // }

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
      document.getElementById("focus_error").style.display = 'block';
      document.getElementById("words").style.filter = 'blur(5px)';

      showResults();
    }
  }

  const interval = setInterval(updateTimer, 1000); // Update every second
}

function getData() {
  // const words = document.querySelector(".word");
  // if(!words){
  //   return;
  // }



  const incorrectWordEl = document.querySelectorAll(".word.incorrectWord")
  if(incorrectWordEl){
    inCorrectWordsTyped = Array.from(incorrectWordEl).length
    console.log("inCorrectWordsTypedL: ",incorrectWordEl,inCorrectWordsTyped);
  }
  
  const correctWordEl = document.querySelectorAll(".word.correctWord")
  if(correctWordEl){
    correctWordsTyped = Array.from(correctWordEl).length
    console.log("correctWordsTyped: ",correctWordEl,correctWordsTyped);
  }


  <i class="fas fa-star-of-david df  "></i>
  console.log({inCorrectWordsTyped, correctWordsTyped})
}

// Show Results Function
function showResults() {
  getData();
  const wpm = Math.floor((correctWordsTyped / (TOTAL_TIMEER - timeStart)) * 60);

  document.getElementById("WPM").textContent = `WPM: ${wpm}`;
  document.getElementById("currectWord").textContent = `CW: ${correctWordsTyped}`;
  document.getElementById("incurrectWord").textContent = `ICW: ${inCorrectWordsTyped}`;
}

// Button Reload Active
document.getElementById("tryAgian").addEventListener("click", onClickTryAgain);

function onClickTyping() {

  document.getElementById("focus_error").style.display = 'none';
  document.getElementById("words").style.filter = 'blur(0)';

  newGame();
}

function onClickTryAgain() {
  reset()
  newGame();
}










// displayWords = ["the", "sdf"];
// typredWord = "The sde fgfdg"





// render(){

// }