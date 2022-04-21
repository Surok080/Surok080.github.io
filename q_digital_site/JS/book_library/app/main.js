
const url = 'https://apiinterns.osora.ru/';
const form = document.getElementById('download-file')
const radio = document.getElementsByName('file');
const addTextBtn = document.getElementById('push-write');
const bookList = document.querySelector('.book-list');
const bookName = document.getElementById('book-name');
const bookText = document.getElementById('book-text');
const bookItems = document.querySelector('.book-list__items');
const bookReading = document.querySelector('.rigth-section');
let oldIndex;
let books;

!localStorage.books ? books = [] : books = JSON.parse(localStorage.getItem('books'));

let booksItem = [];

function Book(name, description) {
	this.name = name;
	this.description = description;
	this.status = false;
}



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
const createReading = (elem, index, readonly = false) => {
	return ` <form id="book-reading__form">
            <p>${elem.name}<br>
            <textarea ${!readonly ? 'readonly="readonly"' : ''} name="textarea" id="book-reading">${elem.description}</textarea>
         </p>
         <div id = 'book-reading__btn' onclick="saveEditBook(${index})">Сохранить</div>
      </form>`
}



const deleteBook = index => {

	booksItem[index].parentElement.parentElement.classList.add('delition');
	setTimeout(() => {
		books.splice(index, 1);
		reloadWindow();
	}, 400);
}

const saveEditBook = index => {
	let textareaBook = document.getElementById('book-reading');
	books[index].description = textareaBook.value;
	reloadWindow();
}

const filterBook = () => {
	const activeBooks = books.length && books.filter(item => item.status == false);
	const compliteBooks = books.length && books.filter(item => item.status == true);
	books = [...activeBooks, ...compliteBooks];
}
// 
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

const editBook = (index) => {
	console.log(index);
	bookReading.innerHTML = '';
	bookReading.innerHTML = createReading(books[index], index, true);
}

const readComplite = index => {
	// let compliteBook = document.querySelectorAll('.book-list__complite');
	books[index].status = !books[index].status;
	if (books[index].status) {
		booksItem[index].classList.add('hide');
	} else {
		booksItem[index].classList.remove('hide');
	}
	reloadWindow();
}



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

const updateLocal = () => {
	localStorage.setItem('books', JSON.stringify(books));
}

addTextBtn.addEventListener('click', () => {
	books.unshift(new Book(bookName.value, bookText.value));
	reloadWindow();
	bookName.value = '';
	bookText.value = '';
})


// Переключение между написанием книги и загрузкой книги
for (let i = 0; i < radio.length; i++) {
	radio[i].onchange = testRadio;
}

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


form.addEventListener('submit', (e) => {
	e.preventDefault()

	const files = document.querySelector('[type=file]').files[0];
	const formData = new FormData();
	let reader = new FileReader();

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
});

const reloadWindow = () => {
	updateLocal();
	addHtmlContent();
}
