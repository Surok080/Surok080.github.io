// Создать 2 класса для управления Самолетами (2 вида МИГ, ТУ-154).
// Самолеты имеют методы: взлет, посадка, с одинаковой реализацией.
// Свойства: название самолета, максимальная скорость. 
// Значения можно определить при создании самолета.
// Для самолета типа МИГ реализовать дополнительный метод "Атака".
// Добавить возможность получить статус состояния самолета, находится он в воздухе или на земле

// Реализовать класс Аэропорт.
// Методы аэропорта:
// -Принять самолет,
// -Самолет освободил место и улетел,
// -Самолет ушел на стоянку,
// -Самолет готов взлетать,
// -Самолет заправлен,
// -Самолет на ремонте.
// Реализовать отношения между созданными классами самолетов и Аэропорта:
// Ассоциация, Агрегация, Композиция.
// status: 0- на земле, 1- в воздухе.

class Airplane {
	#name;
	#speed;
	static #counter = 0;
	#num;
	#status;



	constructor (name, speed){
		this.#name = name;
		this.#speed = speed;
		this.#status = 0;
		this.#num = Airplane.#counter;
		Airplane.#counter++;
	}

//------------------------
	land(airport) {
		airport.landAirplane(this);

		console.log(this)
	}
	takeoff(airport) {
		airport.takeoffAirplane(this);
	}
//------------------------

	getNum(){
		return this.#num;
	}
	getName() {
		return this.#name;
	}
}

class Mig extends Airplane {

	constructor(name,speed){
		super(name, speed);
		this.#name = name;

	}
	attack() {
			// alert(this.name + ' атакует - ATTACK ');
			console.log(airport.getPrin())
		}
}

class Tu154 extends Airplane {
	constructor(name,speed){
		super(name,speed);
		this.#name = name + '_' + this.getNum();
	}
}

class Airport {
	#airArray=[];
	#statusLand;
	#name;

	constructor(name){
		this.#name = name
		this.#airArray = [];
		this.#statusLand = true;
	}

	status(){
		this.#statusLand = !this.#statusLand;
	}

	getPrin(){
		return this.#name;
	}


	landAirplane(airplane){
		if (this.#airArray.find(item => item.#name == airplane.#name) !== undefined) {
			alert('Данный самолет уже выполнил посадку');
			// this.airArray.push(airplane);
		} else {
			this.#airArray.push(airplane);
		}
		airplane.status = 0;
	}
	takeoffAirplane(airplane){
		console.log(this)
		if (this.#statusLand) {
		if (this.#airArray.find(item => item.#name == airplane.#name) == undefined) {
			alert('Данный самолет уже выполнил взлет');
		}

		for (let i = 0; i <this.#airArray.length; i++) {
			if (this.#airArray[i].#name == airplane.#name) {
				this.#airArray.splice(i,1)

			}	
		}

} else {
	alert('Запрет на взлет, Аэропорт не готов');
}
	airplane.status = 1;	
	}


}



const mig = new Mig ('mig',1500);
const tu154 = new Tu154 ('tu154',900);
const airport = new Airport('Vnukovo');
mig.land(airport)
tu154.land(airport)
// tu154.land(airport)
airport.status()
tu154.takeoff(airport)
// mig.takeoff(airport)

// tu154.land(airport2)

// console.log(mig.attack());
console.log(airport);
console.log(tu154);
console.log(mig);








// Класс Самолет (
// 	название
// 	максCкорость

// 	конструктор (название, максCкорость)
// 	this.название = название
// 	this.максCкорость = максCкорость

// 	статусПолета = фалс

// 	Метод взлет (
// 		Если статусПолета == фалс 
// 		тогда меняем на тру
// 		Если статусПолета == тру тогда ничего не делаем
// 		)
// 	Метод посадка (
// 		Если статусПолета == тру 
// 		тогда меняем на тру
// 		Если статусПолета == фалс тогда ничего не делаем
// 		)
// 	)

// Класс МИГ наследует Самолет (
// 	супер()?????
// 	метод Атака (
// 		Атака
// 		)
// 	)