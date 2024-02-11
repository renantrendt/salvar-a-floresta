let forestPreserved = 100; // Inicia com 100% de floresta preservada
const totalTime = 180; // Total de tempo em segundos (3 minutos)
let currentTime = totalTime;
const timerElement = document.getElementById('timer');
const forestStatusElement = document.getElementById('forest-status');
const restartButton = document.getElementById('restart');
const nextLevelButton = document.getElementById('next-level');

function updateTimer() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (currentTime <= 0) {
        clearInterval(timerInterval);
        checkGameOver();
    } else {
        currentTime--;
        if (currentTime <= totalTime / 2) { // Reduz a floresta preservada após metade do tempo
            forestPreserved = 50 + (50 * currentTime / totalTime); // Ajuste conforme necessário
            forestStatusElement.textContent = `Floresta Preservada: ${forestPreserved.toFixed(0)}%`;
        }
    }
}

function checkGameOver() {
    if (forestPreserved >= 50) {
        alert("Você salvou o mundo!");
        nextLevelButton.style.display = "block"; // Mostrar botão para próxima fase
    } else {
        alert("O fazendeiro desmatou mais de 50% da floresta!");
        restartButton.style.display = "block"; // Mostrar botão de reiniciar
    }
}

restartButton.onclick = () => window.location.reload();
nextLevelButton.onclick = () => {
    // Lógica para avançar para a próxima fase
};

let timerInterval = setInterval(updateTimer, 1000);

// Adicione aqui a lógica para movimentação do jogador, coleta e plantio de sementes, e interação com o fazendeiro
