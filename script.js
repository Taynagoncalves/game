
const words = ["preto", "azul", "amarelo", "vermelho", "roxo", "marrom"];
let chosenWord = words[Math.floor(Math.random() * words.length)];
let displayedWord = Array(chosenWord.length).fill("_");
  
let wrongGuesses = [];
let remainingChances = 8;


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
];


function mostrarParteBoneco(erros) {
  if (erros < partesBoneco.length) {
    const parte = document.getElementById(partesBoneco[erros]);
    if (parte) {
      parte.style.display = "block";
    }
  } else {
    const perdeu = document.getElementById("perdeu");
    if (perdeu) {
      perdeu.style.display = "block";
    }
  }
}

function updateDisplay() {
  wordDisplay.textContent = displayedWord.join(" ");
  wrongGuessesDisplay.textContent = wrongGuesses.join(", ");
  remainingChancesDisplay.textContent = remainingChances;
 
}

function checkGameStatus() {
  const gameImage = document.getElementById("gameImage");

  if (remainingChances === 0) {
    messageDisplay.textContent = `Você perdeu! A palavra era: ${chosenWord}`;
    messageDisplay.style.color = "red";

    // Trocar a imagem
    gameImage.src = "Perdeu.png"; 

    guessButton.disabled = true;
    letterInput.disabled = true;

  } else if (!displayedWord.includes("_")) {
    messageDisplay.textContent = "Você ganhou!";
    messageDisplay.style.color = "green";

    gameImage.src = "ganhou.png"; 

    guessButton.disabled = true;
    letterInput.disabled = true;
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
      mostrarParteBoneco(erros);
      erros++;
    }

    updateDisplay();
    checkGameStatus();
  }
}

// Eventos
guessButton.addEventListener("click", guessLetter);
letterInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    guessLetter();
  }
});
