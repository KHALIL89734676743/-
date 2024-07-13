const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// إعدادات اللعبة
const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

let playerPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight };
let computerPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight };
let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: ballRadius, speedX: 5, speedY: 5 };

// رسم اللعبة
function draw() {
    // تنظيف الشاشة
    context.clearRect(0, 0, canvas.width, canvas.height);

    // رسم مضارب اللاعبين
    context.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
    context.fillRect(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height);

    // رسم الكرة
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
}

// تحديث اللعبة
function update() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // ارتداد الكرة من الجدران
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }

    // ارتداد الكرة من المضارب
    if (
        (ball.x - ball.radius < playerPaddle.x + playerPaddle.width && ball.y > playerPaddle.y && ball.y < playerPaddle.y + playerPaddle.height) ||
        (ball.x + ball.radius > computerPaddle.x && ball.y > computerPaddle.y && ball.y < computerPaddle.y + computerPaddle.height)
    ) {
        ball.speedX = -ball.speedX;
    }

    // تحديث موقع مضرب الكمبيوتر
    computerPaddle.y = ball.y - computerPaddle.height / 2;
}

// حركة اللاعب
window.addEventListener('mousemove', function(event) {
    let canvasRect = canvas.getBoundingClientRect();
    playerPaddle.y = event.clientY - canvasRect.top - playerPaddle.height / 2;
});

// حلقة اللعبة
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
