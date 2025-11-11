const passwordBox = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const tooltip = document.getElementById("tooltip");

const length = 12;
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>?/";

const allChars = upperCase + lowerCase + numbers + symbols;

// Fonction pour générer le mot de passe
function createPassword() {
  let password = "";
  password += getRandomChar(upperCase);
  password += getRandomChar(lowerCase);
  password += getRandomChar(numbers);
  password += getRandomChar(symbols);

  while (password.length < length) {
    password += getRandomChar(allChars);
  }

  passwordBox.value = shuffle(password);
}

// Fonction utilitaire : obtenir un caractère aléatoire
function getRandomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

// Mélanger le mot de passe pour éviter le même ordre
function shuffle(str) {
  return str.split('').sort(() => 0.5 - Math.random()).join('');
}

// Copier dans le presse-papiers
function copyPassword() {
  const password = passwordBox.value;
  if (!password) return;

  navigator.clipboard.writeText(password).then(() => {
    tooltip.style.opacity = "1";
    setTimeout(() => {
      tooltip.style.opacity = "0";
    }, 1500);
  });
}

// Événements
generateBtn.addEventListener("click", createPassword);
copyBtn.addEventListener("click", copyPassword);
