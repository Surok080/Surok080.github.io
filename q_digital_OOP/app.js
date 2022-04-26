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
	#currentAirport;

	constructor(name, speed) {
		this.name = name;
		this.#speed = speed;
		this.#status = 0;
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
	//------------------------

	get name() {
		return this.#name;
	}
	set name(name) {
		this.#name = name;
	}
	get statusFly() {
		return this.#status
	}
	set statusFly(status) {
		this.#status = status;
	}
	get currentAirport() {
		return this.#currentAirport
	}
	set currentAirport(currentAirport) {
		this.#currentAirport = currentAirport;
	}



	getNum() {
		return this.#num;
	}
	getStatusFly() {
		if (this.#status == 0) {
			alert(`${this.name} находится на земле`)
		} else if (this.#status == 1) {
			alert(`${this.name} находится в воздухе`)
		}
		return this.#status;
	}
}

//Вид самолета МИГ----------------
class Mig extends Airplane {

	constructor(name, speed) {
		super(name, speed);
		this.name = name + '_' + this.getNum();

	}
	attack() {
		// alert(this.name + ' атакует - ATTACK ');
		console.log(airport.getPrin())
	}
}

//Вид самолета Ту154----------------
class Tu154 extends Airplane {
	constructor(name, speed) {
		super(name, speed);
		this.name = name + '_' + this.getNum();
	}
}

//Класс Аэропорта------------------
class Airport {
	#airplaneToAirport = [];
	#statusLand;
	#name;

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

	OnReadyToAccept() {
		this.statusLand = false;
	}

	readyToAccept() {
		this.statusLand = true;
	}


	landAirplane(airplane) {
		if (this.#statusLand) {
			if (this.airplaneToAirport.find(item => item.name == airplane.name) !== undefined) {
				alert('Данный самолет уже находится в этом аэропорту');
			} else {
				this.airplaneToAirport.push(airplane);
				airplane.currentAirport = this;
				this.OnReadyToAccept(); //Статус аэропорта переходит в - "не готов", т.к. полоса занята посадкой
			}

			airplane.statusFly = 0;
		} else {
			alert(`Запрет на посадку ${airplane.name} , Аэропорт - ${this.name} не готов`);
		}
	}
	takeoffAirplane(airplane) {
		if (this.#statusLand) {
			if (this.airplaneToAirport.find(item => item.name == airplane.name) == undefined) {
				alert(`Самолет ${airplane.name} не находится в аэропорту ${this.name}`);
			}

			for (let i = 0; i < this.airplaneToAirport.length; i++) {
				if (this.airplaneToAirport[i].name == airplane.name) {
					this.airplaneToAirport.splice(i, 1)
					airplane.currentAirport = '';
				}
			}

		} else {
			alert(`Запрет на взлет, Аэропорт - ${this.name} не готов`);
		}
		airplane.statusFly = 1;
	}


}



const mig = new Mig('mig', 1500);
const tu154 = new Tu154('tu154', 900);
const airport = new Airport('Vnukovo');
airport.readyToAccept();
mig.land(airport);
console.log(mig);
mig.takeoff(airport)
console.log(mig);

// tu154.land(airport)
// tu154.land(airport)
// tu154.takeoff(airport)
// mig.takeoff(airport)

// airport.readyToAccept(); - Аэропорт готов принять самолет
// mig.land(airport) - Иннициация посадки самолета МИГ из аэропорта
// tu154.takeoff(airport) - Иннициация взлета самолета ту154 из аэропорта
// airport.status() - запрет на взлет сменой статуса аэропорта
// mig.getStatusFly() - Проверка самолета на земле или в полете
// console.log(airport.airplaneToAirport) - Показать самолеты в аэропорту


// tu154.takeoff(airport)


// tu154.land(airport2)

// console.log(mig.attack());
console.log(airport);

// console.log();



