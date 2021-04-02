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
BONUS
- Při posunu panáčka ho natočíme do správného směru.
- Přidáme score a při sebrání mince přičítáme.
- Při sebrání mince přehrajeme zvuk.
- V průběhu hry bude hrát zvukový podkres.
- Při score > 5 přehrajeme fanfáru a zobrazíme vítěznou hlášku.
*/


let avatar, avatarX, avatarY, avatarWidth, avatarHeight;
let coin, coinX, coinY, coinWidth, coinHeight;
let windowWidth, windowHeight;
let score, scoreCount;
let backgroundMusic;

avatar = document.getElementById("panacek");
coin = document.getElementById("mince");
score = document.getElementById("score");
backgroundMusic = document.getElementById("hudba");
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;

window.addEventListener("load", onPageLoad);
document.addEventListener("keydown", move);

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 */
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Puts elements into starting positions
 */
function onPageLoad() {
	avatarWidth = avatar.width;
	avatarHeight = avatar.height;
	coinWidth = coin.width;
	coinHeight = coin.height;
	avatarX = (windowWidth - avatarWidth) / 2;
	avatarY = (windowHeight - avatarHeight) / 2;
	scoreCount = 0;
	avatarPosition(avatarX, avatarY);
	coinPosition(windowWidth, windowHeight, coinWidth, coinHeight);
};

/**
 * Positions avatar according to current avatarX and avatarY coordinates
 * @param {*} avatarX 
 * @param {*} avatarY 
 */
function avatarPosition(avatarX, avatarY) {
	avatar.style.left = avatarX + "px";
	avatar.style.top = avatarY + "px";
};

/**
 * Positions coin in random coordinates within window limits
 * @param {*} windowWidth 
 * @param {*} windowHeight 
 */
function coinPosition(windowWidth, windowHeight, coinWidth, coinHeight) {
	coinX = getRandomInt(0, windowWidth - coinWidth);
	coinY = getRandomInt(0, windowHeight - coinHeight);
	coin.style.left = coinX + "px";
	coin.style.top = coinY + "px";
};

/**
 * Moves avatar on window through keyboard arrows, element cannot go beyond window borders. If in collision with coin, it moves the coin.
 * @param {*} event 
 */
function move(event) {
	let keyStroke = event.key;
	let speed = 5;
	backgroundMusic.play();
	if (keyStroke === "ArrowLeft") {
		if (avatarX <= 0) {
			speed = 0;
		}
		avatarX -= speed;
		avatar.src = "obrazky/panacek-vlevo.png"
	} else if (keyStroke === "ArrowRight") {
		if ((avatarX + avatarWidth) >= windowWidth) {
			speed = 0;
		}
		avatarX += speed;
		avatar.src = "obrazky/panacek-vpravo.png"
	} else if (keyStroke === "ArrowUp") {
		if (avatarY <= 0) {
			speed = 0;
		}
		avatarY -= speed;
		avatar.src = "obrazky/panacek-nahoru.png"
	} else if (keyStroke === "ArrowDown") {
		if ((avatarY + avatarHeight) >= windowHeight) {
			speed = 0;
		}
		avatarY += speed;
		avatar.src = "obrazky/panacek.png"
	};
	avatarPosition(avatarX, avatarY);
	checkCollision();	
};

/**
 * If there is an avatar/coin collision, coin changes position and score+1
 */
function checkCollision() {
	if (!(
		avatarX + avatarWidth < coinX ||
		coinX + coinWidth < avatarX ||
		avatarY + avatarHeight < coinY ||
		coinY + coinHeight < avatarY
	)) {
		coinPosition(windowWidth, windowHeight, coinWidth, coinHeight);
		scoreCount++;
		score.innerHTML = scoreCount;
	};
};

// life server extension pre visual studio code - bude ti aktualizovať browser samý :)
// aby panáčik prešiel doprava a vyšiel kontinuálne zľava a hore-dole :) 
// otáčanie panáčika pozri evernote
// skús použiť radšej eventlistener, či ti to bude fungovať