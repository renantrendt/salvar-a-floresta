document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-game');
    const gameArea = document.getElementById('game');
    const timerElement = document.getElementById('timer');
    const forestStatusElement = document.getElementById('forest-status');
    let segundosRestantes = 180; // 3 minutos
    let sementesColetadas = false;
    let forestPreserved = 100;
    const totalTreesStart = 50;
    let currentTrees = totalTreesStart;

    startButton.addEventListener('click', () => {
        document.getElementById('pre-game').style.display = 'none';
        gameArea.style.display = 'block';
        iniciarJogo();
    });

    function iniciarJogo() {
        preencherComArvores();
        atualizarCronometro();
        // Aqui você pode adicionar mais lógica inicial, se necessário.
    }

    function preencherComArvores() {
        for (let i = 0; i < totalTreesStart; i++) {
            const tree = document.createElement('div');
            tree.className = 'sprite arvore';
            tree.style.left = `${Math.random() * (gameArea.offsetWidth - 20)}px`;
            tree.style.top = `${Math.random() * (gameArea.offsetHeight - 20)}px`;
            gameArea.appendChild(tree);
        }
    }

    function atualizarCronometro() {
        const interval = setInterval(() => {
            if (segundosRestantes <= 0) {
                clearInterval(interval);
                verificarFimDeJogo(true); // O tempo acabou, verificar se o jogador ganhou
            } else {
                segundosRestantes--;
                const minutos = Math.floor(segundosRestantes / 60);
                const segundos = segundosRestantes % 60;
                timerElement.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    function verificarFimDeJogo(tempoAcabou) {
        if (tempoAcabou && forestPreserved >= 50) {
            alert("Você ganhou! Mais de 50% da floresta foi preservada.");
        } else if (!tempoAcabou) {
            alert("Você perdeu! O fazendeiro destruiu a floresta ou você foi pego.");
        } else {
            alert("Você perdeu! Menos de 50% da floresta foi preservada.");
        }
        // Aqui você pode reiniciar o jogo ou oferecer opção para ir para a próxima fase.
    }

    // Adicione as funções para movimentação do jogador, coleta de sementes, replantio de árvores, e interação com o fazendeiro.
});
