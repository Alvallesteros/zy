let nonum = 0;


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
        index++;

        if (index < texts.length) {
            
            setTimeout(fadeOutCurrentText, timeArray[index]); // Adjust the time as needed
        }
    }

    function fadeOutCurrentText() {
        texts[index - 1].classList.remove('visible');
        setTimeout(fadeInNextText, fadeOutDuration); // Adjust the time as needed
    }

    setTimeout(fadeInNextText, fadeInDuration);
}

document.addEventListener('DOMContentLoaded', function() {
    if (nonum == 0){
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
        nobtn.addEventListener('click', noClick);
    }
    if (nonum >= 2 && nonum <= 10) {
        const page = document.querySelector('#page2');
        const container = page.querySelector('.subtitle-container');
        const yesbtn = container.querySelector('.yes-button');
        scaler += 0.1;
        yesbtn.style.transform = `scale(${scaler})`;
    }
    if (nonum == 10) {
        showPage('page3');
        cycleTexts('.third-round', 500, 1000, [1000, 8000]);
        cycleTexts('.third-text', 500, 1000, [1000, 3000, 3000, 5000]);
        const page = document.querySelector('#page3');
        const container = page.querySelector('.subtitle-container');
        const nobtn = container.querySelector('.no-button');
        nobtn.addEventListener('click', noClick);
    }
    if (nonum == 11) {
        showPage('page4');
        cycleTexts('.fourth-round', 500, 1000, [5000, 8000]);
    }
}



function addButtons() {
    const container = document.querySelector('.subtitle-container');
    const nobtn = container.querySelector('.no-button');

    nobtn.addEventListener('click', noClick);
}

