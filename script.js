const display = document.getElementById("display");
const numeros = document.querySelectorAll("[id*=tecla]");
const operadores = document.querySelectorAll("[id*=operador");
//Está true porque é um novo número que vai ser escrito no display
let novoNumero = true;
let operador;
let numeroAnterior;
const operacaoPendente = () => operador !== undefined;

//Evento de calcular
const calcular = () => {
  //Primeiro ele vai verificar se existe uma operação pendente
  if (operacaoPendente()) {
    const numeroAtual = parseFloat(display.textContent);
    // Para atualizar e aparecer um número novo
    novoNumero = true;
    //Aonde coloco a operação que vai dar o resultado na calculadora
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

//Evento do display
const atualizarDisplay = (texto) => {
  if (novoNumero) {
    display.textContent = texto;
    novoNumero = false;
  } else {
    //Está concatenando o texto do display
    display.textContent += texto;
  }
};
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
//Evento de operador
//Com o novoNumero declarado aqui ela faz a substituição do número no display, guardando ele na memória quando apertar em um operador novo
const selecionarOperador = (evento) => {
  //! Quer dizer não, então se não for um novo número ela faz todo esse processo
  if (!novoNumero) {
    calcular();
    novoNumero = true;
    operador = evento.target.textContent;
    numeroAnterior = parseFloat(display.textContent);
    // console.log(operador);
  }
};
operadores.forEach((operador) =>
  operador.addEventListener("click", selecionarOperador)
);

//Evento dos números
numeros.forEach((numero) => numero.addEventListener("click", inserirNumero));
//Funcionamento do botão de =
//Dessa maneira eu declarei a variável ativar igual, que não vai pegar mais os operadores no momento que aperta no =
const ativarIgual = () => {
  calcular();
  operador = undefined;
};
document.getElementById("igual").addEventListener("click", ativarIgual);

//Botão de apagar o display
const limparDisplay = () => (display.textContent = "");
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
