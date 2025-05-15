
document.getElementById("botao-jogar").addEventListener("click", () => {
  document.getElementById("tela-inicial").style.display = "none";

  reiniciarJogo();
});


const words = [
  { word: "bussola", hint: "Indica direcoes" },
  { word: "travesseiro", hint: "Apoio para a cabeca ao dormir" },
  { word: "escultura", hint: "Arte em pedra ou metal" },
  { word: "gramatica", hint: "Regras da lingua" },
  { word: "ferrovia", hint: "Caminho de trem" },
  { word: "espelho", hint: "Reflete a imagem" },
  { word: "planeta", hint: "Corpo celeste que orbita uma estrela" },
  { word: "abacaxi", hint: "Fruta tropical com coroa" },
  { word: "mochila", hint: "Bolsa de costas" },
  { word: "oceano", hint: "Grande massa de agua salgada" },
  { word: "arvore", hint: "Planta com tronco" },
  { word: "dinossauro", hint: "Animal pre-historico" },
  { word: "janela", hint: "Abertura para luz e ar" },
  { word: "castelo", hint: "Construcao medieval" },
  { word: "aviador", hint: "Piloto de aviao" },
  { word: "desenho", hint: "Arte com lapis ou caneta" },
  { word: "brinquedo", hint: "Objeto de diversao infantil" },
  { word: "misterio", hint: "Algo nao explicado" },
  { word: "girassol", hint: "Flor que segue o sol" },
  { word: "telefone", hint: "Aparelho de comunicacao" },
  { word: "escada", hint: "Serve para subir" },
  { word: "almofada", hint: "Usada para conforto no sofa" },
  { word: "corrente", hint: "Pode ser de metal ou de agua" },
  { word: "pirata", hint: "Ladrao dos mares" },
  { word: "esmeralda", hint: "Pedra preciosa verde" },
  { word: "batalha", hint: "Conflito armado" },
  { word: "enigma", hint: "Algo dificil de entender" },
  { word: "lanterna", hint: "Fonte de luz portatil" },
  { word: "geleira", hint: "Massa de gelo gigante" },
  { word: "mistura", hint: "Combinacao de coisas" },
  { word: "colmeia", hint: "Casa das abelhas" },
  { word: "manivela", hint: "Peca que gira para mover algo" },
  { word: "cordeiro", hint: "Filhote de ovelha" },
  { word: "espirro", hint: "Acontece quando ha alergia" },
  { word: "caverna", hint: "Buraco grande em montanha" },
  { word: "ventania", hint: "Vento muito forte" },
  { word: "caderno", hint: "Usado para escrever" },
  { word: "escorrega", hint: "Brinquedo de descer" },
  { word: "cometa", hint: "Corpo celeste com cauda brilhante" },
  { word: "farol", hint: "Ajuda na navegacao" },
  { word: "colete", hint: "Roupa sem mangas" },
  { word: "trator", hint: "Veiculo agricola" },
  { word: "moldura", hint: "Contorna um quadro ou foto" },
  { word: "borracha", hint: "Apaga o que foi escrito" },
  { word: "tartaruga", hint: "Animal com casco" },
  { word: "telhado", hint: "Cobre uma casa" },
  { word: "martelo", hint: "Usado para pregar" },
  { word: "enxada", hint: "Ferramenta de agricultura" },
  { word: "bicicleta", hint: "Veiculo de duas rodas" },
  { word: "barulho", hint: "Som alto ou incomodo" }
];

let chosenWord, displayedWord, wrongGuesses, remainingChances, erros, currentHint;


const wordDisplay = document.getElementById("word-display");
const wrongGuessesDisplay = document.getElementById("wrong-guesses");
const remainingChancesDisplay = document.getElementById("remaining-chances");
const messageDisplay = document.getElementById("message");
const guessButton = document.getElementById("guess-button");
const letterInput = document.getElementById("letter-input");
const hintButton = document.getElementById("hint-button");
const hintDisplay = document.getElementById("hint-display");

const partesBoneco = [
  "cabeca", "pescoco", "corpo", "braco-direito", "braco-esquerdo", 
  "perna-esquerda", "perna-direita"
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
  messageDisplay.classList.add("game-message"); 

  if (remainingChances === 0) {
    messageDisplay.textContent = `💥 Você perdeu! A palavra era: ${chosenWord}`;
    messageDisplay.style.color = "red";
    disableInput();
    playSound("./audios/perdeu.mp3");
    showFireworks("red");
  } else if (!displayedWord.includes("_")) {
    messageDisplay.textContent = "🎉 Você ganhou!";
    messageDisplay.style.color = "green";
    disableInput();
    playSound("./audios/vitoria.mp3");
    showFireworks("green");
  }
}


function playSound(src) {
  const audio = new Audio(src);
  audio.play();
  audio.volume = 0.5; 
}


function disableInput() {
  guessButton.disabled = true;
  letterInput.disabled = true;
}

function reiniciarJogo() {
  const randomIndex = Math.floor(Math.random() * words.length);
  chosenWord = words[randomIndex].word;
  currentHint = words[randomIndex].hint;

  displayedWord = Array(chosenWord.length).fill("_");
  wrongGuesses = [];
  remainingChances = 8;
  erros = 0;

 
  partesBoneco.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

 
  const perdeu = document.getElementById("perdeu");
  if (perdeu) perdeu.style.display = "none";

  
  messageDisplay.textContent = "";
  messageDisplay.style.color = "#000";

 
  guessButton.disabled = false;
  letterInput.disabled = false;
  letterInput.focus();

  
  const hintElement = document.getElementById("hint-display");
  if (hintElement) hintElement.textContent = "";

  
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

// Função para mostrar a dica
function mostrarDica() {
  hintDisplay.textContent = `💡 ${currentHint}`;
}

// Eventos
guessButton.addEventListener("click", guessLetter);
letterInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") guessLetter();
});
hintButton.addEventListener("click", mostrarDica);
document.getElementById("restart-button").addEventListener("click", reiniciarJogo);

// Inicia o jogo
reiniciarJogo();



document.getElementById("sair-button").addEventListener("click", () => {
document.getElementById("tela-inicial").style.display = "block";
document.getElementById("message").style.display = "none";
});

reiniciarJogo();