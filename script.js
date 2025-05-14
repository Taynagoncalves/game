
document.getElementById("botao-jogar").addEventListener("click", () => {
  document.getElementById("tela-inicial").style.display = "none";
  document.getElementById("jogo").style.display = "block";
  reiniciarJogo();
});


const words = [
  { word: "preto", hint: "Cor escura." },
  { word: "azul", hint: "Cor do céu." },
  { word: "amarelo", hint: "Cor do sol." },
  { word: "vermelho", hint: "Cor do fogo." },
  { word: "roxo", hint: "Cor de uvas." },
  { word: "marrom", hint: "Cor da terra." },
  { word: "gato", hint: "Animal doméstico." },
  { word: "cachorro", hint: "Animal leal e amigo." },
  { word: "floresta", hint: "Ambiente com muitas árvores." },
  { word: "mar", hint: "Corpo de água salgada." },
  { word: "montanha", hint: "Grande elevação natural de terra." },
  { word: "sol", hint: "Estrela que ilumina a Terra." },
  { word: "lua", hint: "Satélite natural da Terra." },
  { word: "livro", hint: "Objeto com páginas e conteúdo escrito." },
  { word: "telefone", hint: "Aparelho para comunicação." },
  { word: "computador", hint: "Dispositivo para processamento de dados." },
  { word: "escola", hint: "Instituição de ensino." },
  { word: "aluno", hint: "Pessoa que estuda." },
  { word: "professor", hint: "Pessoa que ensina." },
  { word: "futebol", hint: "Esporte popular com bola." },
  { word: "basquete", hint: "Esporte com bola e cesta." },
  { word: "vôlei", hint: "Esporte praticado em uma rede." },
  { word: "café", hint: "Bebida estimulante feita de grãos torrados." },
  { word: "chocolate", hint: "Doce feito com cacau." },
  { word: "piano", hint: "Instrumento musical de teclas." },
  { word: "violão", hint: "Instrumento musical de cordas." },
  { word: "carro", hint: "Veículo motorizado de transporte." },
  { word: "bicicleta", hint: "Veículo com duas rodas movido a pedais." },
  { word: "avião", hint: "Veículo aéreo para transporte de pessoas." },
  { word: "ônibus", hint: "Veículo de transporte coletivo." },
  { word: "janela", hint: "Abertura na parede de um edifício." },
  { word: "porta", hint: "Abertura que permite o acesso a um ambiente." },
  { word: "cachoeira", hint: "Queda d'água em uma montanha." },
  { word: "flor", hint: "Parte da planta que contém as sementes." },
  { word: "árvore", hint: "Planta de grande porte com tronco." },
  { word: "dado", hint: "Objeto usado em jogos de azar." },
  { word: "xadrez", hint: "Jogo de tabuleiro com peças e estratégia." },
  { word: "puzzle", hint: "Jogo de peças que formam uma imagem." },
  { word: "rato", hint: "Roedor pequeno." },
  { word: "coelho", hint: "Animal conhecido por suas orelhas grandes." }
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
  if (remainingChances === 0) {
    messageDisplay.textContent = `💥 Você perdeu! A palavra era: ${chosenWord}`;
    messageDisplay.style.color = "red";
    disableInput();
    showFireworks("red");
  } else if (!displayedWord.includes("_")) {
    messageDisplay.textContent = "🎉 Você ganhou!";
    messageDisplay.style.color = "green";
    disableInput();
    showFireworks("green");
  }
}

// Função para desabilitar a entrada do jogador
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
  hintDisplay.textContent = `Dica: ${currentHint}`;
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
