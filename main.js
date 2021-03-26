// toto budeš potřebovat později
/*
if (!( panacekX + panacekSirka < minceX || minceX + minceSirka < panacekX || panacekY + panacekVyska < minceY || minceY + minceVyska < panacekY)) {
	// panacek a mince se prekryvaji
}
*/


// sem začni psát svůj program
/* - Máme panáčka a nastavené absolutní pozicování (už připraveno v CSS) a umíme ho posouvat
 pomocí **top/left**.
- Vytvoříme proměnné pro startovní souřadnice panáčka a umístíme ho na ně.
- Přidáme na <body> událost **onkeydown** a budeme testovat kurzorové šipky.
- Pro jednotlivé šipky měníme souřadnice a vždy znovu umístíme panáčka.
- Panáček leze z obrazovky - omezíme jeho pohyb na 0 - 
**window.innerWidth/innerHeight**.
*/
let avatar = document.getElementById("panacek");
let avatarStartX = "150px";
let avatarStartY = "150px";
avatar.style.left = avatarStartX;
avatar.style.top = avatarStartY;

function move(event) {
	let keyStroke = event.key;
	let currentPositionX = parseInt(avatar.style.left);
	let currentPositionY = parseInt(avatar.style.top);
	let speed = 5;
	if (keyStroke === "ArrowLeft") {
		if (currentPositionX === 0) {
			speed = 0;
		} else {
			currentPositionX = currentPositionX - speed;
			avatar.style.left = currentPositionX.toString() + "px";
		}
	} else if (keyStroke === "ArrowRight") {
		if (currentPositionX === parseInt(window.innerWidth)) {
			speed = 0;
		} else {
			currentPositionX = currentPositionX + speed;
			avatar.style.left = currentPositionX.toString() + "px";
		}
	} else if (keyStroke === "ArrowUp") {
		if (currentPositionY === 0) {
			speed = 0;
		} else {
			currentPositionY = currentPositionY - speed;
			avatar.style.top = currentPositionY.toString() + "px";
		}
	} else if (keyStroke === "ArrowDown") {
		if (currentPositionY === parseInt(window.innerHeight)) {
			speed = 0;
		} else {
		currentPositionY = currentPositionY + speed;
		avatar.style.top = currentPositionY.toString() + "px";
		}
	};
};


