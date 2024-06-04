const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const eggImage = new Image();
eggImage.src = 'egg.jpeg';

const cloudImage = new Image();
cloudImage.src = 'wolke.png';

const towerImage = new Image();
towerImage.src = 'turm.jpeg';

let egg = { x: 50, y: canvas.height / 2 - 25, width: 50, height: 50 };
let clouds = [
    { x: canvas.width / 3, y: 20, width: 100, height: 60 },
    { x: canvas.width / 2, y: 20, width: 100, height: 60 },
    { x: (2 * canvas.width) / 3, y: 20, width: 100, height: 60 }
];
let towers = [];
let gameOver = false;

canvas.addEventListener('click', handleClick);

function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    towers = towers.filter(tower => {
        if (
            clickX >= tower.x &&
            clickX <= tower.x + tower.width &&
            clickY >= tower.y &&
            clickY <= tower.y + tower.height
        ) {
            return false;
        }
        return true;
    });
}

function spawnTower() {
    const height = 100;
    towers.push({
        x: canvas.width,
        y: Math.random() * (canvas.height - height),
        width: 50,
        height: height
    });
}

function update() {
    if (gameOver) return;

    towers.forEach(tower => {
        tower.x -= 5;
        if (
            tower.x < egg.x + egg.width &&
            tower.x + tower.width > egg.x &&
            tower.y < egg.y + egg.height &&
            tower.y + tower.height > egg.y
        ) {
            gameOver = true;
        }
    });

    towers = towers.filter(tower => tower.x + tower.width > 0);

    if (Math.random() < 0.02) {
        spawnTower();
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(eggImage, egg.x, egg.y, egg.width, egg.height);

    clouds.forEach(cloud => {
        context.drawImage(cloudImage, cloud.x, cloud.y, cloud.width, cloud.height);
    });

    towers.forEach(tower => {
        context.drawImage(towerImage, tower.x, tower.y, tower.width, tower.height);
    });

    if (gameOver) {
        context.fillStyle = 'red';
        context.font = '48px sans-serif';
        context.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

eggImage.onload = () => {
    cloudImage.onload = () => {
        towerImage.onload = () => {
            gameLoop();
        };
    };
};