//---------------------fonctions----------------------------------

function domino_random() {
/* param     : aucun
   résultat  : entier
               entier au hasard entre 1 et 6 inclus 
*/
   return Math.floor(Math.random()*7 + 1)
}

function produit(resultat_a, resultat_b){
/* param     : le résultat des deux parties, hautes et basses de la fraction
   résultat  : le résultat correct des calculs de ce que doit etre l'entrée utilisateur
   
   renvoie la bonne réponse sous la forme a/b
*/
   let bon_resultat = resultat_a.toString() +'/'+ resultat_b.toString();
   return bon_resultat
}

function nom_image(nombre, pos){
/* param     : un entier entre 1 et 7 et la position de l'image
   résultat  : une chaine de caractères
               le nom du fichier image png 
               associé au lancer de dé nombre
*/
   return 'images/'+nombre.toString()+pos+'.png'
}
 
function affiche_images(){
 /* param     : aucun
   résultat  : aucun
   
  lance 4 demi-dominos random et affiche dans la page Multiplication_Dominos.html les images des 4 demi-dominos 
  on utilise les variables globales

*/

   imgs[0].setAttribute('src',nom_image(partie_haute_1, _top));
   imgs[1].setAttribute('src',nom_image(partie_basse_1, _bot));
   imgs[2].setAttribute('src',nom_image(partie_haute_2, _top));
   imgs[3].setAttribute('src',nom_image(partie_basse_2, _bot));
  
}
 
function verifie_solution(){
/* param     : aucun
   résultat  : aucun
  
  Si les valeurs entrées sont correctes on affiche un message de félicitations et exécute la fonction fin_du_jeu()
  Sinon on affiche la correction et on exécute la  fonction fin_du_jeu()
*/
   let vrai_resultat = produit(resultat_a,resultat_b);

   if (resultat_ab.value == vrai_resultat) {
      resultats.textContent = 'Gagné';
   } else {
      resultats.textContent = 'La bonne réponse était '+ vrai_resultat;
   }
   fin_du_jeu()
 
}

function fin_du_jeu() {
/* param     : aucun
   résultat  : aucun

   désactive le bouton verifier et créé un bouton rejouer
*/
   bouton.disabled = true;
   bouton_rejouer = document.createElement("button");
   bouton_rejouer.textContent = 'Rejouer';
   let div_rejouer = document.querySelector('.bouton_rejouer');
   div_rejouer.appendChild(bouton_rejouer);
   bouton_rejouer.addEventListener('click', rejouer);
}

function rejouer() {
/* param     : aucun
   résultat  : aucun
  
   réinitialise toutes les varirables, réactive le bouton verifier, supprime le bouton rejouer, change les images
*/
   resultats.textContent = '';
   bouton.disabled = false;
   partie_haute_1 = domino_random();
   partie_haute_2 = domino_random();
   partie_basse_1 = domino_random();
   partie_basse_2 = domino_random();
   resultat_a = (partie_haute_1 - 1) * (partie_haute_2 - 1);
   resultat_b = (partie_basse_1 - 1) * (partie_basse_2 - 1);
   resultat_ab.value = '';
   bouton_rejouer.parentNode.removeChild(bouton_rejouer);
   affiche_images();
}

//---------------------main----------------------------------

let partie_haute_1 = domino_random();
let partie_haute_2 = domino_random();
let partie_basse_1 = domino_random();
let partie_basse_2 = domino_random();
let _top = '_top';
let _bot = '_bot';
let resultat_a = (partie_haute_1 - 1) * (partie_haute_2 - 1);
let resultat_b = (partie_basse_1 - 1) * (partie_basse_2 - 1);
let resultat_ab = document.querySelector('#resultat_ab');
let bouton = document.querySelector('#bouton_verifier');
let resultats = document.querySelector('.resultats');
let imgs = new Array(4);
//le tableau imgs contient les variables JavaScript
//associées aux sélecteurs .img0,.img1,.img2 et .img3


for(let i = 0;i < 4;i++){
   imgs[i] = document.querySelector('.img'+ i.toString());
}

affiche_images();

bouton.addEventListener('click', verifie_solution);