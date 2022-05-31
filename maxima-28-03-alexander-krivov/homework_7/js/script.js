'use strict';

const inputNumberOne = document.getElementById('numberOne');
const inputNumberTwo = document.getElementById('numberTwo');
const inputOperator = document.getElementById('operator');
const inputbutton = document.getElementById('button');
const outputForm = document.getElementById('output-form');
const operator = ['+', '-', '/', '*'];
//Есть ли смысл все эти переменные закинуть в функцию validationForm() что бы 
//считывание параметров происходило только при нажатии на кнопку, и тогда уже можно будет
//для переменных сразу задавать .....value.trim(); и везде не писать. Это позволит
//немного сократить код
inputbutton.addEventListener('click', (e) => {
	e.preventDefault();
	validationForm();
});

function validationForm() {

	const arrInputNumbers = document.querySelectorAll('input[data-name]');
	const arrArguments = [];
	outputForm.textContent = '';

	arrInputNumbers.forEach(element => {
		if (isNaN(+element.value.trim())) {
			outputForm.textContent = `${element.dataset.name} число не корректно`;
			return;
		}
		if (+element.value.trim().length === 0) {
			outputForm.textContent = `${element.dataset.name} число не указано`;
			return;
		}
		if (inputOperator.value.trim().length === 0) {
			outputForm.textContent = 'Не введён знак';
			return;
		}
		if (!operator.includes(inputOperator.value.trim())) {
			outputForm.textContent = 'Программа не поддерживает такую операцию \n Доступные операции: +, -, *, /';
			return;
		}

		arrArguments.push(+element.value);

		if (arrArguments.length > 1) {
			if (operationDefinition(arrArguments) === 'Результат деления: NaN') {
				outputForm.textContent = 'У нас неопределенность, но зачем нам это..?';
			} else if (operationDefinition(arrArguments) === 'Результат деления: Infinity') {
				outputForm.textContent = 'У нас бесконечность, но зачем нам это..?';
			} else {
				outputForm.textContent = operationDefinition(arrArguments);
			}
		}

	});
}

function operationDefinition(arrArguments) {
	let x = 0;

	//Можно было бы обойтись одной строкой, но я так и не понял как преобразовать из строки в символ
	// return arrArguments.reduce((a, b) =>  `${a} ${inputOperator.value.trim()} ${b}`);

	/**
	 * На сколько резонно использовать тернарный оператор? Данная строка получается длинее и менее читаема.
	 */

	// return (inputOperator.value.trim() === "+") ? 'Результат сложения: ' + arrArguments.reduce((a, b) => a + b) : (inputOperator.value.trim() === "-") ? 'Результат вычетания: ' + arrArguments.reduce((a, b) => a - b) : (inputOperator.value === "*") ? 'Результат умножения: ' + arrArguments.reduce((a, b) => a * b) : (inputOperator.value === "/") ? 'Результат деления: ' + arrArguments.reduce((a, b) => a / b) : '';

	switch (inputOperator.value.trim()) {
		case "+":
			return 'Результат сложения: ' + arrArguments.reduce((a, b) => a + b);
		case "-":
			return 'Результат вычетания: ' + arrArguments.reduce((a, b) => a - b);
		case "*":
			return 'Результат умножения: ' + arrArguments.reduce((a, b) => a * b);
		case "/":
			return 'Результат деления: ' + arrArguments.reduce((a, b) => a / b);
		default:
			break;
	}

	/**
	 * Классический if
	 */

	// if (inputOperator.value.trim() === "+") {
	// 	return 'Результат сложения: ' + arrArguments.reduce((a, b) => a + b);
	// } else if (inputOperator.value.trim() === "-") {
	// 	return 'Результат вычетания: ' + arrArguments.reduce((a, b) => a - b);
	// } else if (inputOperator.value === "*") {
	// 	return 'Результат умножения: ' + arrArguments.reduce((a, b) => a * b);
	// } else if (inputOperator.value === "/") {
	// 	return 'Результат деления: ' + arrArguments.reduce((a, b) => a / b);
	// }

}


/**
 * Способ решения который описан ниже, показался более простым,
 * но как будто менее универсальным(адаптивным).
 */
// ====================================================================
// inputbutton.addEventListener('click', (e) => {
// 	e.preventDefault();
// 	const numberOne = !inputNumberOne.value ? '' : +inputNumberOne.value;
// 	const numberTwo = !inputNumberTwo.value ? '' : +inputNumberTwo.value;

// 	outputForm.textContent = validationForm(numberOne, numberTwo);
// });

// function validationForm(numberOne, numberTwo) {

	// if (isNaN(numberOne)) {
	// 	return 'Некорректный ввод первого числа';
	// }
	// if (isNaN(numberTwo)) {
	// 	return 'Некорректный ввод второго числа';
	// }
	// if (numberOne.length === 0) {
	// 	return 'Первое число не указано';
	// }
	// if (numberTwo.length === 0) {
	// 	return 'Второе число не указано';
	// }
	// if (inputOperator.value.length === 0) {
	// 	return 'Не введён знак';
	// }
	// if (!operator.includes(inputOperator.value)) {
	// 	return 'Программа не поддерживает такую операцию \n Доступные операции: +, -, *, /';
	// }

	// return operationDefinition(numberOne, numberTwo);
// }

// function operationDefinition(numberOne, numberTwo) {
// 	if (inputOperator.value === "+") {
// 		return numberOne + numberTwo;
// 	} else if (inputOperator.value === "-") {
// 		return numberOne - numberTwo;
// 	} else if (inputOperator.value === "*") {
// 		return numberOne * numberTwo;
// 	} else if (inputOperator.value === "/") {
// 		return numberOne / numberTwo;
// 	}
// }
// ====================================================================
