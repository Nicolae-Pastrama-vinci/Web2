const divs = document.querySelectorAll(".color-div");

divs.forEach((div) => {
    let clicked = false;
    div.addEventListener("click", () => {
        if(!clicked){
            div.innerText = div.style.backgroundColor;
            div.style.width = "100px";
            div.style.height = "100px";
            clicked = true;
        }else{
            div.innerText = "";
            div.style.width = "50px";
            div.style.height = "50px";
            clicked = false;
        }
        
    });
});