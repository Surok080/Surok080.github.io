let item = ["Козел", "Солнце", "Гитара", "Остров", "дЕйствие", "Велосипед", "вИСИлица", "Дурак"]; //Массив со словами-загадками
let randomItem = item[Math.floor(Math.random() * item.length)].toLowerCase(); // Выбор случайного слова из массива загадок, преобразование в нижний регистр
let userItem = 0; // Вариант ответа игрока (1 буква, русская)
let score = 0;// Угадано букв
let userScoreItem = ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"]; // Массив полей для ответа
let lengthItem = randomItem.length; // Длина загаданного слова
let scoreItem = 0; // Сколько данных букв в загаданном слове
let rusItem = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"; // Русский алфавит для определения на каком языке игрок ввел букву
let result = "";
let wrongItem = [];
let stepGame = 6;
let stepGameFirst = stepGame;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let startLineX = 100;
let endLineX = 130;
let count = 10;

userScoreItem = userScoreItem.slice(0, lengthItem); // Ограничение поля для ответов
result = userScoreItem.join(' ');

for (let i = 0; i < lengthItem; i++) {
	let canvas = document.getElementById("canvas");
	let ctx = canvas.getContext("2d");
	ctx.strokeStyle = "Pink";
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.moveTo(startLineX, 210);
	ctx.lineTo(endLineX, 210);
	ctx.stroke();
	startLineX += 40;
	endLineX += 40;
}
while (randomItem != userItem) {


	if (randomItem == userScoreItem.join('')) {
		alert("ВЫ ПОБЕДИЛИ!  Правильный ответ  -  " + result)
		break;
	} else if (stepGame == 0) {
		alert("Вы проиграли, попытки закончились Правильный ответ  -  " + result)
	}

	let exit = confirm("Продолжаем играть?");
	if (exit) {

		alert("Угадано букв - " + score + "\n" + "Всего букв - " + randomItem.length
			+ "\n" + "Угаданные буквы - " + result + "\n" +
			"История введенных (неправильных букв) - " + wrongItem + "\n" + "Осталось попыток - " + stepGame);
		userItem = prompt("Попробуйте угадать слово, введите букву и нажмите ОК").toLowerCase();
		while (userItem.length > 1 || userItem.length == 0 || (rusItem.indexOf(userItem) < 0)) {
			userItem = prompt("Введите 1, Русскую букву и нажмите ОК").toLowerCase();
		}
		if (userScoreItem.indexOf(userItem) < 0 && wrongItem.indexOf(userItem) < 0) {
			scoreItem = 0;
			if (randomItem.indexOf(userItem) >= 0) {
				for (let i = 0; i < randomItem.length; i++) {
					if (userItem === randomItem[i]) {
						userScoreItem[i] = userItem;
						scoreItem = scoreItem + 1;
						score = score + 1;
						result = userScoreItem.join(' ');
						ctx.font = "20px Courier";
						ctx.fillStyle = "Black";
						ctx.textAlign = "left";
						ctx.textBaseline = "top";
						ctx.fillText(userItem.toUpperCase(), (i * 40) + 110, 180);

					}
				}
				alert("Буква - " + userItem.toUpperCase() + " - встречается - " + scoreItem + " раз");
			} else {
				stepGame--;
				ctx.font = "20px Courier";
				ctx.fillStyle = "Black";
				ctx.textAlign = "left";
				ctx.textBaseline = "top";
				ctx.strokeStyle = "Pink";
				ctx.lineWidth = 4;
				ctx.fillText(userItem.toUpperCase(), 200, count);
				ctx.beginPath();
				ctx.moveTo(195, count + 10);
				ctx.lineTo(225, count + 10);
				ctx.stroke();
				count += 20;


				if (userScoreItem.indexOf(userItem) < 0 && wrongItem.indexOf(userItem) < 0) {
					wrongItem.push(userItem);
				}
				alert("Буква - " + userItem.toUpperCase() + " - встречается - " + scoreItem + " раз");
				if (stepGameFirst - stepGame == 1) {
					ctx.strokeStyle = "Pink";
					ctx.lineWidth = 4;
					ctx.strokeRect(50, 50, 20, 20);

				} else if (stepGameFirst - stepGame == 2) {
					ctx.beginPath();
					ctx.moveTo(60, 70);
					ctx.lineTo(60, 110);
					ctx.stroke();

				} else if (stepGameFirst - stepGame == 3) {
					ctx.beginPath();
					ctx.moveTo(60, 90);
					ctx.lineTo(35, 80);
					ctx.stroke();

				} else if (stepGameFirst - stepGame == 4) {
					ctx.beginPath();
					ctx.moveTo(60, 90);
					ctx.lineTo(85, 80);
					ctx.stroke();
				} else if (stepGameFirst - stepGame == 5) {
					ctx.beginPath();
					ctx.moveTo(61, 108);
					ctx.lineTo(45, 140);
					ctx.stroke();
				} else if (stepGameFirst - stepGame == 6) {
					ctx.beginPath();
					ctx.moveTo(59, 108);
					ctx.lineTo(75, 140);
					ctx.stroke();
				}
			}
		} else {
			alert("Буква - " + userItem.toUpperCase() + " - уже была");
		}

	}
	else {
		break;
	}
}
