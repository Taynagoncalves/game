const words = ["preto", "azul", "amarelo", "vermelho", "roxo", "marrom"];
let chosenWord = words[Math.floor(Math.random() * words.length)];
let displayedWord = Array(chosenWord.length).fill("_");
let wrongGuesses = [];
let remainingChances = 6;

const wordDisplay = document.getElementById("word-display");
const wrongGuessesDisplay = document.getElementById("wrong-guesses");
const remainingChancesDisplay = document.getElementById("remaining-chances");
const messageDisplay = document.getElementById("message");
const guessButton = document.getElementById("guess-button");
const letterInput = document.getElementById("letter-input");
const hangmanImage = document.getElementById("hangman");

let erros = 0;
const partesBoneco = [
  "cabeca",
  "pescoco",
  "corpo",
  "braco-direito",
  "braco-esquerdo",
  "perna-esquerda",
  "perna-direita",
  "perdeu",
];

document.getElementById("guess-button").addEventListener("click", () => {
  const letra = document.getElementById("letter-input").value.toLowerCase();

  // Simulação: erra sempre (substitua pela lógica real depois)
  const letraErrada = true;

  if (letraErrada) {
    mostrarParteBoneco(erros);
    erros++;
  }

  document.getElementById("letter-input").value = "";
});

function mostrarParteBoneco(erros) {
  if (erros < partesBoneco.length) {
    document.getElementById(partesBoneco[erros]).style.display = "block";
  } else {
    document.getElementById("perdeu").style.display = "block";
  }
}




function updateDisplay() {
  wordDisplay.textContent = displayedWord.join(" ");
  wrongGuessesDisplay.textContent = wrongGuesses.join(", ");
  remainingChancesDisplay.textContent = remainingChances;
  hangmanImage.src = hangmanContainer[5 - remainingChances]; // VAI ATUALIZANDO CONFORME FOR ERRANDO
}

function checkGameStatus() {
  if (remainingChances === 0) {
    messageDisplay.textContent = `Você perdeu! A palavra era: ${chosenWord}`;
    messageDisplay.style.color = "red";
    guessButton.disabled = true;
  } else if (!displayedWord.includes("_")) {
    messageDisplay.textContent = "Você ganhou!";
    messageDisplay.style.color = "green";
    guessButton.disabled = true;
  }
}

function guessLetter() {
  const letter = letterInput.value.toLowerCase();
  letterInput.value = "";

  if (letter && !wrongGuesses.includes(letter) && !displayedWord.includes(letter)) {
    let found = false;

    for (let i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i] === letter) {
        displayedWord[i] = letter;
        found = true;
      }
    }

    if (!found) {
      wrongGuesses.push(letter);
      remainingChances--;
    }

    updateDisplay();
    checkGameStatus();
  }
}

guessButton.addEventListener("click", guessLetter);
letterInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    guessLetter();
  }
});

updateDisplay();
