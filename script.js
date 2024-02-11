document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game');
    const jogador = document.createElement('div');
    const fazendeiro = document.createElement('div');
    const arvores = [];
    let sementesInfinitas = false;
    let forestPreserved = 100;
    const totalTreesStart = 50; // Número total de árvores no início
    let currentTrees = totalTreesStart;

    // Inicialização e estilização do jogador e fazendeiro
    jogador.className = 'sprite jogador';
    fazendeiro.className = 'sprite fazendeiro';
    gameArea.appendChild(jogador);
    gameArea.appendChild(fazendeiro);
    jogador.style.left = '290px';
    jogador.style.top = '290px';
    fazendeiro.style.left = '10px';
    fazendeiro.style.top = '10px';

    // Inicializa o jogo com árvores
    for (let i = 0; i < totalTreesStart; i++) {
        plantarArvore(Math.random() * 580, Math.random() * 580);
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
    });

    // Movimentação do jogador
    document.addEventListener('keydown', e => {
        const speed = 10;
        const jogadorX = jogador.offsetLeft;
        const jogadorY = jogador.offsetTop;
        switch (e.key) {
            case 'ArrowUp': jogador.style.top = `${Math.max(jogadorY - speed, 0)}px`; break;
            case 'ArrowDown': jogador.style.top = `${Math.min(jogadorY + speed, 580)}px`; break;
            case 'ArrowLeft': jogador.style.left = `${Math.max(jogadorX - speed, 0)}px`; break;
            case 'ArrowRight': jogador.style.left = `${Math.min(jogadorX + speed, 580)}px`; break;
            case ' ': if (sementesInfinitas) plantarArvore(jogadorX, jogadorY + 20); break;
        }
        verificarColetaSementes();
        verificarColisaoFazendeiro();
    });

    function verificarColetaSementes() {
        areasColeta.forEach(area => {
            const areaX = parseInt(area.style.left, 10);
            const areaY = parseInt(area.style.top, 10);
            const jogadorX = jogador.offsetLeft;
            const jogadorY = jogador.offsetTop;
            if (Math.abs(jogadorX - areaX) < 30 && Math.abs(jogadorY - areaY) < 30 && !sementesInfinitas) {
                sementesInfinitas = true;
                console.log("Sementes infinitas coletadas!");
            }
        });
    }

    function verificarColisaoFazendeiro() {
        const fazendeiroX = fazendeiro.offsetLeft;
        const fazendeiroY = fazendeiro.offsetTop;
        const jogadorX = jogador.offsetLeft;
        const jogadorY = jogador.offsetTop;
        if (Math.abs(jogadorX - fazendeiroX) < 20 && Math.abs(jogadorY - fazendeiroY) < 20) {
            alert("O fazendeiro te pegou! Fim de jogo.");
            location.reload(); // Reinicia o jogo
        }
    }

    function plantarArvore(x, y) {
        const novaArvore = document.createElement('div');
        novaArvore.className = 'sprite arvore';
        novaArvore.style.left = `${x}px`;
        novaArvore.style.top = `${y}px`;
        gameArea.appendChild(novaArvore);
        arvores.push(novaArvore);
        currentTrees++;
        atualizarPreservacaoFloresta();
    }

    function removerArvore() {
        if (arvores.length > 0) {
            const arvore = arvores.shift(); // Remove a primeira árvore
            gameArea.removeChild(arvore);
            currentTrees--;
            atualizarPreservacaoFloresta();
        }
    }

    function atualizarPreservacaoFloresta() {
        forestPreserved = (currentTrees / totalTreesStart) * 100;
        document.getElementById('forest-status').textContent = `Floresta Preservada: ${forestPreserved.toFixed(0)}%`;
        if (forestPreserved < 50) {
            alert("Menos de 50% da floresta foi preservada. Fim de jogo.");
            location.reload(); // Reinicia o jogo
        }
    }

    function moverFazendeiro() {
        if (arvores.length > 0) {
            const proximaArvore = arvores[0];
            fazendeiro.style.left = proximaArvore.style.left;
            fazendeiro.style.top = proximaArvore.style.top;
            removerArvore();
        }
    }
    setInterval(moverFazendeiro, 2000); // Fazendeiro move a cada 2 segundos
});
