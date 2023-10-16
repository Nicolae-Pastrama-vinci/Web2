const butn1 = document.querySelector('#butn1');

butn1.addEventListener("mouseover", start);
butn1.addEventListener("click", clickFast);
let cmpt;
let timeoutID;
let atStart;

function start(){
    const delayInSeconds = 5;
    const delayInMiliSeconds = delayInSeconds * 1000;
    timeoutID = setTimeout(() => {
        alert("Game over, you did not click 10 times within 5s ! "); 
    }, delayInMiliSeconds);
      cmpt = 0;
      atStart = new Date()
};

function clickFast(){
    cmpt++;
    if(cmpt === 10){
        clearTimeout(timeoutID);
        let atEnd = new Date() - atStart;
        alert(`You win ! You clicked 10 times within ${atEnd} ms`);
        
    }
};

