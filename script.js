document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game');
    const startButton = document.getElementById('start-game');
    const timerElement = document.getElementById('timer');
    let segundosRestantes = 180; // 3 minutos
    
    startButton.addEventListener('click', () => {
        document.getElementById('pre-game').style.display = 'none';
        gameArea.style.display = 'flex';
        iniciarJogo();
    });

    function iniciarJogo() {
        preencherComArvores();
        atualizarCronometro();
    }

    function preencherComArvores() {
        for (let i = 0; i < 50; i++) { // Ajuste conforme necessário para densidade inicial de árvores
            const arvore = document.createElement('div');
            arvore.className = 'sprite arvore';
            arvore.style.left = `${Math.random() * (gameArea.offsetWidth - 40)}px`;
            arvore.style.top = `${Math.random() * (gameArea.offsetHeight - 40)}px`;
            gameArea.appendChild(arvore);
        }
    }

   function atualizarCronometro() {
    const interval = setInterval(() => {
        if (segundosRestantes <= 0) {
            clearInterval(interval);
            alert("Tempo esgotado!");
            // Implemente a lógica de verificação de vitória aqui.
        } else {
            segundosRestantes--;
            const minutos = Math.floor(segundosRestantes / 60);
            const segundos = segundosRestantes % 60;
            timerElement.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

// Adicionando a movimentação do jogador e replantio de árvores
document.addEventListener('keydown', (e) => {
    const speed = 20; // Ajuste conforme necessário
    let jogadorX = parseInt(jogador.style.left, 10);
    let jogadorY = parseInt(jogador.style.top, 10);

    switch (e.key) {
        case 'ArrowUp': jogador.style.top = `${Math.max(jogadorY - speed, 0)}px`; break;
        case 'ArrowDown': jogador.style.top = `${Math.min(jogadorY + speed, gameArea.offsetHeight - 20)}px`; break;
        case 'ArrowLeft': jogador.style.left = `${Math.max(jogadorX - speed, 0)}px`; break;
        case 'ArrowRight': jogador.style.left = `${Math.min(jogadorX + speed, gameArea.offsetWidth - 20)}px`; break;
        case ' ': // Replantar árvores
            const novaArvore = document.createElement('div');
            novaArvore.className = 'sprite arvore';
            novaArvore.style.left = jogadorX + 'px';
            novaArvore.style.top = jogadorY + 'px';
            gameArea.appendChild(novaArvore);
            break;
    }
});

// Movimento linear do fazendeiro e desmatamento
let indiceArvoreAtual = 0;
function moverFazendeiro() {
    const arvores = document.querySelectorAll('.arvore');
    if (arvores.length > 0 && indiceArvoreAtual < arvores.length) {
        const arvoreAtual = arvores[indiceArvoreAtual];
        fazendeiro.style.left = arvoreAtual.style.left;
        fazendeiro.style.top = arvoreAtual.style.top;
        // Espera um momento antes de remover a árvore para simular o desmatamento
        setTimeout(() => {
            arvoreAtual.remove();
            indiceArvoreAtual++;
        }, 1000);
    } else {
        // Resetar o índice se todas as árvores foram desmatadas
        indiceArvoreAtual = 0;
    }
}

setInterval(moverFazendeiro, 2000); // Ajuste o tempo conforme necessário para a velocidade do desmatamento

iniciarJogo(); // Comece o jogo imediatamente para teste, remova se precisar do botão iniciar
