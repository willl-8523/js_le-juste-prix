// Etape 1: selectionner nos elements
let input = document.querySelector("#prix");
let formulaire = document.querySelector("#formulaire");
let error = document.querySelector(".text-danger");
//let error = document.querySelector('small');
let nombreChoisi; // nombre que l'utilisateur aura choisi
let coup = 0; // nombre de fois que l'utilisateur aura envoyer son input.value (initialiser à 0 car au debut l'utilisateur n'a rien envoyer)

// Etape 2: cacher l'erreur
error.style.display = "none";

// Etape 3: générer un nombre aleatoire (si on veut un nombre aleatoire allant de 0 à 1000 on a besoin de 1001 elts)
// let nombreAleatoire = (max) => {
//     return Math.floor(Math.random() * Math.floor(max));
// }
// (nombreAleatoire(1001));
//                  OU
let nombreAleatoire = Math.floor(Math.random() * 1001); //les nombres aleatoires Math.radom() sont entre [0 , 1[ 1 étant exclu => le + grand nbre aleatoire est donc 0.9999999999 or 0.9999999999 * 1000 = 999 mais nous voulons un nombre entre 0 et 1000 d'où 0.9999 * 1001 = 1000

// Etape 6: Créer une fonction pour verifier si le nombre choisi est correct
function verifier(nombre) {
    let instruction = document.createElement('div'); // crée un elt qu'on pourra modifier en fonction du nombreChoisi par l'utilisateur

    if (nombre < nombreAleatoire) { // si le nombre de l'utilisateur < nombreAleatoire : c'est plus (pour aider l'utilisateur à trouver nombreAleatoire)
        instruction.textContent = "#" + coup + "( " + nombre + " ) c'est plus";
        instruction.className = "instruction plus";  // Ajoute à l'elt instruction les classes independante instruction et plus (dans css)   
    }else if (nombre > nombreAleatoire) {
        instruction.textContent = "#" + coup + "( " + nombre + " ) c'est moins";
        instruction.className = "instruction moins";   
    }else{
        instruction.textContent = "#" + coup + "( " + nombre + " ) félicitations vous avez trouvé le juste prix";
        instruction.className = "instruction fini";   
        input.disabled = true; // desactive l'input lorsque l'utilisateur trouve le bon nombre
    }
    document.querySelector('#instructions').prepend(instruction);
}

// Etape 4: verifier si l'utilsateur rentre un nombre ou un chiffre
// - verifier chaque touche du clavier que l'utilisateur tape pour remplir le champ(input) en utilisant l'evenement 'keyup'
// - recuperer la valeur de la touche du clavier que l'utilisateur utilise pour remplir le champ avec la propriete .value
input.addEventListener("keyup", () => {
  if (isNaN(input.value)) {
    // si la valeur de la touche du clavier n'est pas un nombre (input.value c'est la valeur qui est dans l'input)
    error.style.display = "inline";
  } else {
    error.style.display = "none"; 
  }
});

// Etape 5: Agir à l'envoi du formulaire par l'utilisateur
formulaire.addEventListener('submit', (e) => {
  e.preventDefault(); // Evite d'envoyer les données par defaut lorsque l'utilisateur clique sur le bouton "déviner"

  if (isNaN(input.value) || input.value == "") {
    input.style.borderColor = "red";
  } else {
    input.style.borderColor = "silver";
    nombreChoisi = input.value; //prendre la valeur que l'utilisateur aura noter dans l'input et l'affecter à nombreCoisi
    coup++;
    input.value = ''; // une fois l'utilisateur aura envoyer son nombreChoisi, on doit vider l'input pour que l'utilisateur refasse une tentative
    verifier(nombreChoisi);
  }
});

