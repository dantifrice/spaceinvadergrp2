 /*
 Les valeurs pour définir certaines variables
*/

var height  		= screen.height;
var px      		= Math.floor(document.getElementById("container").clientWidth / 2);
var container		= document.getElementById("container").clientWidth;
var contleft		= Math.floor(document.getElementById("container").getBoundingClientRect()["left"]);
var vaisstop		= Math.floor(document.getElementById("vaisseau").getBoundingClientRect()["top"]);
var tops			= 10;
var distanceBot		= 0;
var directionBot	= 1;
var timerToggle		= null;
var game			= false;

/* Quand on charge la fenêtre du jeu, on commence à fix les valeurs css du vaisseau (px) qu'on a défini en haut */
window.onload  = function() {
	loadGameLog();
}

/* Si l'utilisateur clique le "start" bouton.. on cache tout et on start le jeu. -.- */
document.getElementById("button").addEventListener("click", function() {
	document.getElementById("startMsg").style.display	= "none";
	document.getElementById("button").style.display		= "none";
	game	= true;
	loadGame();
});

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

function loadGameLog() {
	var div		= document.getElementById("startMsg");
	var div2	= document.getElementById("button");
	var input	= document.createElement("input");
	input.id	= "start";
	input.type	= "button";
	input.value	= "Commencer le jeu";
	var message	= "<h1>Pokemon Invader</h1>";
	div.innerHTML = message;
	div2.appendChild(input);
}

function loadEnd() {
	var div		           = document.getElementById("startMsg");
    var but                = document.getElementById("button");
	var message	           = "<h1>Vous avez perdu le jeu :(</h1>";
    but.style.display      = "inline";
    but.value              = "Rejouer";
	div.innerHTML          = message;
	div.style.display	   = "inline";
	resetGame();
}

function resetGame() {
	document.getElementById("bots").style.display	= "none";
	document.getElementById("vaisseau").style.display	= "none";
}

function loadGame() {
	if (game) {
		loadBots();
		loadPerso();
		document.getElementById("bots").style.left 	= px + "px";
		vaisseau.style.left   						= px + "px";
		vaisseau.style.top							= "370px";
		animateBot();
	}
}

function loadPerso() {
	var div			= document.getElementById("vaisseau");
	var img			= document.createElement("img");
	img.src			= "pika.gif";
	img.className	= "vaisseau";
	return div.appendChild(img);
}

function loadBots() {
	for (var i = 1; i < 31; i++) {
		var div			= document.getElementById("bots");
		var cdiv		= document.createElement("div");
		cdiv.id			= "bot_" + i;
		cdiv.className	= "bot";
		cdiv.setAttribute("style", "background:url('ball.gif'); margin:50px; width: 50px; height: 50px;");
		div.appendChild(cdiv);
	}
}		

function animateBot() { // va permettre de faire bouger les bots de droite à gauche et de haut vers le bas
	document.getElementById("bots").style.left = distanceBot + "px";
	distanceBot += directionBot;
	if (parseInt(document.getElementById("bots").style.top) >= parseInt(vaisstop)) { // si les bots touchent le vaisseau, c'est perdu
		game	= false;
		loadEnd();
	}
	if (distanceBot >= 191) { // si il touche le côté droit du container, il va descendre de 10px
		tops += 50;
		document.getElementById("bots").style.top = tops + "px";
		directionBot = -1;
	}
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
