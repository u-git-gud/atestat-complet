// Setări pentru canvas și context
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// Setări pentru mingea de joc
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,  // Viteza de început a mingii
    dx: 5,     // Direcția pe axa X
    dy: 5,     // Direcția pe axa Y
    color: "white"
};

// Setări pentru paletele de joc
const paddleWidth = 10, paddleHeight = 100;
const player1 = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "white",
    dy: 0
};

const player2 = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "white",
    dy: 0
};

// Setări pentru scor
let score1 = 0;
let score2 = 0;

// Detectarea tastelor
let upPressed1 = false, downPressed1 = false, upPressed2 = false, downPressed2 = false;
let gameMode = 1; // 1 pentru un jucător, 2 pentru doi jucători

// Buton pentru schimbarea gameMode
const toggleButton = document.getElementById('toggleMode');

// Setare viteza paletelor
let paddleSpeed = 8;

// Variabila pentru creșterea vitezei
let speedIncrement = 0.02;  // Cât de mult crește viteza mingii la fiecare frame
let maxSpeed = 10;  // Viteza maximă a mingii

// Funcție pentru actualizarea jocului
function update() {
    // Creșterea progresivă a vitezei mingii
    if (ball.speed < maxSpeed) {
        ball.speed += speedIncrement;  // Crește viteza treptat
    }

    // Aplicarea vitezei la direcțiile mingii
    ball.dx = ball.dx > 0 ? ball.speed : -ball.speed;
    ball.dy = ball.dy > 0 ? ball.speed : -ball.speed;

    // Mișcarea mingii
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Mișcarea paletei jucătorului 1
    if (upPressed1 && player1.y > 0) player1.y -= paddleSpeed;
    if (downPressed1 && player1.y < canvas.height - player1.height) player1.y += paddleSpeed;

    // Mișcarea paletei jucătorului 2
    if (gameMode === 2) {
        if (upPressed2 && player2.y > 0) player2.y -= paddleSpeed;
        if (downPressed2 && player2.y < canvas.height - player2.height) player2.y += paddleSpeed;
    } else {
        // AI pentru jucătorul 2
        if (ball.y < player2.y + player2.height / 2 && player2.y > 0) player2.y -= paddleSpeed;
        if (ball.y > player2.y + player2.height / 2 && player2.y < canvas.height - player2.height) player2.y += paddleSpeed;
    }



// Verificare coliziune cu paletele
if (ball.x - ball.radius < player1.x + player1.width && ball.x - ball.radius > player1.x &&
    ball.y > player1.y && ball.y < player1.y + player1.height) {
    ball.dx = -ball.dx;
}

if (ball.x + ball.radius > player2.x && ball.x + ball.radius < player2.x + player2.width &&
    ball.y > player2.y && ball.y < player2.y + player2.height) {
    ball.dx = -ball.dx;
}



    // Verificare coliziune cu marginile
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
    }

    // Verificare puncte
    if (ball.x - ball.radius < 0) {
        score2++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        score1++;
        resetBall();
    }

    // Actualizare scor
    document.getElementById('gameStatus').textContent = `Scor: ${score1} - ${score2}`;

    // Desenare fundal
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenare minge
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    // Desenare paleta jucător 1
    ctx.fillStyle = player1.color;
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);

    // Desenare paleta jucător 2
    ctx.fillStyle = player2.color;
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);

    // Reapela funcția de update
    requestAnimationFrame(update);
}

// Resetare minge la centru
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = ball.dx > 0 ? 5 : -5;
    ball.dy = ball.dy > 0 ? 5 : -5;

    // Resetarea vitezei la valoarea inițială
    ball.speed = 5; // Viteza se resetează la valoarea de început
}

// Detectarea tastelor apăsate
document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowUp") upPressed2 = true;
    if (e.key === "ArrowDown") downPressed2 = true;
    if (e.key === "w") upPressed1 = true;
    if (e.key === "s") downPressed1 = true;
});

// Detectarea tastelor eliberate
document.addEventListener("keyup", function(e) {
    if (e.key === "ArrowUp") upPressed2 = false;
    if (e.key === "ArrowDown") downPressed2 = false;
    if (e.key === "w") upPressed1 = false;
    if (e.key === "s") downPressed1 = false;
});

// Schimbă între moduri de joc la apăsarea butonului
toggleButton.addEventListener('click', function() {
    if (gameMode === 1) {
        gameMode = 2;
        toggleButton.textContent = "2 Jucători";
    } else {
        gameMode = 1;
        toggleButton.textContent = "1 Jucător";
    }
});

// Start joc
update();
