let listaDeNumerosSorteados = [];
let limiteNumeros = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo=document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}
function textoInicial() {
    exibirTextoNaTela('h1', 'Bem vindo ao Jogo do Número Secreto.');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100:');
}
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteNumeros + 1);
    let quantidadeNumSorteados = listaDeNumerosSorteados.length;

    if (quantidadeNumSorteados == limiteNumeros) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    } 
}
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ''; 
}
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    textoInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
textoInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1  ? 'tentativas' : 'tentativa';
        let mensagemAcerto = `Você descobriu o número secreto (${numeroSecreto}) com ${tentativas} ${palavraTentativa}`
        exibirTextoNaTela('p', mensagemAcerto);
        document.getElementById('reiniciar').removeAttribute('disabled');
       } else {
            if (chute > numeroSecreto){
                exibirTextoNaTela('h1', 'Errou!');
                exibirTextoNaTela('p', 'O número secreto é menor.');
            } else { 
                exibirTextoNaTela('h1', 'Errou!');
                exibirTextoNaTela('p', 'O número secreto é maior.');
            }
            tentativas++;
            limparCampo();
       }
}

