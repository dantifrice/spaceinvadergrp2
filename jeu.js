 /*
 Les valeurs pour définir certaines variables
*/

var height  		= screen.height;
var px      		= Math.floor(document.getElementById("container").clientWidth / 2);
var container		= document.getElementById("container").clientWidth;
var contleft		= Math.floor(document.getElementById("container").getBoundingClientRect()["left"]);
var vaisstop		= Math.floor(document.getElementById("vaisseau").getBoundingClientRect()["top"]);
var bottop			= Math.floor(document.getElementById("bots").getBoundingClientRect()["top"]);
var tops			= 10;
var distanceBot		= 0;
var directionBot	= 1;
var timerToggle		= null;
var game			= false;

/* Quand on charge la fenêtre du jeu, on commence à fix les valeurs css du vaisseau (px) qu'on a défini en haut */
window.onload  = function() {
	loadBots();
	game										= true;
	document.getElementById("bots").style.left 	= px + "px";
    vaisseau.style.left   						= px + "px";
	vaisseau.style.top							= "370px";
	animateBot();
}
/* Quand on commence à taper sur le clavier, on va faire un switch pour chaque touche qu'on tape et on y ajoute une action. */
window.onkeydown = function(event) {
	if (game) {
		switch(event.keyCode) {
			case 32: // quand on clique la touche "espace":
				for (var i = 20; i < 31; i++) {
					var span = document.getElementById("bot_" + i).style.background	= "none";
				}
			break;
							
			case 37: // quand on clique la flèche gauche, on va lui enlever 20 px (de var px) à chaque déplacement 
				px	= px < contleft ? px |= 0 : px -= 20;
				vaisseau.style.left = px + "px";
			break;
							
			case 39: // quand on clique la flèche droite, on va lui ajouter 20 px (de var px) à chaque déplacement 
				px = px >= container ? px |= 0 : px += 20;
				console.log(px);
				vaisseau.style.left = px + "px";
			break;
		}
	}
}

function loadBots() {
	for (var i = 1; i < 31; i++) {
		document.getElementById("bots").innerHTML	+= '<div class="bot" id=\"bot_' + i + '\" style="margin:50px; background:url(\'http://static.tumblr.com/7bb7a1e1325424e9a17302a1935d1730/wwptlkn/Cbymwayey/tumblr_static_swagg.gif\'); width: 50px; height: 50px;" ></div>';
	}
}
		

function animateBot() { // va permettre de faire bouger les bots de droite à gauche et de haut vers le bas
	document.getElementById("bots").style.left = distanceBot + "px";
	distanceBot += directionBot;
	if (parseInt(document.getElementById("bots").style.top) >= parseInt(vaisstop)) { // si les bots touchent le vaisseau, c'est perdu
		game	= false;
	}
	if (distanceBot >= 191) { // si il touche le côté droit du container, il va descendre de 10px
		tops += 50;
		document.getElementById("bots").style.top = tops + "px";
		directionBot = -1;
	}
	console.log(parseInt(document.getElementById("bots").style.top), vaisstop);
	if (-198 >= distanceBot) { // si il touche le côté gauche du container, il va descendre de 10px
		tops += 50;
		document.getElementById("bots").style.top = tops + "px";
		directionBot = 1;
	}
	timerToggle = setTimeout(function() { // va permettre de répéter la fonction toutes les 30 microsecondes
		if (game) { // seulement si le game est à true
			animateBot();
		}
	}, 1);
}
