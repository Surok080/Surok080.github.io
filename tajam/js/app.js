


$(function () {
	// Header_fixed
	let header = $("#header");
	let intro = $("#intro");
	let introH = intro.innerHeight();
	let scrollPos = $(window).scrollTop();
	let nav = $("#nav");
	let navToggle = $("#navToggle");
	checkScroll(scrollPos, introH);


	$(window).on("scroll resize", function () {
		let introH = intro.innerHeight();
		let scrollPos = $(this).scrollTop();

		checkScroll(scrollPos, introH);
	});

	function checkScroll(scrollPos, introH) {
		if (scrollPos > introH - 20) {
			header.addClass("fixed");
		} else {
			header.removeClass("fixed");
		}
	}

	$("[data-scroll]").on("click", function (event) {
		event.preventDefault();

		let elementId = $(this).data('scroll');
		let elementOffset = $(elementId).offset().top;

		nav.removeClass("show");

		$("html, body").animate({
			scrollTop: elementOffset - 50
		}, 700);
	});

	// navToggle


	navToggle.on("click", function (event) {
		event.preventDefault();

		nav.toggleClass("show");

	})

});

//-----reviews ative---------

function delClassActive() {
	let div = document.querySelectorAll('.reviews__foto');
	for (let i = 0; i < div.length; i++) {
		for (let z = 0; z < div[i].classList.length; z++) {
			if (div[i].classList[z] == 'focus-foto') {
				div[i].classList.remove("focus-foto");
			}
		}
	}

	div = document.querySelectorAll('.reviews__item');
	for (let i = 0; i < div.length; i++) {
		for (let z = 0; z < div[i].classList.length; z++) {
			if (div[i].classList[z] == 'focus-item') {
				div[i].classList.remove("focus-item");
			}
		}
	}

};





document.querySelector('.f1').onclick = function () {
	delClassActive();
	document.querySelector('.f1').classList.add('focus-foto');
	document.querySelector('.i1').classList.add('focus-item');

};
document.querySelector('.f2').onclick = function () {
	delClassActive();
	document.querySelector('.f2').classList.add('focus-foto');
	document.querySelector('.i2').classList.add('focus-item');
};
document.querySelector('.f3').onclick = function () {
	delClassActive();
	document.querySelector('.f3').classList.add('focus-foto');
	document.querySelector('.i3').classList.add('focus-item');
};
document.querySelector('.f4').onclick = function () {
	delClassActive();
	document.querySelector('.f4').classList.add('focus-foto');
	document.querySelector('.i4').classList.add('focus-item');
};
document.querySelector('.f5').onclick = function () {
	delClassActive();
	document.querySelector('.f5').classList.add('focus-foto');
	document.querySelector('.i5').classList.add('focus-item');
};


$(document).on('click', '#popup__close', function () {
	jQuery("iframe").each(function () {
		jQuery(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
	});
});