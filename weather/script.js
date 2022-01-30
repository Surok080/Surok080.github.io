const cities = {
	554840: 'Ижевск',
	551487: 'Казань',
	503550: 'Пятигорск',
	694423: 'Севастополь',
	5355782: 'Гавайи'
}

for (let key in cities) {
	let div = document.createElement('option');
	div.value = key;
	div.innerHTML = cities[key];
	document.querySelector('.city').append(div);
}

const param = {
	"url": "https://api.openweathermap.org/data/2.5/",
	"appid": "7d805bb1253aca5ed8f8a5bba0fb6f04"
}

function getWeather() {
	const cityId = document.querySelector('#city').value;
	fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}&lang=ru`)
		.then(weather => {
			return weather.json();
		}).then(showWeather);
}
function showWeather(data) {
	console.log(data);
	document.querySelector('.weather__city').innerHTML = data.name;
	document.querySelector('.weather__temp').innerHTML = `Температура:<br>${Math.round(data.main.temp)} &deg;`;
	document.querySelector('.weather__description').innerHTML = `${data.weather[0].description}`;
	document.querySelector('.weather__feels-like').innerHTML = `Ощущается как:<br>${Math.round(data.main.feels_like)} &deg;`;
	document.querySelector('.features').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
	document.querySelector('.weather__wind').innerHTML = `Ветер со скоростью: ${Math.round(data.wind.speed)} м/с`;

	document.querySelector('.arrow').style.transform = `rotate(${data.wind.deg + 45}deg)`;

}

getWeather();
document.querySelector('#city').onchange = getWeather;
