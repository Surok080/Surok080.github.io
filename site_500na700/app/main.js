$(function () {
	$('.slider').slick({
		infinite: true,
		adaptiveHeight: true,
		speed: 600,
		slidesToShow: 1,
		centerMode: true,
		variableWidth: true,
		autoplay: false,
		autoplaySpeed: 4000,
	})
})

function menubar() {
	document.querySelector('.header__block').style.opacity = 1;
	document.querySelector('.header__block').style.visibility = 'visible';
	document.querySelector('.header__link > ul').style.opacity = 1;
	document.querySelector('.header__link > ul').style.visibility = 'visible';
	document.querySelector('.header__row').style.padding = '72px 0 287px 0';

}
function delMenubar() {
	document.querySelector('.header__block').style.opacity = 0;
	document.querySelector('.header__block').style.visibility = 'hidden';
	document.querySelector('.header__link > ul').style.opacity = 0;
	document.querySelector('.header__link > ul').style.visibility = 'hidden';
	document.querySelector('.header__row').style.padding = '72px 0 7px 0';
	document.querySelector('.questions__text').style.opacity = 0;
	document.querySelector('.questions__text').style.visibility = 'hidden';
}

function accordion() {
	this.lastElementChild.classList.toggle("activeTogo");
}

document.querySelector('.header__block').onclick = delMenubar;

document.querySelectorAll('.header__link').forEach(item => {
	item.addEventListener('click', menubar)
})

document.querySelectorAll('.header__listVlog > li').forEach(item => {
	console.log(this);
	item.addEventListener('click', delMenubar)
})


document.querySelectorAll('.questions__item').forEach(item => {
	item.addEventListener('click', accordion)
})

$(document).ready(function () {
	$('.header__burger').click(function (event) {
		menubar()
		delMenubar()
		$('.header__burger, .header__nav').toggleClass('active');
	});
});

document.addEventListener('DOMContentLoaded', function () {

	const email = document.getElementById("mail");
	const form = document.getElementById("form");

	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();
		let error = formValidate(form)
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req')

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemvoeError(input);
			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		function formAddError(input) {
			input.parentElement.classList.add('_error');
			input.classList.add('_error');
		}
		function formRemvoeError(input) {
			input.parentElement.classList.remove('_error');
			input.classList.remove('_error');
		}
		function emailTest(input) {
			return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)*(\.\w{2,8})+$/.test(input.value);
		}
	}
});

$(function () {
	$("#tel").mask("8(999) 999-99-99");
	$("#data").mask("99.99.9999", { placeholder: "11.02.2022" });
	$("#time").mask("99:99", { placeholder: "15:00" });
});


