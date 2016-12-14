 /*
 Les valeurs pour définir certaines variables
*/

var height  		= screen.height;
var px      		= screen.width / 2;
var tops		= 10;
var distanceBot		= 0;
var directionBot	= 1;
var timerToggle		= null;
var game		= false;

/* Quand on charge la fenêtre du jeu, on commence à fix les valeurs css du vaisseau (px) qu'on a défini en haut */
window.onload  = function() {
	game			= true;
    vaisseau.style.left   	= px + "px";
	vaisseau.style.top	= "370px";
	animateBot();
}
/* Quand on commence à taper sur le clavier, on va faire un switch pour chaque touche qu'on tape et on y ajoute une action. */
window.onkeydown = function(event) {
	if (game) {
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
}

function animateBot() { // va permettre de faire bouger les bots de droite à gauche et de haut vers le bas
	document.getElementById("bots").style.left = distanceBot + "px";
	distanceBot += directionBot;
	if (parseInt(document.getElementById("bots").style.top) >= parseInt(vaisseau.style.top)) { // si les bots touchent le vaisseau, c'est perdu
		game	= false;
	}
	if (distanceBot >= 191) { // si il touche le côté droit du container, il va descendre de 10px
		tops += 10;
		document.getElementById("bots").style.top = tops + "px";
		directionBot = -1;
	}
	if (-191 >= distanceBot) { // si il touche le côté gauche du container, il va descendre de 10px
		tops += 50;
		document.getElementById("bots").style.top = tops + "px";
		directionBot = 1;
	}
	timerToggle = setTimeout(function() { // va permettre de répéter la fonction toutes les 30 microsecondes
		if (game) { // seulement si le game est à true
			animateBot();
		}
	},30);
}
