const display = document.getElementById("display");
const numeros = document.querySelectorAll("[id*=tecla]");
const operadores = document.querySelectorAll("[id*=operador");
//Esta true pq é um novo numero que vai ser escrito no display
let novoNumero = true;
let operador;
let numeroAnterior;
const operacaoPendente = () => operador !== undefined;

//Evento de calcular
const calcular = () => {
  //Primeiro ele vai verificar se existe uma operação pendente
  if (operacaoPendente()) {
    const numeroAtual = parseFloat(display.textContent);
    // Para atualizar a tela e aparecer um numero novo
    novoNumero = true;
    //Aonde colocar a operação que vai dar o resultado na calculadora
    if (operador == "+") {
      atualizarDisplay(numeroAnterior + numeroAtual);
    } else if (operador == "-") {
      atualizarDisplay(numeroAnterior - numeroAtual);
    } else if (operador == "*") {
      atualizarDisplay(numeroAnterior * numeroAtual);
    } else if (operador == "/") {
      atualizarDisplay(numeroAnterior / numeroAtual);
    } else if (operador == "**") {
      atualizarDisplay(numeroAnterior ** numeroAtual);
    }
  }
};

//Eventos do display
const atualizarDisplay = (texto) => {
  if (novoNumero) {
    display.textContent = texto;
    novoNumero = false;
  } else {
    //ele esta concatenando o texto do display
    display.textContent += texto;
  }
};
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
//Evento de operador
//com o novoNumero declarado aqui ele faz a substituição do numero do display guardando ele na memoria quando eu apertar em um operador
const selecionarOperador = (evento) => {
  //! quer dizer nao, entao se nao for um novo numero ele faz todo o processo
  if (!novoNumero) {
    calcular();
    novoNumero = true;
    operador = evento.target.textContent;
    numeroAnterior = parseFloat(display.textContent);
    console.log(operador);
  }
};
operadores.forEach((operador) =>
  operador.addEventListener("click", selecionarOperador)
);

//Evento dos numeros
numeros.forEach((numero) => numero.addEventListener("click", inserirNumero));
//Funcionamento do botão de =
//Dessa maneira eu declarei a variavel ativar igual, que não vai pegar mais os operadores no momento que eu aperta no =
const ativarIgual = () => {
  calcular();
  operador = undefined;
};
document.getElementById("igual").addEventListener("click", ativarIgual);

//Botao de apagar o display
const limparDisplay = () => (display.textContent = "  ");
document
  .getElementById("limparDisplay")
  .addEventListener("click", limparDisplay);
const limparCalculo = () => {
  limparDisplay();
  operador = undefined;
  novoNumero = true;
  numeroAnterior = undefined;
};
document
  .getElementById("limparCalculo")
  .addEventListener("click", limparCalculo);
