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
- V průběhu hry bude hrát zvukový podkres.
- Při sebrání mince přehrajeme zvuk.
- Při score > 5 přehrajeme fanfáru a zobrazíme vítěznou hlášku.
*/


let avatar, avatarX, avatarY, avatarWidth, avatarHeight;
let coin, coinX, coinY, coinWidth, coinHeight;
let windowWidth, windowHeight;
let score, scoreCount;
let backgroundMusic, coinMusic, victoryMusic;
let victoryTreshold = 5;

avatar = document.getElementById("panacek");
coin = document.getElementById("mince");
score = document.getElementById("score");
backgroundMusic = document.getElementById("hudba");
coinMusic = document.getElementById("zvukmince");
victoryMusic = document.getElementById("zvukfanfara");
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
// tieto veci si radšej dávať do onPageLoad fcie, aby si ošetril prípadné chyby, keď to naťahuje leementy ktoré nie sú ešte naloadované

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
	avatarPosition();
	coinPosition();
};

/**
 * Positions avatar according to current avatarX and avatarY coordinates7
 */
function avatarPosition() {
	avatar.style.left = avatarX + "px";
	avatar.style.top = avatarY + "px";
};

/**
 * Positions coin in random coordinates within window limits7
 */
function coinPosition() {
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
			avatarX = windowWidth;
		}
		avatarX -= speed;
		avatar.src = "obrazky/panacek-vlevo.png"
	} else if (keyStroke === "ArrowRight") {
		if ((avatarX + avatarWidth) >= windowWidth) {
			avatarX = 0 - avatarWidth;
		}
		avatarX += speed;
		avatar.src = "obrazky/panacek-vpravo.png"
	} else if (keyStroke === "ArrowUp") {
		if (avatarY <= 0) {
			avatarY = windowHeight;
		}
		avatarY -= speed;
		avatar.src = "obrazky/panacek-nahoru.png"
	} else if (keyStroke === "ArrowDown") {
		if ((avatarY + avatarHeight) >= windowHeight) {
			avatarY = 0 - avatarHeight;
		}
		avatarY += speed;
		avatar.src = "obrazky/panacek.png"
	};
	avatarPosition();
	checkCollision();
	checkVictory();
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
		coinPosition();
		addToScore();
		coinMusic.play();
	}
};

/**
 * Adds 1 point to current score
 */
function addToScore() {
	scoreCount++;
	score.innerHTML = scoreCount;
};

/**
 * Checks if you have won
 */
function checkVictory() {
	if (scoreCount === victoryTreshold) {
		victoryMusic.play();
		// bolo to otravné, tak som to zakomentovala :)
		// window.alert("You won!")
	}
};