document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-game');
    const gameArea = document.getElementById('game');
    const timerElement = document.getElementById('timer');
    const forestStatusElement = document.getElementById('forest-status');
    let segundosRestantes = 180; // 3 minutos

    const totalTreesStart = 50; // Define quantas árvores começam no jogo.
    let currentTrees = 0; // Será atualizado depois que as árvores forem criadas.

    startButton.addEventListener('click', () => {
        document.getElementById('pre-game').style.display = 'none';
        gameArea.style.display = 'block';
        iniciarJogo();
    });

    const jogador = document.createElement('div');
    jogador.className = 'sprite jogador';
    jogador.style.left = '50%'; // Ajustar conforme necessário
    jogador.style.top = '90%'; // Ajustar conforme necessário
    gameArea.appendChild(jogador);

    const fazendeiro = document.createElement('div');
    fazendeiro.className = 'sprite fazendeiro';
    fazendeiro.style.left = '0px'; // Posição inicial do fazendeiro
    fazendeiro.style.top = '0px';
    gameArea.appendChild(fazendeiro);

    function iniciarJogo() {
        preencherComArvores(totalTreesStart);
        currentTrees = totalTreesStart; // Inicializa após criar as árvores.
        atualizarCronometro();
        setInterval(moverFazendeiro, 1000); // Move o fazendeiro a cada segundo.
    }

    function preencherComArvores(quantidade) {
        for (let i = 0; i < quantidade; i++) {
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
            } else {
                segundosRestantes--;
                const minutos = Math.floor(segundosRestantes / 60);
                const segundos = segundosRestantes % 60;
                timerElement.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    document.addEventListener('keydown', moverJogador);

    function moverJogador(e) {
        const speed = 10; // Velocidade do movimento do jogador
        let posX = parseInt(jogador.style.left, 10);
        let posY = parseInt(jogador.style.top, 10);

        switch (e.key) {
            case 'ArrowUp': posY -= speed; break;
            case 'ArrowDown': posY += speed; break;
            case 'ArrowLeft': posX -= speed; break;
            case 'ArrowRight': posX += speed; break;
            case ' ': plantarArvore(posX, posY + 20); break; // Ajuste para replantar corretamente
        }

        jogador.style.left = `${posX}px`;
        jogador.style.top = `${posY}px`;
    }

    function plantarArvore(x, y) {
        const arvore = document.createElement('div');
        arvore.className = 'sprite arvore';
        arvore.style.left = `${x}px`;
        arvore.style.top = `${y}px`;
        gameArea.appendChild(arvore);
        currentTrees++;
        atualizarPreservacaoFloresta();
    }

    function moverFazendeiro() {
        const arvores = document.querySelectorAll('.arvore');
        if (arvores.length > 0) {
            const proximaArvore = arvores[0];
            fazendeiro.style.left = proximaArvore.style.left;
            fazendeiro.style.top = proximaArvore.style.top;

            setTimeout(() => {
                if (proximaArvore.parentNode) {
                    proximaArvore.parentNode.removeChild(proximaArvore);
                    currentTrees--;
                    atualizarPreservacaoFloresta();
                }
            }, 1000);
        }
    }

    function atualizarPreservacaoFloresta() {
        let porcentagemPreservada = (currentTrees / totalTreesStart) * 100;
        forestStatusElement.textContent = `Floresta Preservada: ${porcentagemPreservada.toFixed(0)}%`;
    }
});
