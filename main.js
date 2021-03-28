/* ZADANIE
- Máme panáčka a nastavené absolutní pozicování (už připraveno v CSS) a umíme ho posouvat pomocí **top/left**.
- Vytvoříme proměnné pro startovní souřadnice panáčka a umístíme ho na ně.
- Přidáme na <body> událost **onkeydown** a budeme testovat kurzorové šipky.
- Pro jednotlivé šipky měníme souřadnice a vždy znovu umístíme panáčka.
- Panáček leze z obrazovky - omezíme jeho pohyb na 0 - **window.innerWidth/innerHeight**.
- Přidáme minci (je v HTML v komentáři).
- Na startu hry umístíme minci na náhodnou pozici.
- Při každém pohybu testujeme, zda se panáček neprotíná s mincí - v JS připravená podmínka pro průnik dvou obdélníků.
- Pokud panáček sebere minci, posuneme minci na jinou náhodnou pozici.
*/

let avatar = document.getElementById("panacek");
let coin = document.getElementById("mince");
let avatarX = 150;
let avatarY = 150;
let avatarWidth = 50;
let avatarHeight = 65;
let coinX = (getRandomInt(0, window.innerWidth));
let coinY = (getRandomInt(0, window.innerHeight));
let coinWidth = 20;
let coinHeight = 25;
avatar.style.left = avatarX.toString() + "px";
avatar.style.top = avatarY.toString() + "px";
coin.style.left = coinX.toString() + "px";
coin.style.top = coinY.toString() + "px";

/**
 * Moves avatar on window through keyboard arrows, element cannot go beyond window borders
 * @param {*} event 
 */
function move(event) {
	let keyStroke = event.key;
	let speed = 5;
	if (keyStroke === "ArrowLeft") {
		if (avatarX <= 0) {
			speed = 0;
		} else {
			avatarX = avatarX - speed;
			avatar.style.left = avatarX.toString() + "px";
			checkCollision();
		}
	} else if (keyStroke === "ArrowRight") {
		if (avatarX >= window.innerWidth) {
			speed = 0;
		} else {
			avatarX = avatarX + speed;
			avatar.style.left = avatarX.toString() + "px";
			checkCollision();
		}
	} else if (keyStroke === "ArrowUp") {
		if (avatarY <= 0) {
			speed = 0;
		} else {
			avatarY = avatarY - speed;
			avatar.style.top = avatarY.toString() + "px";
			checkCollision();
		}
	} else if (keyStroke === "ArrowDown") {
		if (avatarY >= window.innerHeight) {
			speed = 0;
		} else {
			avatarY = avatarY + speed;
			avatar.style.top = avatarY.toString() + "px";
			checkCollision();
		}
	};
};

/**
 * If there is an avatar/coin collision, coin changes position
 */
function checkCollision() {
	if (!(
		avatarX + avatarWidth < coinX ||
		coinX + coinWidth < avatarX ||
		avatarY + avatarHeight < coinY ||
		coinY + coinHeight < avatarY
	)) {
		coinX = getRandomInt(0, window.innerWidth);
		coinY = getRandomInt(0, window.innerHeight);
		coin.style.left = coinX.toString() + "px";
		coin.style.top = coinY.toString() + "px";
	}
};

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 */
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}