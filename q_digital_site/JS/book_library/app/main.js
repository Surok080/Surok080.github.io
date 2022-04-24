
const url = 'https://apiinterns.osora.ru/';
const form = document.getElementById('download-file')
const radio = document.getElementsByName('file');
const addTextBtn = document.getElementById('push-write');
const bookList = document.querySelector('.book-list');
const bookName = document.getElementById('book-name');
const bookText = document.getElementById('book-text');
const bookItems = document.querySelector('.book-list__items');
const bookItemsLike = document.querySelector('.book-list__items-like');
const likeBookItems = document.querySelector('.book-list__items-like');
const bookReading = document.querySelector('.rigth-section');

let bookIndividual;
let oldIndex;
let books;
let likeBooks;
let booksItem = [];

//Проверка на наличие данных в локальном хранилище
!localStorage.likeBooks ? likeBooks = [] : likeBooks = JSON.parse(localStorage.getItem('likeBooks'));
!localStorage.books ? books = [] : books = JSON.parse(localStorage.getItem('books'));



//конструктор книги
function Book(name, description) {
	this.name = name;
	this.description = description;
	this.date = new Date();
	this.status = false;
	this.dropLike = false;
}

//Обработчик событий кнопок
document.addEventListener('click', function (event) {
	let index = event.target.dataset.id;

	if (event.target.dataset.delte != undefined) { //Функция удаления книги с анимацией
		booksItem[index].parentElement.parentElement.classList.add('delition');
		setTimeout(() => {
			books.splice(index, 1);
			reloadWindow();
		}, 400);
		bookReading.innerHTML = '';
	} else if (event.target.dataset.read != undefined) { //Закрытие книги при повторном нажатии на кнопку "читать"
		if (index == oldIndex) {
			bookReading.innerHTML = '';
			oldIndex = -1;
		} else {
			bookReading.innerHTML = '';
			bookReading.innerHTML = createReading(books[index], index, false);
			oldIndex = index;
		}
	} else if (event.target.dataset.complite != undefined) { //Отмечает книгу как прочитанная
		books[index].status = !books[index].status;
		if (books[index].status) {
			booksItem[index].classList.add('hide');
		} else {
			booksItem[index].classList.remove('hide');
		}
		reloadWindow();
	} else if (event.target.dataset.edit != undefined) { //Редактирование книги
		bookReading.innerHTML = '';
		bookReading.innerHTML = createReading(books[index], index, false);
		oldIndex = index;

		bookReading.innerHTML = '';
		bookReading.innerHTML = createReading(books[index], index, true);
	} else if (event.target.dataset.save != undefined) { //Сохранить изменения в книге при редактировании
		let textareaBook = document.getElementById('book-reading');
		books[index].description = textareaBook.value;
		bookReading.innerHTML = '';
		bookReading.innerHTML = createReading(books[index], index, false);
		reloadWindow();
	}
});


//создание html структуры одной книги
const createTemplate = (elem, index) => {
	return `<div data-id="${index}" class="book-list__item" draggable="true">
            <div class="book-list__title">${elem.name}</div>
            <div class="book-list__control">

               <input type="button" data-id="${index}" value="Ред." data-edit class="book-list__redaction">
               <input type="button" data-id="${index}" value="Прочитал" data-complite class="book-list__complite ${elem.status ? 'hide' : ''}">
               <input type="button" data-id="${index}" value="Читать" data-read class="book-list__read" >
               <input type="button" data-id="${index}" value="x" data-delte class="book-list__del" >
            </div>
           </div>`
}


//создание html структуры раздела для чтения
const createReading = (elem, index, readonly = false) => {
	return ` <form id='book-reading__form'} >
            <p>${elem.name}<br>
            <textarea ${!readonly ? 'readonly="readonly"' : ''} name="textarea" id="book-reading">${elem.description}</textarea>
         </p>
			<input type="button" data-id="${index}" value="Сохранить" data-save id = 'book-reading__btn' >
      </form>`
}

//фильтр книг по прочтанности
const filterBook = () => {
	const activeBooks = books.length && books.filter(item => item.status == false);
	sortDate(activeBooks);
	const compliteBooks = books.length && books.filter(item => item.status == true);
	sortDate(compliteBooks);
	books = [...activeBooks, ...compliteBooks];
}

//Сортировка книг по дате добавления
const sortDate = item => {
	item.sort(function (a, b) {
		if (a.date < b.date) {
			return 1;
		}
		if (a.date > b.date) {
			return -1;
		}
		return 0;
	});
}

//Проверка наличия книг в хранилище и добавления их на страницу в случае наличия
const addHtmlContent = () => {

	bookItemsLike.innerHTML = '';
	bookItems.innerHTML = '';

	if (books.length > 0) {
		filterBook();
		books.forEach((elem, index) => {
			if (elem.dropLike) {
				bookItemsLike.innerHTML += createTemplate(elem, index);
				bookItems.innerHTML += createTemplate(elem, index);
			} else {
				bookItems.innerHTML += createTemplate(elem, index);
			}

		});
		booksItem = document.querySelectorAll('.book-list__complite')
	}

}
addHtmlContent();

//Загрузка изменений в локал сторедж
const updateLocal = () => {
	localStorage.setItem('books', JSON.stringify(books));
}

//Добавление книги написанной вручную
addTextBtn.addEventListener('click', () => {
	bookIndividual = filter(books, bookName.value);
	if (bookIndividual.length < 1 && bookName.value.length > 0) {
		books.unshift(new Book(bookName.value, bookText.value));
		reloadWindow();
		bookName.value = '';
		bookText.value = '';
	} else  if (bookName.value.length == 0) {
		alert('Введите название книги')
	} else {
		alert('Книга с таким названием уже существует')
	}
})


// Переключение между написанием книги и загрузкой книги
for (let i = 0; i < radio.length; i++) {
	radio[i].onchange = testRadio;
}

//Переключение между загрузкой книги и написанием вручную
function testRadio() {
	const inputDow = document.getElementById('download-file');
	const inputWrit = document.getElementById('download-write');

	if (this.value == 1) {
		inputDow.setAttribute("style", "display:none");
		inputWrit.setAttribute("style", "display:block");
	} else if (this.value == 2) {
		inputDow.setAttribute("style", "display:block");
		inputWrit.setAttribute("style", "display:none");
	}
}

//Отправка загруженного файла на сервер методом ПОСТ
form.addEventListener('submit', (e) => {
	e.preventDefault()

	const files = document.querySelector('[type=file]').files[0];
	const formData = new FormData();
	let reader = new FileReader();

	bookIndividual = filter(books, files.name);

	if (bookIndividual.length < 1) {

		formData.append("login", "Groucho");
		formData.append("file", files);

		fetch(url, {
			method: 'POST',
			body: formData,
		}).then(response => response.json())
			.then(response => {
				console.log(response);
				console.log(`Status: ${response.status}`);
			})

		reader.onload = (function (files) {
			return function (e) {
				books.unshift(new Book(files.name, e.target.result));
				reloadWindow();
			};
		})(files);
		reader.readAsText(files);
	} else {
		alert('Книга с таким названием уже существует');
	}
});




//Фильтр книг на добавление с существующим названием книги
function filter(arr, book) {
	return arr.filter(function (item) {
		return (item.name == book);
	});
};



//реконструкция структуры сайта
const reloadWindow = () => {
	refreshHtml('.items-like__drop-zoneLike', '.book-list__like', "items-like__drop-zoneLike", "Drop Zone");
	refreshHtml('.items__drop-zoneDislike', '.book-list', "items__drop-zoneDislike", "Drop Zone");
	updateLocal();
	addHtmlContent();
	dragAndDrop();
}

const refreshHtml = (childHtml, motherHtml, classHtml, text) => {
	document.querySelector(childHtml).remove();
	let div = document.createElement('div');
	div.className = classHtml;
	div.innerHTML = text;
	document.querySelector(motherHtml).append(div);
}

const dragAndDrop = () => {
	const dropBooks = document.querySelectorAll('.book-list__item');
	const dropZoneLike = document.querySelector('.items-like__drop-zoneLike');
	const dropZoneDislike = document.querySelector('.items__drop-zoneDislike');
	let bookDraggable = '';

	const dragStart = function (event) {
		bookDraggable = event.target.dataset.id;
		setTimeout(() => {
			this.classList.add('none');
		}, 50);
	}
	const dragEnd = function () {
		this.classList.remove('none');
	}
	const dragOver = function (event) {
		event.preventDefault();
	}
	const dragEter = function (event) {
		event.preventDefault();
		this.classList.add('hovered');
	}
	const dragLeave = function () {
		this.classList.remove('hovered');
	}
	const dragDropLike = function () {
		books[bookDraggable].dropLike = true;
		this.classList.remove('hovered');
		reloadWindow();
		bookDraggable = '';
	}
	const dragDropDis = function () {
		books[bookDraggable].dropLike = false;
		this.classList.remove('hovered');
		reloadWindow();
		bookDraggable = '';
	}

	dropBooks.forEach((book) => {
		book.addEventListener('dragstart', dragStart);
		book.addEventListener('dragend', dragEnd);
	});

	dropZoneLike.addEventListener('dragover', dragOver);
	dropZoneLike.addEventListener('dragenter', dragEter);
	dropZoneLike.addEventListener('dragleave', dragLeave);
	dropZoneLike.addEventListener('drop', dragDropLike);

	dropZoneDislike.addEventListener('dragover', dragOver);
	dropZoneDislike.addEventListener('dragenter', dragEter);
	dropZoneDislike.addEventListener('dragleave', dragLeave);
	dropZoneDislike.addEventListener('drop', dragDropDis);

}
dragAndDrop();
