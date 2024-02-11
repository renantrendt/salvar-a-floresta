document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game');
    let forestPreserved = 100;
    const totalTreesStart = 50; // Número total de árvores no início
    let currentTrees = totalTreesStart;

    // Inicializa o jogo preenchendo com árvores
    for (let i = 0; i < totalTreesStart; i++) {
        const tree = document.createElement('div');
        tree.classList.add('sprite', 'arvore');
        tree.style.left = `${Math.random() * 580}px`; // 600 - 20 para garantir que caiba na tela
        tree.style.top = `${Math.random() * 580}px`;
        gameArea.appendChild(tree);
    }

    // Definir áreas de coleta
    const areasColeta = [
        {x: 0, y: 0}, // Canto superior esquerdo
        {x: 570, y: 0}, // Canto superior direito
        {x: 0, y: 570}, // Canto inferior esquerdo
        {x: 570, y: 570} // Canto inferior direito
    ];

    areasColeta.forEach((pos) => {
        const area = document.createElement('div');
        area.classList.add('sprite', 'area-coleta');
        area.style.left = `${pos.x}px`;
        area.style.top = `${pos.y}px`;
        gameArea.appendChild(area);
    });

    // Mover jogador
    // Mover fazendeiro
    // Atualizar contagem de árvores e estado da floresta
    // Lógica para coletar sementes e replantar árvores

    // Esta é uma base. Você precisará adicionar a lógica de movimentação para o jogador e o fazendeiro,
    // assim como a interação para coletar sementes e replantar árvores.
});
