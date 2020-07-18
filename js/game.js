window.addEventListener("DOMContentLoaded", function () {
    const cvs = document.getElementById("canvas");
    const ctx = cvs.getContext("2d");


    let bird = new Image(),
        bg = new Image(),
        fg = new Image(),
        pipeUp = new Image(),
        pipeBottom = new Image();

    bird.src = "../images/flappy_bird_bird.png";
    bg.src = "../images/flappy_bird_bg.png";
    fg.src = "../images/flappy_bird_fg.png";
    pipeUp.src = "../images/flappy_bird_pipeUp.png";
    pipeBottom.src = "../images/flappy_bird_pipeBottom.png";



    // Coordinate
    const gap = 90;
    const xPos = 10;
    let yPos = 150;
    const grav = 1.5;
    let score = 0;

    // Pressing any key
    document.addEventListener("keydown", moveUp);


    // Audio file
    var fly = new Audio(),
        scoreAudio = new Audio();

    fly.src = "../js_game_audio/fly.mp3";
    scoreAudio.src = "../js_game_audio/score.mp3";

    // moveUp height
    function moveUp() {
        yPos -= 35;
        fly.play();
    }


    let pipe = [];

    pipe[0] = {
        x: cvs.width,
        y: 0
    };

    function draw() {
        ctx.drawImage(bg, 0, 0);

        for (let i = 0; i < pipe.length; i++) {
            ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

            pipe[i].x--;

            if (pipe[i].x == 125) {
                pipe.push({
                    x: cvs.width,
                    y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
                });
            }

            if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width &&
                (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
                location.reload();
            }

            if (pipe[i].x == 5) {
                score++;
                scoreAudio.play();
            }
        }


        ctx.drawImage(fg, 0, cvs.height - fg.height);
        ctx.drawImage(bird, xPos, yPos);

        yPos += grav;


        ctx.fillStyle = "#000";
        ctx.font = "24px Roboto";
        ctx.fillText("Счёт: " + score, 10, cvs.height - 20);


        requestAnimationFrame(draw);
    }

    pipeBottom.onload = draw;



});