const canvas = document.getElementById("Ping-Pong");
const ctx = canvas.getContext("2d");

/* Ball */
let ballX = 300;
let ballY = 300;

let speedX = 4;
let speedY = Math.random() < 0.5 ? 3 : -3; // Zufällige Start-Richtung

/* Spieler */
let playerY = 250;
let opponentY = 250;


/* Computer */
let opponentWillHit = true;

/* Punkte und Gewinnbedingung */
let scoreLeft = 0;
let scoreRight = 0;
const win_score = 7; // Anzahl Punkte zum Gewinnen
let gameOver = false;
let winnerText = "";

/* Pause */
let paused = false;

/* Steuerung */

const keys = {};

document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});


/* SFX */
const hit_Sound = new Audio("../sfx/tenissmash.mp3");
const player_scoreUp_Sound = new Audio("../sfx/score_up.mp3");
const opponent_scoreUp_Sound = new Audio("../sfx/opponent_scoreUp.mp3");
const victory_Sound = new Audio("../sfx/victory.mp3");
const gameOver_Sound = new Audio("../sfx/gameover.mp3");

function playSound(sound, time = 0) {
    sound.currentTime = time; 
    sound.play();
}

/*Verhindert scrollen der Webseite */
document.addEventListener("keydown", (event) => {

    if (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
    ) {
        event.preventDefault();
    }

    keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});


/* Nächste Runde */
function resetBall() {

    if (gameOver) return;

    ballX = 300;
    ballY = 300;

    // Ball einfrieren
    speedX = 0;
    speedY = 0;

    setTimeout(() => {

        // Nach 1 Sekunde wieder los
        speedX = 5;
        speedY = Math.random() < 0.5 ? 3 : -3; // Zufällige Start-Richtung

    }, 1500);
}

/* Überprüft, ob jemand gewonnen hat */
function checkWinner() {

    if (scoreLeft >= win_score) {
        gameOver = true;
        winnerText = "Du hast gewonnen!";
        endSound=victory_Sound;
    }

    if (scoreRight >= win_score) {
        gameOver = true;
        winnerText = "Du hast verloren!";
        endSound=gameOver_Sound;
    }
}

/* Stellt Werte zurück */
function resetGame() {
    ballX = 300;
    ballY = 300;
    speedX = 4;
    peedY = 3;
    playerY = 250;
    opponentY = 250;
    opponentWillHit = true;
    scoreLeft = 0;
    scoreRight = 0;
    gameOver = false;
    winnerText = "";
    resetBall();
}

/* Spiel starten */
function Starte_Pong() {

    if (gameOver) resetGame();

    document.getElementById("startButton").disabled = true;
    document.getElementById("startButton").innerHTML = "Spiel läuft...";

    console.log("Spiel gestartet");

    gameloop = setInterval(run_game, 1000 / 60);
   
}

/* Spiel läuft */
function run_game() {

    /* Spiel geht weiter*/
     if (paused) return;

    /* Hintergrund */
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 600, 600);

    /* Spieler */
    ctx.fillStyle = "white";
    ctx.fillRect(10, playerY, 10, 100);

    /* Gegner */
    ctx.fillRect(580, opponentY, 10, 100);

    /* Ball */
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
    ctx.fill();

    /* Bewegung */
    ballX += speedX;
    ballY += speedY;

    /* Ball Wand-Kollision */
    if (ballY <= 0 || ballY >= 600) {
        speedY *= -1;
    }

    /* Spieler-Bewegung */
     if (keys["ArrowUp"]) {
        playerY -= 7;
    }

    if (keys["ArrowDown"]) {
        playerY += 7;
    }

    /*Spieler Kollision*/
    if (
        ballX <= 20 &&
        ballY >= playerY &&
        ballY <= playerY + 100
    ) {
        speedX *= -1;
        speedX +=1;
        playSound(hit_Sound);
    }

    /*Gegner Kollision*/
    if (
        ballX >= 570 &&
        ballY >= opponentY &&
        ballY <= opponentY + 100
    ) {
        speedX *= -1;
        playSound(hit_Sound);
        opponentWillHit = Math.random() < 0.37;
    }

    /* Begrenzung Spieler */
    if (playerY < 0) {
        playerY = 0;
    }

    if (playerY > 500) {
        playerY = 500;
    }

    /* Begrenzung Gegner */
    if (opponentY < 0) {
        opponentY = 0;
    }

    if (opponentY > 500) {
        opponentY = 500;
    }

    /* Punktestand aktualisieren */
    if (ballX <= 0) {
        scoreRight++;
        playSound(opponent_scoreUp_Sound, 0.5);
        checkWinner();
        resetBall();
    }
    
    if (ballX >= 600) {
        scoreLeft++;
        playSound(player_scoreUp_Sound);
        checkWinner();
        resetBall();
    }

    /* Computer-Bewegung */
    let targetY;

    if (opponentWillHit) {
        let error = Math.random() * 80 - 40; // -40 bis +40 Pixel

        targetY = ballY + error;
    } else {
        targetY = ballY + 50;
    }

    if (opponentY + 50 < targetY) {
        opponentY += 5;
    }

    if (opponentY + 50 > targetY) {
        opponentY -= 5;
    }

    /* Punktestand */
    ctx.font = "30px pixel";
    ctx.fillStyle = "white";
    ctx.fillText(scoreLeft, 260, 50);
    ctx.fillText(scoreRight, 330, 50);

    /* Game Over */
    if (gameOver) {
        ctx.font = "30px pixel";
        ctx.fillStyle = "white";
        ctx.fillText(winnerText, 200, 300); 
        playSound(endSound);  
        clearInterval(gameloop);
        document.getElementById("startButton").disabled = false;
        document.getElementById("startButton").innerHTML = "Neues Spiel";
    }
}

/* Startbild */
run_game();