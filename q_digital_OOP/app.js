// Создать 2 класса для управления Самолетами (2 вида МИГ, ТУ-154).
// Самолеты имеют методы: взлет, посадка, с одинаковой реализацией.
// Свойства: название самолета, максимальная скорость. 
// Значения можно определить при создании самолета.
// Для самолета типа МИГ реализовать дополнительный метод "Атака".
// Добавить возможность получить статус состояния самолета, находится он в воздухе или на земле

// Реализовать класс Аэропорт.
// Методы аэропорта:
// -Принять самолет, !
// -Самолет освободил место и улетел, !
// -Самолет ушел на стоянку,  переделать в статус 2 !
// -Самолет готов взлетать, переделать в статус 3 !
// -Самолет заправлен, 
// -Самолет на ремонте.
// Реализовать отношения между созданными классами самолетов и Аэропорта:
// Ассоциация, Агрегация, Композиция.
// status: 0- на земле, 1- в воздухе, 

class Airplane {
	#name;
	#speed;
	static #counter = 0;
	#num;
	#status;
	#currentAirport;

	constructor(name, speed) {
		this.#name = name;
		this.#speed = speed;
		this.#status = 1;
		this.#num = Airplane.#counter;
		this.#currentAirport = '';
		Airplane.#counter++;
	}

	//------------------------
	land(airport) {
		airport.landAirplane(this);
	}
	takeoff(airport) {
		airport.takeoffAirplane(this);
	}
	takeoffFreed(airport){
		airport.takeoffFreedAirport(this);
	}
	//------------------------

	get name() {
		return this.#name;
	}
	set name(name) {
		if (name === '') {
			throw new Error ('name field cannot be empty');
		} else {
			this.#name = name;
		}
		
	}
	get statusAirplane() {
		return this.#status
	}
	set statusAirplane(status) {

		if (status === 0 || status === 1 || status === 2 || status === 3) {
			this.#status = status;
		} else {
			throw new Error ('name field cannot be empty');
		}

		
	}
	get currentAirport() {
		return this.#currentAirport
	}
	set currentAirport(currentAirport) {
		this.#currentAirport = currentAirport;
	}

	readyToFly() {
		this.#status = 3;
	}

	parkingAirplane() {
		this.#status = 2;
	}

	getNum() {
		return this.#num;
	}
	getStatus() {
		if (this.#status == 0) {
			alert(`${this.name} находится на земле`)
		} else if (this.#status == 1) {
			alert(`${this.name} находится в воздухе`)
		} else if (this.#status == 2) {
			alert(`${this.name} находится на стоянке`)
		} else if (this.#status == 3) {
			alert(`${this.name} готов к взлету`)
		}
		return this.#status;
	}
}

//Класс самолета МИГ----------------
class Mig extends Airplane {

	constructor(name, speed) {
		super(name, speed);
		this.name = name + '_' + this.getNum();

	}
	attack() {
		//Проверку добавить в воздухе или нет
		alert(this.name + ' атакует - ATTACK ');
	}
}

//Класс самолета Ту154----------------
class Tu154 extends Airplane {
	constructor(name, speed) {
		super(name, speed);
		this.name = name + '_' + this.getNum();
	}
}

//Класс Аэропорта------------------
class Airport {
	#airplaneToAirport = []; //самолёты расположенные в аэропорту
	#statusLand; //готовность аэропорта к отправке и принятию самолёта на взлёт 
	#name; // наименование аэропорта

	constructor(name) {
		this.#name = name
		this.#airplaneToAirport = [];
		this.#statusLand = false;
	}

	get name() {
		return this.#name;
	}
	get airplaneToAirport() {
		return this.#airplaneToAirport
	}
	set airplaneToAirport(airplaneToAirport) {
		this.#airplaneToAirport = airplaneToAirport;
	}

	set statusLand(statusLand) {
		this.#statusLand = statusLand;
	}

	onReadyToAccept() {
		this.statusLand = false;
	}

	readyToAccept() {
		this.statusLand = true;
	}

	airportBan(airplane){
		alert(`Запрет на взлет и посадку ${airplane.name} , Аэропорт - ${this.name} не готов`);
	}
	takeoffFreedAirport(airplane){
		this.readyToAccept();
		this.takeoffAirplane(airplane);
	}


	landAirplane(airplane) {
		if (airplane.statusAirplane == 1) {
			if (this.#statusLand) {
				this.airplaneToAirport.push(airplane);
				airplane.currentAirport = this;
				this.onReadyToAccept(); //Статус аэропорта переходит в - "не готов", т.к. полоса занята посадкой
				airplane.statusAirplane = 0;
			} else {
				this.airportBan(airplane)
			}
		} else {
			alert(`Посадка не возможна`);
			airplane.getStatus()
		}

	}
	takeoffAirplane(airplane) {
		if (airplane.statusAirplane == 3) {
			if (this.#statusLand) {
				for (let i = 0; i < this.airplaneToAirport.length; i++) {
					if (this.airplaneToAirport[i].name == airplane.name) {
						this.airplaneToAirport.splice(i, 1)
						airplane.currentAirport = '';
					}
				}
				airplane.statusAirplane = 1;
			} else {
				this.airportBan(airplane)
			}
		} else {
			alert(`Взлет не возможен`);
			airplane.getStatus()
		}
	}
}



const mig = new Mig('mig', 1500);
const tu154 = new Tu154('tu154', 900);
const airport = new Airport('Vnukovo');




airport.readyToAccept();


// console.log(mig);
mig.land(airport);

// airport.readyToAccept();

mig.readyToFly();


mig.takeoffFreed(airport)

// mig.takeoff(airport)
// airport.readyToAccept();
console.log(mig);

// takeoffFreedAirport(airplane)
// tu154.land(airport)
// tu154.land(airport)
// tu154.takeoff(airport)
// mig.takeoff(airport)


// mig.parkingAirplane(); - Отправить самолет на стоянку
// mig.readyToFly(); - Привести самолет в готовность взлета;
// mig.takeoffFreed(airport); - Аэропорт готов к взлету, самолет взлетает;
// airport.readyToAccept(); - Аэропорт готов принять самолет
// mig.land(airport) - Иннициация посадки самолета МИГ из аэропорта
// tu154.takeoff(airport) - Иннициация взлета самолета ту154 из аэропорта
// airport.statusLand() - статуса аэропорта на отправку и принятие самолета
// mig.getStatus() - Проверка самолета на земле или в полете
// console.log(airport.airplaneToAirport) - Показать самолеты в аэропорту


// tu154.takeoff(airport)


// tu154.land(airport2)

// console.log(mig.attack());
console.log(airport);

// console.log();



