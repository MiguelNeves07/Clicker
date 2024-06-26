let score = 0;
let autoClickerPower = 1;

// Atualiza a pontuação na interface
function updateScore() {
    document.getElementById('score').innerText = `Pontuação: ${score}`;
    updateShopButtons();
}

// Função para adicionar pontos ao clicar no botão
document.getElementById('clickButton').addEventListener('click', () => {
    addPoints(1);
    
    const button = document.getElementById('clickButton');
    button.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 100);
});

// Função para adicionar pontos
function addPoints(points) {
    score += points;
    updateScore();
}

// Event listeners para os botões de compra de autoclickers
document.querySelectorAll('.shop-item').forEach(item => {
    item.addEventListener('click', () => {
        const cost = parseInt(item.getAttribute('data-cost'));
        const increment = parseInt(item.getAttribute('data-increment'));
        
        if (score >= cost) {
            score -= cost;
            autoClickerPower += increment;
            updateScore();
        }
    });
});

// Função de autoclicker que adiciona pontos automaticamente
function autoClick() {
    addPoints(autoClickerPower);
}

// Intervalo para a função de autoclick a cada segundo
setInterval(autoClick, 1000);

// Atualiza o estado dos botões de compra
function updateShopButtons() {
    document.querySelectorAll('.shop-item').forEach(item => {
        const cost = parseInt(item.getAttribute('data-cost'));
        if (score >= cost) {
            item.classList.remove('disabled');
        } else {
            item.classList.add('disabled');
        }
    });
}

// Função para salvar o jogo
function saveGame() {
    let data = `score:${score}\nautoclickerPower:${autoClickerPower}`;

    document.getElementById('saveCode').value = data;
    document.getElementById('saveMenu').style.display = 'block';
}

// Função para carregar o jogo a partir de um código de save
function applyGame() {
    const data = document.getElementById('loadCode').value;
    const lines = data.split('\n');

    lines.forEach(line => {
        const [key, value] = line.split(':');
        if (key === 'score') {
            score = parseInt(value);
        } else if (key === 'autoclickerPower') {
            autoClickerPower = parseInt(value);
        }
    });

    updateScore();
}

// Event listener para o botão de salvar
document.getElementById('saveButton').addEventListener('click', saveGame);

// Event listener para o botão de carregar
document.getElementById('loadButton').addEventListener('click', function() {
    document.getElementById('loadMenu').style.display = 'block';
});

// Event listener para o botão de aplicar código
document.getElementById('applyButton').addEventListener('click', applyGame);

// Event listener para fechar o menu de salvar
document.getElementById('closeSaveMenu').addEventListener('click', function() {
    document.getElementById('saveMenu').style.display = 'none';
});

// Event listener para fechar o menu de carregar
document.getElementById('closeLoadMenu').addEventListener('click', function() {
    document.getElementById('loadMenu').style.display = 'none';
});

// Iniciar atualização inicial da pontuação
updateScore();
