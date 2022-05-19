score = 0;
cross = true;
newDur = 6;

audio = new Audio('../music/bg.mp3');
audiogo = new Audio('../music/deathend.mp3');

if (true) {
    setTimeout(() => {
        audio.play();
    }, 500);   
}

document.onkeydown = function(e){
    console.log("Key code is: ",e.keyCode);
        if(e.keyCode==38){         
            dino = document.querySelector('.dino');
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino');
        }, 800);
    }
        if(e.keyCode==39){
            dino = document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
            dino.style.left = dinoX+20+'px';
        }
        if(e.keyCode==37){
            dino = document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
            dino.style.left = dinoX-20+'px';
    }
}    

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    

    dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));
    
    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);
    // console.log(offsetX, offsetY);
    if (offsetX<35 && offsetY<55) {
        audio.pause();
        gameOver.innerHTML = '!!Game Over - reload to play again!!';
        // obstacle.classList.remove('obstacleAni');
        dino.classList.remove('animateDino');
        score=score-1;
        updateScore(score);
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
        }, 8500);
        over = document.querySelector('.dino');
        over.classList.add('gameOverAni');
        setTimeout(() => {
            over.classList.remove('dino');
        }, 800);
    }
    else if(offsetX<100 && offsetX>35 && offsetY>55 && offsetY<250 && cross){
        score+=1;
        updateScore(score);
        cross=false;
        setTimeout(() => {
            cross=true;
        }, 1000);
        if(newDur>3)
        {
            setTimeout(() => {
                aniDur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
                newDur = aniDur-0.005;
                obstacle.style.animationDuration = newDur + 's';
                console.log('New animation duration: ',newDur);
            }, 500);
        }

    }
}, 10);

function updateScore(score){
    scoreCont.innerHTML = "Your Score: "+score;
}
