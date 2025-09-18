const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let xVelocity = 0;
let yVelocity = 0;

function gameLoop() {
    // Clear the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Move the snake
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
    snake.unshift(head);

    // Check if snake ate the food
    if (head.x === food.x && head.y === food.y) {
        // Generate new food
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } else {
        snake.pop();
    }

    // Check for collision with walls
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        resetGame();
    }

    // Check for collision with self
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    // Draw the snake
    ctx.fillStyle = 'lime';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 5, y: 5 };
    xVelocity = 0;
    yVelocity = 0;
}

document.addEventListener('keydown', (e) => {
    // Prevent snake from reversing
    switch (e.key) {
        case 'ArrowUp':
            if (yVelocity !== 1) {
                xVelocity = 0;
                yVelocity = -1;
            }
            break;
        case 'ArrowDown':
            if (yVelocity !== -1) {
                xVelocity = 0;
                yVelocity = 1;
            }
            break;
        case 'ArrowLeft':
            if (xVelocity !== 1) {
                xVelocity = -1;
                yVelocity = 0;
            }
            break;
        case 'ArrowRight':
            if (xVelocity !== -1) {
                xVelocity = 1;
                yVelocity = 0;
            }
            break;
    }
});

setInterval(gameLoop, 100);
