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
      outputForm.textContent = operationDefinition(arrArguments);
    }

  });
}

function operationDefinition(arrArguments) {
  let x = 0;

  switch (inputOperator.value.trim()) {
    case "+":
      return 'Результат сложения: ' + arrArguments.reduce((a, b) => a + b);
    case "-":
      return 'Результат вычетания: ' + arrArguments.reduce((a, b) => a - b);
    case "*":
      return 'Результат умножения: ' + arrArguments.reduce((a, b) => a * b);
    case "/":
      return 'Результат деления: ' + ((arrArguments[0] === 0 || arrArguments[1] === 0) ? "неккоректное вычисление, не используйте 0 при делении" : arrArguments.reduce((a, b) => a / b));
    default:
      break;
  }
}
