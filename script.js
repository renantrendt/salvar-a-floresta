document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game');
    let sementes = 0;
    const jogador = document.createElement('div');
    const fazendeiro = document.createElement('div');
    const arvores = [];

    jogador.className = 'sprite jogador';
    fazendeiro.className = 'sprite fazendeiro';
    gameArea.appendChild(jogador);
    gameArea.appendChild(fazendeiro);

    // Posiciona o jogador e o fazendeiro inicialmente
    jogador.style.left = '290px'; // Centro da área de jogo
    jogador.style.top = '290px';
    fazendeiro.style.left = '10px'; // Começa no canto
    fazendeiro.style.top = '10px';

    // Inicializa o jogo com árvores
    for (let i = 0; i < 50; i++) {
        const tree = document.createElement('div');
        tree.className = 'sprite arvore';
        tree.style.left = `${Math.random() * 580}px`;
        tree.style.top = `${Math.random() * 580}px`;
        gameArea.appendChild(tree);
        arvores.push(tree);
    }

    // Áreas de coleta de sementes
    const areasColeta = [
        { x: 0, y: 0 }, { x: 570, y: 0 },
        { x: 0, y: 570 }, { x: 570, y: 570 }
    ];

    areasColeta.forEach(pos => {
        const area = document.createElement('div');
        area.className = 'sprite area-coleta';
        area.style.left = `${pos.x}px`;
        area.style.top = `${pos.y}px`;
        gameArea.appendChild(area);
        area.addEventListener('click', () => {
            sementes += 5; // Aumenta as sementes ao clicar na área de coleta
            console.log(`Sementes: ${sementes}`);
        });
    });

    // Movimentação do jogador
    document.addEventListener('keydown', e => {
        const speed = 10;
        const jogadorX = jogador.offsetLeft;
        const jogadorY = jogador.offsetTop;
        switch (e.key) {
            case 'ArrowUp': jogador.style.top = `${jogadorY - speed}px`; break;
            case 'ArrowDown': jogador.style.top = `${jogadorY + speed}px`; break;
            case 'ArrowLeft': jogador.style.left = `${jogadorX - speed}px`; break;
            case 'ArrowRight': jogador.style.left = `${jogadorX + speed}px`; break;
            case ' ': // Espaço para plantar árvores se tiver sementes
                if (sementes > 0) {
                    plantarArvore(jogadorX, jogadorY);
                    sementes--;
                }
                break;
        }
    });

    // Função para plantar árvores
    function plantarArvore(x, y) {
        const novaArvore = document.createElement('div');
        novaArvore.className = 'sprite arvore';
        novaArvore.style.left = `${x}px`;
        novaArvore.style.top = `${y + 20}px`; // Um pouco abaixo do jogador
        gameArea.appendChild(novaArvore);
        arvores.push(novaArvore);
    }

    // Mover fazendeiro
    function moverFazendeiro() {
        if (arvores.length > 0) {
            const primeiraArvore = arvores[0];
            fazendeiro.style.left = primeiraArvore.style.left;
            fazendeiro.style.top = primeiraArvore.style.top;
            gameArea.removeChild(primeiraArvore);
            arvores.shift(); // Remove a primeira árvore da lista
        }
    }
    setInterval(moverFazendeiro, 1000); // Fazendeiro move a cada 1 segundo
});
