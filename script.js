document.addEventListener('DOMContentLoaded', () => {
    const jogador = document.getElementById('jogador');
    const fazendeiro = document.getElementById('fazendeiro');
    let florestaPreservada = 100;
    let segundosRestantes = 180; // 3 minutos

    function atualizarTimer() {
        const timer = document.getElementById('timer');
        let minutos = Math.floor(segundosRestantes / 60);
        let segundos = segundosRestantes % 60;
        timer.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        if (segundosRestantes > 0) {
            setTimeout(atualizarTimer, 1000);
            segundosRestantes--;
            if (segundosRestantes === 120) { // Metade do tempo
                florestaPreservada = 50;
            }
            document.getElementById('forest-status').textContent = `Floresta Preservada: ${florestaPreservada}%`;
        }
    }
    atualizarTimer();

    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp': moverJogador(0, -5); break;
            case 'ArrowDown': moverJogador(0, 5); break;
            case 'ArrowLeft': moverJogador(-5, 0); break;
            case 'ArrowRight': moverJogador(5, 0); break;
            case ' ': plantarArvore(); break; // Replantar árvores com espaço
        }
    });

    function moverJogador(dx, dy) {
        let posX = jogador.offsetLeft + dx;
        let posY = jogador.offsetTop + dy;
        jogador.style.left = `${posX}px`;
        jogador.style.top = `${posY}px`;
        // Adicione colisão com fazendeiro aqui se necessário
    }

    function moverFazendeiro() {
        // Implemente o movimento do fazendeiro aqui
        // Exemplo: fazendeiro.style.left = `${novoX}px`; fazendeiro.style.top = `${novoY}px`;
    }

    function plantarArvore() {
        // Implemente a lógica para plantar uma árvore
        // Exemplo: crie um novo div com a classe 'arvore' e adicione ao jogo
    }

    // Inicie o movimento do fazendeiro
    setInterval(moverFazendeiro, 2000); // Mova o fazendeiro a cada 2 segundos
});
