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
                // Adicione aqui a lógica de fim de jogo, como verificar se o jogador ganhou
            } else {
                segundosRestantes--;
                const minutos = Math.floor(segundosRestantes / 60);
                const segundos = segundosRest
