let words = [];

// Capitalize first letter
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Fetch the word list from the JSON file
fetch("data/words.json")
  .then((response) => response.json())
  .then((data) => {
    words = data;
    generatePassword(); // Generate a password on load
  })
  .catch((error) => {
    console.error("Error loading word list:", error);
    document.getElementById("passwordDisplay").textContent = "⚠️ Word list not loaded.";
  });

// Generate a random password
function generatePassword() {
  if (words.length < 3) return;

  const getRandomWord = () => capitalize(words[Math.floor(Math.random() * words.length)]);
  const getRandomDigit = () => Math.floor(Math.random() * 10);
  const getRandomSymbol = () => {
    const symbols = ['!', '@', '#', '$', '%', '&', '*'];
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const word1 = getRandomWord();
  const word2 = getRandomWord();
  const word3 = getRandomWord();
  const num = getRandomDigit();
  const symbol = getRandomSymbol();

  const password = `${word1}${num}${symbol}${word2}${num}${symbol}${word3}`;

  document.getElementById("passwordDisplay").textContent = password;
}

// Event listener for Generate button
document.getElementById("generateBtn").addEventListener("click", generatePassword);

// Copy to clipboard functionality
document.getElementById("copyBtn").addEventListener("click", () => {
  const passwordText = document.getElementById("passwordDisplay").textContent;

  if (passwordText) {
    navigator.clipboard.writeText(passwordText)
      .then(() => {
        document.getElementById("copyBtn").textContent = "Copied!";
        setTimeout(() => {
          document.getElementById("copyBtn").textContent = "Copy";
        }, 1500);
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  }
});
