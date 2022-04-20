const url = 'https://apiinterns.osora.ru/';
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
	e.preventDefault()

	const files = document.querySelector('[type=file]').files[0];
	const formData = new FormData();
	console.log(formData);


	formData.append("login", "Groucho");
	formData.append("file", files);

	fetch(url, {
		method: 'POST',
		body: formData,
	}).then(response => response.json())
		.then(response => {
			console.log(response);
			console.log(response.text);
		})

})
// .then(response => response.json())
//   .then(result => /* обрабатываем результат */)

// document.querySelector('button').addEventListener('click', function () {
// 	let files = document.getElementById('file').files[0];
// 	let reader = new FileReader();
// 	const formData = new FormData();

// 	reader.readAsText(files);
// 	reader.onload = function () {

// 		formData.append("login", "Groucho");
// 		formData.append("file", files);

// 		fetch('https://apiinterns.osora.ru/', {
// 			method: 'POST',
// 			body: formData,
// 		}).then((response) => {
// 			console.log(response)
// 		})

// 	}
// 	reader.onerror = function () {
// 		console.log(reader.error);
// 	}
// })


// function t10(file) {

// 	fetch('https://apiinterns.osora.ru/', {
// 		method: 'POST',
// 		body: file,
// 	}).then((response) => {
// 		console.log(response)
// 	})



	// console.log(file);
	// fetch(`https://apiinterns.osora.ru/`, {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/x-www-form-urlencoded',
	// 	},
	// 	body: `login=Sasha&file=${file}`
	// })
	// 	.then(data => data.text())
	// 	.then(data => {
	// 		console.log(data);
	// 	})
// }

// document.querySelector('button').addEventListener('click', function () {
// 	let file = document.getElementById('file').file[0];
// 	// let file = input.files[0];
// 	let reader = new FileReader();

// 	reader.readAsText(file);

// 	reader.onload = function () {
// 		console.log(reader.result);
// 	};

// 	reader.onerror = function () {
// 		console.log(reader.error);
// 	};
// })
