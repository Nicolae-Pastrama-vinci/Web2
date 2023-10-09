const affichageCmpt = document.querySelector('#compteur');
const couleur = document.querySelector('body');
window.addEventListener('click', clickCounter)
const messageAffiche = document.querySelector('#message');
let cmpt = 0;

const MESSAGE = [
    {
        message: "Bravo, bel échauffement !",
    },
    {
        message: "Vous êtes passé maître en l'art du clic !",
    }
];

function clickCounter(){
    cmpt++;
    affichageCmpt.textContent = cmpt;
    
    couleur.style.backgroundColor;
    if(cmpt >= 5 && cmpt <= 9){
        messageAffiche.textContent = MESSAGE[0].message;
    }
    if(cmpt >= 10){
        messageAffiche.textContent = MESSAGE[1].message;
    }
};