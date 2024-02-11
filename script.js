document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game');
    const startButton = document.getElementById('start-game');
    const timerElement = document.getElementById('timer');
    let segundosRestantes = 180; // 3 minutos

    // Inicialização e estilização do jogador
    const jogador = document.createElement('div');
    jogador.className = 'sprite jogador';
    jogador.style.left = '290px'; // Posição inicial no centro
    jogador.style.top = '290px';
    gameArea.appendChild(jogador);

    // Inicialização e estilização do fazendeiro
    const fazendeiro = document.createElement('div');
    fazendeiro.className = 'sprite fazendeiro';
    fazendeiro.style.left = '10px'; // Posição inicial
    fazendeiro.style.top = '10px';
    gameArea.appendChild(fazendeiro);

    startButton.addEventListener('click', () => {
        document.getElementById('pre-game').style.display = 'none';
        gameArea.style.display = 'block';
        iniciarJogo();
    });

    function iniciarJogo() {
        preencherComArvores();
        atualizarCronometro();
        moverFazendeiro(); // Inicia o movimento do fazendeiro
    }

    function preencherComArvores() {
        for (let i = 0; i < 50; i++) {
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

    document.addEventListener('keydown', (e) => {
        const speed = 20; // Ajuste conforme necessário
        switch (e.key) {
            case 'ArrowUp': jogador.style.top = `${Math.max(parseInt(jogador.style.top) - speed, 0)}px`; break;
            case 'ArrowDown': jogador.style.top = `${Math.min(parseInt(jogador.style.top) + speed, gameArea.offsetHeight - 20)}px`; break;
            case 'ArrowLeft': jogador.style.left = `${Math.max(parseInt(jogador.style.left) - speed, 0)}px`; break;
            case 'ArrowRight': jogador.style.left = `${Math.min(parseInt(jogador.style.left) + speed, gameArea.offsetWidth - 20)}px`; break;
            case ' ': // Replantar árvores
                const novaArvore = document.createElement('div');
                novaArvore.className = 'sprite arvore';
                novaArvore.style.left = jogador.style.left;
                novaArvore.style.top = jogador.style.top;
                gameArea.appendChild(novaArvore);
                break;
        }
    });

    // Função para mover o fazendeiro e desmatar árvores
    function moverFazendeiro() {
        const arvores = document.querySelectorAll('.arvore');
        let index = 0; // Começa com a primeira árvore
        const intervaloDesmatamento = setInterval(() => {
            if (arvores.length > 0 && index < arvores.length) {
                const arvoreAtual = arvores[index];
                fazendeiro.style
