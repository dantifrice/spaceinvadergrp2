 /*
 Les valeurs pour définir la hauteur de l'écran (height) et diviser la largeur par 2 pour mettre le vaisseau au centre (px)
*/

var height  = screen.height;
var px      = screen.width / 2;
/* Quand on charge la fenêtre du jeu, on commence à fix les valeurs css du vaisseau (px) qu'on a défini en haut */
window.onload  = function() {
    vaisseau.style.left   = px + "px";
}
/* Quand on commence à taper sur le clavier, on va faire un switch pour chaque touche qu'on tape et on y ajoute une action. */
window.onkeydown = function(event) {
    switch(event.keyCode) {
        case 32: // quand on clique la touche "espace"
        break;
                        
        case 37: // quand on clique la flèche gauche, on va lui enlever 20 px (de var px) à chaque déplacement 
            px -= 20;
            vaisseau.style.left = px + "px";
        break;
                        
        case 39: // quand on clique la flèche droite, on va lui ajouter 20 px (de var px) à chaque déplacement 
            px = px < screen.width ? px += 20 : px |= -1;
            vaisseau.style.left = px + "px";
        break;
    }
}