const words = "Technology is changing the world in many ways People use smartphones computers and the internet every day These tools help us talk to friends study and even do our jobs Many companies now use technology to work faster and serve their customers better Schools also use online learning making it easier for students to study from anywhere However technology also has some problems Many people worry about their personal information being stolen online Cyber crime is increasing and hackers try to break into accounts This is why it is important to use strong passwords and be careful while using the internet Another big concern is jobs Many factories and offices now use machines and robots instead of people While this makes work faster it also means some people lose their jobs To solve this workers need to learn new skills so they can find different jobs in the future Social media has changed the way people communicate It helps us stay in touch with family and friends even if they live far away But too much time on social media can be harmful Some people feel lonely or compare their lives to others which can make them sad Also fake news spreads easily and many people believe things that are not true At the same time scientists are working on better ways to use energy Solar and wind power are becoming more common helping reduce pollution People are also trying to create better batteries to store energy for longer The future of technology is full of possibilities New inventions in space medicine and computers can make life better However we must use technology wisely to avoid problems and make sure it helps everyone.";

// Split the string into an array of words
const wordArray = words.split(/\s+/); // Split by spaces

// Function to get a random word
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    return wordArray[randomIndex];
}

// Example usage
console.log(getRandomWord()); // Outputs a random word from the text











document.getElementById('game').addEventListener('keyup', ev => {
    const key = ev.key;
    
    const currentLetter = document.querySelector('.letter.current');
    
    if (!currentLetter) {
      console.log("No current letter found.");
      return;
    }
  
    const expected = currentLetter.innerHTML.trim(); // Trim to avoid spaces
  
    console.log({ key, expected });
  
    // Example: Check if the pressed key matches the expected letter
    if (key === expected) {
      console.log("Correct key pressed!");
      currentLetter.classList.remove("current"); // Remove 'current' class
      const nextLetter = currentLetter.nextElementSibling;
      if (nextLetter) {
        nextLetter.classList.add("current"); // Move to the next letter
      }
    }
  });
  