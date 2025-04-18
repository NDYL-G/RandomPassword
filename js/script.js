let words = [];

const symbols = ["!", "@", "#", "$", "%", "&", "*", "?", "+"];

// Load the word list from words.json
fetch("data/words.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    return response.json();
  })
  .then(data => {
    words = data;
    generatePassword(); // Generate on load after words are ready
  })
  .catch(error => {
    console.error("Error loading word list:", error);
    document.getElementById("passwordDisplay").textContent = "⚠️ Failed to load word list.";
  });

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePassword() {
  if (words.length === 0) {
    document.getElementById("passwordDisplay").textContent = "⚠️ Word list not loaded.";
    return;
  }

  const word1 = getRandomItem(words);
  const word2 = getRandomItem(words);
  const word3 = getRandomItem(words);
  const num1 = Math.floor(Math.random() * 10);
  const sym1 = getRandomItem(symbols);
  const num2 = Math.floor(Math.random() * 10);
  const sym2 = getRandomItem(symbols);

  const password = `${word1}${num1}${sym1}${word2}${num2}${sym2}${word3}`;
  document.getElementById("passwordDisplay").textContent = password;
}

function copyPassword() {
  const password = document.getElementById("passwordDisplay").textContent;
  if (!password) return;

  navigator.clipboard.writeText(password).then(() => {
    const copyBtn = document.getElementById("copyBtn");
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
  });
}

document.getElementById("generateBtn").addEventListener("click", generatePassword);
document.getElementById("copyBtn").addEventListener("click", copyPassword);
