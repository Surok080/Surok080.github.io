
const url = 'https://apiinterns.osora.ru/';
const form = document.getElementById('download-file')
const radio = document.getElementsByName('file');
const addTextBtn = document.getElementById('push-write');
const bookList = document.querySelector('.book-list');
const bookName = document.getElementById('book-name');
const bookText = document.getElementById('book-text');
const bookItems = document.querySelector('.book-list__items');
const likeBookItems = document.querySelector('.book-list__items-like');
const bookReading = document.querySelector('.rigth-section');
let bookIndividual;
let oldIndex;
let books;
let likeBooks;

!localStorage.likeBooks ? likeBooks = [] : likeBooks = JSON.parse(localStorage.getItem('likeBooks'));
!localStorage.books ? books = [] : books = JSON.parse(localStorage.getItem('books'));

let booksItem = [];

//конструктор книги
function Book(name, description) {
	this.name = name;
	this.description = description;
	this.date = new Date();
	this.status = false;
}


//создание html структуры одной книги
const createTemplate = (elem, index) => {
	return `<div class="book-list__item">
            <div class="book-list__title">${elem.name}</div>
            <div class="book-list__control">
               <div onclick='editBook(${index})' class="book-list__redaction">Ред.</div>
               <div onclick='readComplite(${index})'  class="book-list__complite ${elem.status ? 'hide' : ''}">Прочитал</div>
               <div onclick='readBook(${index})' class="book-list__read">Читать</div>
               <div onclick='deleteBook(${index})' class="book-list__del">x</div>
            </div>
           </div>`
}

//создание html структуры раздела для чтения
const createReading = (elem, index, readonly = false) => {
	return ` <form id="book-reading__form">
            <p>${elem.name}<br>
            <textarea ${!readonly ? 'readonly="readonly"' : ''} name="textarea" id="book-reading">${elem.description}</textarea>
         </p>
         <div id = 'book-reading__btn' onclick="saveEditBook(${index})">Сохранить</div>
      </form>`
}


//Функция удаления книги с анимацией
const deleteBook = index => {
	booksItem[index].parentElement.parentElement.classList.add('delition');
	setTimeout(() => {
		books.splice(index, 1);
		reloadWindow();
	}, 400);
}

//Сохранить изменения в книге при редактировании
const saveEditBook = index => {
	let textareaBook = document.getElementById('book-reading');
	books[index].description = textareaBook.value;
	bookReading.innerHTML = '';
	bookReading.innerHTML = createReading(books[index], index, false);
	reloadWindow();
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
	item.sort(function(a,b){
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
	bookItems.innerHTML = '';
	if (books.length > 0) {
		filterBook();
		books.forEach((elem, index) => {
			bookItems.innerHTML += createTemplate(elem, index);
		});
		booksItem = document.querySelectorAll('.book-list__complite')
	}
}
addHtmlContent();

//Редактирование книги
const editBook = (index) => {
	console.log(index);
	bookReading.innerHTML = '';
	bookReading.innerHTML = createReading(books[index], index, true);
}

//Отмечает книгу как прочитанная
const readComplite = index => {
	books[index].status = !books[index].status;
	if (books[index].status) {
		booksItem[index].classList.add('hide');
	} else {
		booksItem[index].classList.remove('hide');
	}
	reloadWindow();
}


//Закрытие книги при повторном нажатии на кнопку "читать"
const readBook = index => {
	if (index == oldIndex) {
		bookReading.innerHTML = '';
		oldIndex = -1;
	} else {
		bookReading.innerHTML = '';
		bookReading.innerHTML = createReading(books[index], index, false);
		oldIndex = index;
	}
}

//Загрузка изменений в локал сторедж
const updateLocal = () => {
	localStorage.setItem('books', JSON.stringify(books));
}

//Добавление книги написанной вручную
addTextBtn.addEventListener('click', () => {

	bookIndividual = filter(books, bookName.value);
if (bookIndividual.length < 1) {
		books.unshift(new Book(bookName.value, bookText.value));
		reloadWindow();
		bookName.value = '';
		bookText.value = '';
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
				console.log(response)
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


//реконструкция структуры сайта
const reloadWindow = () => {
	updateLocal();
	addHtmlContent();
	// addHtmlContent(likeBooks,likeBookItems);
}

function filter (arr,book){
	return arr.filter(function(item,i,arr){
		return (item.name == book);
	});
};



