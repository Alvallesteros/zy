let nonum = 0;
let yesnum = 0;


function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('visible'));

    // Show the selected page
    const pageToShow = document.getElementById(pageId);
    if (pageToShow) {
        pageToShow.classList.add('visible');
    }
}

  document.addEventListener('DOMContentLoaded', function() {
    const starryNight = document.querySelector('.gradient-overlay');
    
    function createShootingStar() {
      const star = document.createElement('div');
      star.classList.add('shooting-star');
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      starryNight.appendChild(star);
      setTimeout(() => {
        star.remove();
      }, 3000); // Adjust duration of the shooting star
    }
    
    setInterval(createShootingStar, 2500); // Adjust interval between shooting stars
  });

function cycleTexts(textSelector, fadeInDuration, fadeOutDuration, timeArray) {
    const texts = document.querySelectorAll(textSelector);
    let index = 0;

    function fadeInNextText() {
        texts[index].classList.add('visible');
        texts[index].classList.remove('inactive');
        index++;

        if (index < texts.length) {
            setTimeout(fadeOutCurrentText, timeArray[index]); // Adjust the time as needed
        }
    }

    function fadeOutCurrentText() {
        texts[index - 1].classList.remove('visible');
        texts[index - 1].classList.add('inactive');
        setTimeout(fadeInNextText, fadeOutDuration); // Adjust the time as needed
    }

    setTimeout(fadeInNextText, fadeInDuration);
}

document.addEventListener('DOMContentLoaded', function() {
    if (nonum == 0 || yesnum == 0){
        addButtons()
        showPage('page1');
        cycleTexts('.first-round', 500, 1000, [5000, 15000]);
        cycleTexts('.first-text', 500, 1000, [3000, 3000, 5000, 5000]);
    } 
});

let scaler = 1;

function noClick() {
    nonum++;
    console.log(nonum);
    if (nonum == 1) {
        showPage('page2');
        cycleTexts('.second-round', 500, 1000, [1000, 8000]);
        cycleTexts('.second-text', 500, 1000, [1000, 3000, 3000, 5000]);
        const page = document.querySelector('#page2');
        const container = page.querySelector('.subtitle-container');
        const nobtn = container.querySelector('.no-button');
        const yesbtn = container.querySelector('.yes-button');
        yesbtn.addEventListener('click', yesClick);
        nobtn.addEventListener('click', noClick);
    }
    if (nonum >= 2 && nonum <= 10) {
        const page = document.querySelector('#page2');
        const container = page.querySelector('.subtitle-container');
        const yesbtn = container.querySelector('.yes-button');
        scaler += 0.1;
        yesbtn.addEventListener('click', yesClick);
        yesbtn.style.transform = `scale(${scaler})`;
    }
    if (nonum == 10) {
        showPage('page3');
        cycleTexts('.third-round', 500, 1000, [1000, 8000]);
        cycleTexts('.third-text', 500, 1000, [1000, 3000, 3000, 5000]);
        cycleTexts('.floating', 10000, 1000, [25000, 25000]);
        const page = document.querySelector('#page3');
        const nobtn = page.querySelector('.floating');
        const container = page.querySelector('.subtitle-container');
        const yesbtn = container.querySelector('.yes-button');
        yesbtn.addEventListener('click', yesClick);
        nobtn.addEventListener('click', noClick);

        document.addEventListener('mousemove', function(event) {
            const button = nobtn;
            const buttonRect = button.getBoundingClientRect();
        
            // Calculate the distance between the button and the mouse cursor
            const distanceX = event.clientX - (buttonRect.left + 150);
            const distanceY = event.clientY - (buttonRect.top + 30);
        
            // Define a threshold distance
            const threshold = 100;
        
            // Move the button away from the mouse cursor if it gets too close
            if (Math.abs(distanceX) < threshold && Math.abs(distanceY) < threshold) {
                // Calculate new position within the viewport bounds
                const maxX = window.innerWidth - buttonRect.width;
                const maxY = window.innerHeight - buttonRect.height;

                // Set a random position for the button
                const randomX = Math.floor(Math.random() * maxX);
                const randomY = Math.floor(Math.random() * maxY);

                button.style.left = `${randomX}px`;
                button.style.top = `${randomY}px`;
            }
        });
        
    }
    if (nonum == 11) {
        showPage('page4');
        cycleTexts('.fourth-round', 500, 1000, [3000, 5000]);
        cycleTexts('.fourth-text', 500, 1000, [3000, 5000]);
    }
}

function yesClick() {
    yesnum++
    if (yesnum == 1) {
        showPage('page5');
        init();
        cycleTexts('.fifth-round', 500, 1000, [1000, 8000]);
        cycleTexts('.fifth-text', 500, 1000, [1000, 3000, 3000, 5000]);
        const page = document.querySelector('#page5');
        const container = page.querySelector('.subtitle-container');
        const yesbtn = container.querySelector('.yes-button');
        const nobtn = container.querySelector('.no-button');
        yesbtn.addEventListener('click', yesClick);
        nobtn.addEventListener('click', DOSTno);
    }
    if (yesnum == 2) {
        showPage('page6');
        cycleTexts('.sixth-round', 500, 1000, [3000]);
        cycleTexts('.sixth-text', 500, 1000, [3000]);
    }
}

function DOSTno() {
    showPage('page7');
    cycleTexts('.seventh-round', 500, 1000, [3000]);
    cycleTexts('.seventh-text', 500, 1000, [3000]);
}
function addButtons() {
    const container = document.querySelector('.subtitle-container');
    const yesbtn = container.querySelector('.yes-button');
    const nobtn = container.querySelector('.no-button');

    nobtn.addEventListener('click', noClick);
    yesbtn.addEventListener('click', yesClick);
}

var canvas;
var stage;
var container;
var captureContainers;
var captureIndex;

function init() {
    // create a new stage and point it at our canvas:
    canvas = document.getElementById("testCanvas");
    stage = new createjs.Stage(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var w = canvas.width;
    var h = canvas.height;

    container = new createjs.Container();
    stage.addChild(container);

    captureContainers = [];
    captureIndex = 0;

    // create a large number of slightly complex vector shapes, and give them random positions and velocities:
            for (var i = 0; i < 100; i++) {
                var heart = new createjs.Shape();
                heart.graphics.beginFill(createjs.Graphics.getHSL(Math.random() * 30 - 45, 100, 50 + Math.random() * 30));
                heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10).curveTo(16, 0, 0, 12);
                heart.graphics.curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20).curveTo(-1, -20, 0, -12);
                heart.y = -100;

                container.addChild(heart);
            }

    /*var text = new createjs.Text("the longer I'm with you\nthe more I love you", "bold 24px Arial", "#312");
    text.textAlign = "center";
    text.x = w / 2;
    text.y = h / 2 - text.getMeasuredLineHeight();
    stage.addChild(text);*/

    for (i = 0; i < 100; i++) {
        var captureContainer = new createjs.Container();
        captureContainer.cache(0, 0, w, h);
        captureContainers.push(captureContainer);
    }

    // start the tick and point it at the window so we can do some work before updating the stage:
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.on("tick", tick);
    }

    function tick(event) {
    var w = canvas.width;
    var h = canvas.height;
    var l = container.numChildren;

    captureIndex = (captureIndex + 1) % captureContainers.length;
    stage.removeChildAt(0);
    var captureContainer = captureContainers[captureIndex];
    stage.addChildAt(captureContainer, 0);
    captureContainer.addChild(container);

    // iterate through all the children and move them according to their velocity:
            for (var i = 0; i < l; i++) {
                var heart = container.getChildAt(i);
                if (heart.y < -50) {
                    heart._x = Math.random() * w;
                    heart.y = h * (1 + Math.random()) + 50;
                    heart.perX = (1 + Math.random() * 2) * h;
                    heart.offX = Math.random() * h;
                    heart.ampX = heart.perX * 0.1 * (0.15 + Math.random());
                    heart.velY = -Math.random() * 2 - 1;
                    heart.scale = Math.random() * 2 + 1;
                    heart._rotation = Math.random() * 40 - 20;
                    heart.alpha = Math.random() * 0.75 + 0.05;
                    heart.compositeOperation = Math.random() < 0.33 ? "lighter" : "source-over";
                }
                var int = (heart.offX + heart.y) / heart.perX * Math.PI * 2;
                heart.y += heart.velY * heart.scaleX / 2;
                heart.x = heart._x + Math.cos(int) * heart.ampX;
                heart.rotation = heart._rotation + Math.sin(int) * 30;
            }

    captureContainer.updateCache("source-over");

    // draw the updates to stage:
    stage.update(event);
    }

    init();
