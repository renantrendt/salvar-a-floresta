document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-game');
    const gameArea = document.getElementById('game');
    const timerElement = document.getElementById('timer');
    let segundosRestantes = 180; // 3 minutos

    const jogador = document.createElement('div');
    jogador.className = 'sprite jogador';
    // Posicionamento inicial do jogador
    jogador.style.left = '290px'; // Ajuste conforme necessário
    jogador.style.top = '560px'; // Ajuste conforme necessário, considerando a altura da área do jogo
    gameArea.appendChild(jogador);

    const fazendeiro = document.createElement('div');
    fazendeiro.className = 'sprite fazendeiro';
    fazendeiro.style.left = '0px'; // Posição inicial do fazendeiro
    fazendeiro.style.top = '0px';
    gameArea.appendChild(fazendeiro);

    let totalTreesStart; // Será definido após as árvores serem preenchidas
    let currentTrees;

    startButton.addEventListener('click', () => {
        document.getElementById('pre-game').style.display = 'none';
        gameArea.style.display = 'block';
        iniciarJogo();
    });

    function iniciarJogo() {
        preencherComArvores(50); // Correção para preencher o jogo com 50 árvores inicialmente
        totalTreesStart = 50; // Definindo após criar árvores
        currentTrees = totalTreesStart;
        atualizarCronometro();
        setInterval(moverFazendeiro, 1000); // Corrigido para mover o fazendeiro corretamente
    }

    // Funções preencherComArvores, atualizarCronometro, moverJogador, plantarArvore, dentroDaAreaDeJogo permanecem as mesmas

    function moverFazendeiro() {
        const arvores = document.querySelectorAll('.arvore');
        if (arvores.length > 0) {
            const proximaArvore = arvores[0]; // Seleciona a próxima árvore disponível
            fazendeiro.style.left = proximaArvore.style.left;
            fazendeiro.style.top = proximaArvore.style.top;
            
            setTimeout(() => {
                if (proximaArvore.parentNode) {
                    proximaArvore.parentNode.removeChild(proximaArvore);
                    currentTrees--; // Atualiza a contagem de árvores removidas
                    atualizarPreservacaoFloresta(); // Recalcula a porcentagem de preservação
                }
            }, 1000); // Desmata a árvore após um curto delay
        }
    }

    function atualizarPreservacaoFloresta() {
        let porcentagemPreservada = (currentTrees / totalTreesStart) * 100;
        document.getElementById('forest-status').textContent = `Floresta Preservada: ${porcentagemPreservada.toFixed(0)}%`;
    }
});
