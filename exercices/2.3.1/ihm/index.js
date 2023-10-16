const btn1 = document.querySelector("#btn1");
const form1 = document.querySelector("#form1");
const wish = document.querySelector("#wish");
const wishsubmited = document.querySelector("#wishSubmited");

const send = (e) =>{
    form1.style.display = "none";   
    wish.innerText = "Le souhait est : " + wishsubmited.value; 
    e.preventDefault();
};

btn1.addEventListener('click', send);

