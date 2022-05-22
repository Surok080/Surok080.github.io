'use strict';

const inputNumberOne = document.getElementById('numberOne');
const inputNumberTwo = document.getElementById('numberTwo');
const inputOperator = document.getElementById('operator');
const inputbutton = document.getElementById('button');
const outputForm = document.getElementById('output-form');
const operator = ['+', '-', '/', '*'];

inputbutton.addEventListener('click', (e) => {
	e.preventDefault();
	validationForm();
});

function validationForm() {

	const arrInputNumbers = document.querySelectorAll('input[data-name]');
	const arrArguments = [];
	outputForm.textContent = '';

	arrInputNumbers.forEach(element => {
		if (isNaN(+element.value)) {
			outputForm.textContent = `${element.dataset.name} число не корректно`;
			return;
		}
		if (+element.value.length === 0) {
			outputForm.textContent = `${element.dataset.name} число не указано`;
			return;
		}
		if (inputOperator.value.length === 0) {
			outputForm.textContent = 'Не введён знак';
			return;
		}
		if (!operator.includes(inputOperator.value)) {
			outputForm.textContent = 'Программа не поддерживает такую операцию \n Доступные операции: +, -, *, /';
			return;
		}

		arrArguments.push(+element.value);

		if (arrArguments.length > 1) {
			outputForm.textContent = operationDefinition(arrArguments);
		}
	});
}

function operationDefinition(arrArguments) {
	let x = 0;

	//Можно было бы обойтись одной строкой, но я так и не понял как преобразовать из строки в символ
	// return arrArguments.reduce((a, b) =>  `${a} ${inputOperator.value} ${b}`);

	if (inputOperator.value === "+") {
		return 'Результат сложения: ' + arrArguments.reduce((a, b) => a + b);
	} else if (inputOperator.value === "-") {
		return 'Результат вычетания: ' + arrArguments.reduce((a, b) => a - b);
	} else if (inputOperator.value === "*") {
		return 'Результат умножения: ' + arrArguments.reduce((a, b) => a * b);
	} else if (inputOperator.value === "/") {
		return 'Результат деления: ' + arrArguments.reduce((a, b) => a / b);
	}
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
