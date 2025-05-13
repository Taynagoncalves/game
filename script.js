// Controle de visibilidade entre tela inicial e jogo
document.getElementById("botao-jogar").addEventListener("click", () => {
  document.getElementById("tela-inicial").style.display = "none";
  document.getElementById("jogo").style.display = "block";
  reiniciarJogo(); // começa o jogo ao clicar
});


const words = ["preto", "azul", "amarelo", "vermelho", "roxo", "marrom"];
let chosenWord, displayedWord, wrongGuesses, remainingChances, erros;

const wordDisplay = document.getElementById("word-display");
const wrongGuessesDisplay = document.getElementById("wrong-guesses");
const remainingChancesDisplay = document.getElementById("remaining-chances");
const messageDisplay = document.getElementById("message");
const guessButton = document.getElementById("guess-button");
const letterInput = document.getElementById("letter-input");



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
    document.getElementById(partesBoneco[erros]).style.display = "block";
  } else {
    document.getElementById("perdeu").style.display = "block";
  }
}

function updateDisplay() {
  wordDisplay.textContent = displayedWord.join(" ");
  wrongGuessesDisplay.textContent = wrongGuesses.join(", ");
  remainingChancesDisplay.textContent = remainingChances;
}



function checkGameStatus() {
  if (remainingChances === 0) {
    messageDisplay.textContent = `💥 Você perdeu! A palavra era: ${chosenWord}`;
    messageDisplay.style.color = "red";
    messageDisplay.style.fontSize = "1.5rem";
    messageDisplay.style.transition = "all 0.3s ease";
    disableInput();
    showFireworks("red");
  } else if (!displayedWord.includes("_")) {
    messageDisplay.textContent = "🎉 Você ganhou!";
    messageDisplay.style.color = "green";
    messageDisplay.style.fontSize = "1.5rem";
    messageDisplay.style.transition = "all 0.3s ease";
    disableInput();
    showFireworks("green");
  }
}

function disableInput() {
  guessButton.disabled = true;
  letterInput.disabled = true;
}

function reiniciarJogo() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  displayedWord = Array(chosenWord.length).fill("_");
  wrongGuesses = [];
  remainingChances = 8;
  erros = 0;

  partesBoneco.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
  document.getElementById("perdeu").style.display = "none";

  messageDisplay.textContent = "";
  messageDisplay.style.color = "#000";
  guessButton.disabled = false;
  letterInput.disabled = false;
  letterInput.focus();

  updateDisplay();
}

function guessLetter() {
  const letter = letterInput.value.toLowerCase();
  letterInput.value = "";

  if (!letter.match(/[a-zçãáâéêíóôõúü]/i)) return;

  if (!wrongGuesses.includes(letter) && !displayedWord.includes(letter)) {
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
      mostrarParteBoneco(erros++);
    }

    updateDisplay();
    checkGameStatus();
  }
}

guessButton.addEventListener("click", guessLetter);
letterInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") guessLetter();
});
document.getElementById("restart-button").addEventListener("click", reiniciarJogo);

reiniciarJogo(); // Inicia o jogo ao carregar a página
