document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-game');
    const gameArea = document.getElementById('game');
    const timerElement = document.getElementById('timer');
    let segundosRestantes = 180; // 3 minutos

    startButton.addEventListener('click', () => {
        document.getElementById('pre-game').style.display = 'none';
        gameArea.style.display = 'block';
        iniciarJogo();
    });

    const totalTreesStart = document.querySelectorAll('.arvore').length; // Atualiza com base nas árvores iniciais.
    let currentTrees = totalTreesStart;
    
    const jogador = document.createElement('div');
    jogador.className = 'sprite jogador';
    jogador.style.left = '50%'; // Centraliza o jogador no início
    jogador.style.bottom = '10px'; // Posição inicial no fundo do jogo
    gameArea.appendChild(jogador);

    const fazendeiro = document.createElement('div');
    fazendeiro.className = 'sprite fazendeiro';
    fazendeiro.style.left = '0px'; // Posição inicial do fazendeiro
    fazendeiro.style.top = '0px';
    gameArea.appendChild(fazendeiro);

function iniciarJogo() {
    preencherComArvores(500); // Preenche o jogo com 50 árvores inicialmente
    atualizarCronometro();
    setInterval(moverFazendeiro, 1000); // Move o fazendeiro a cada 2 segundos
}

function preencherComArvores(quantidade) {
    const areaSegura = {
        top: 50, // Altura reservada para o cronômetro e status, por exemplo
        left: 10, // Margem esquerda segura
        right: 10, // Margem direita segura
        bottom: 10 // Margem inferior segura
    };

    for (let i = 0; i < quantidade; i++) {
        const arvore = document.createElement('div');
        arvore.className = 'sprite arvore';
        // Calcula posições considerando as áreas seguras
        arvore.style.left = `${Math.random() * (gameArea.offsetWidth - areaSegura.left - areaSegura.right - 40) + areaSegura.left}px`; // 40 é a largura da árvore
        arvore.style.top = `${Math.random() * (gameArea.offsetHeight - areaSegura.top - areaSegura.bottom - 40) + areaSegura.top}px`; // 40 é a altura da árvore
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
        moverJogador(e);
    });

    function moverJogador(e) {
        const speed = 10; // Velocidade do movimento do jogador
        let posX = parseInt(jogador.style.left);
        let posY = parseInt(jogador.style.top);

        switch (e.key) {
            case 'ArrowUp': posY -= speed; break;
            case 'ArrowDown': posY += speed; break;
            case 'ArrowLeft': posX -= speed; break;
            case 'ArrowRight': posX += speed; break;
        }

        // Atualiza a posição do jogador com os novos valores
        jogador.style.left = `${Math.max(0, Math.min(gameArea.offsetWidth - jogador.offsetWidth, posX))}px`;
        jogador.style.top = `${Math.max(0, Math.min(gameArea.offsetHeight - jogador.offsetHeight, posY))}px`;

        // Replantio de árvores ao pressionar espaço
        if (e.key === ' ' && dentroDaAreaDeJogo(posX, posY)) {
            plantarArvore(posX, posY);
        }
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

    function dentroDaAreaDeJogo(x, y) {
        return x >= 0 && x <= gameArea.offsetWidth && y >= 0 && y <= gameArea.offsetHeight;
    }
    
    function moverFazendeiro() {
        // Atualiza a lógica para buscar árvores dinamicamente a cada ciclo.
        setInterval(() => {
            const arvores = document.querySelectorAll('.arvore');
            if (arvores.length > 0) {
                const proximaArvore = arvores[0]; // Pega sempre a primeira árvore disponível.
                fazendeiro.style.left = proximaArvore.style.left;
                fazendeiro.style.top = proximaArvore.style.top;

                setTimeout(() => {
                    proximaArvore.remove(); // Desmata a árvore.
                    currentTrees--; // Atualiza a contagem de árvores.
                    atualizarPreservacaoFloresta(); // Recalcula a porcentagem de preservação.
                }, 1000); // Ajuste conforme necessário.
            }
        }, 2000);
    } else {
        // Se não houver mais árvores, pode optar por terminar o jogo ou reiniciar o processo
        console.log("Todas as árvores foram desmatadas.");
    }
function atualizarPreservacaoFloresta() {
    // Calcula a porcentagem baseada na quantidade atual de árvores versus a quantidade inicial.
    let porcentagemPreservada = (document.querySelectorAll('.arvore').length / totalTreesStart) * 100;
    document.getElementById('forest-status').textContent = `Floresta Preservada: ${porcentagemPreservada.toFixed(0)}%`;
}
    
}


