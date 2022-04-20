
let radio = document.getElementsByName('file');
for (let i = 0; i < radio.length; i++) {
	radio[i].onchange = testRadio;
}

function testRadio() {
	const inputDow = document.getElementById('download-file');
	const inputWrit = document.getElementById('download-write');
	console.log(this.value);
	console.log(inputDow);
	if (this.value == 1) {
		inputDow.setAttribute("style", "display:none");
		inputWrit.setAttribute("style", "display:block");
	} else if (this.value == 2) {
		inputDow.setAttribute("style", "display:block");
		inputWrit.setAttribute("style", "display:none");
	}

}

const url = 'https://apiinterns.osora.ru/';
const form = document.getElementById('download-file')

form.addEventListener('submit', (e) => {
	e.preventDefault()

	const files = document.querySelector('[type=file]').files[0];
	const formData = new FormData();

	formData.append("login", "Groucho");
	formData.append("file", files);

	fetch(url, {
		method: 'POST',
		body: formData,
	}).then(response => response.json())
		.then(response => {
			
		})

})

