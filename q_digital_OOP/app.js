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



	constructor(name, speed) {
		this.name = name;
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

class Tu154 extends Airplane {
	constructor(name, speed) {
		super(name, speed);
		this.name = name + '_' + this.getNum();
	}
}

class Airport {
	#airplaneToAirport = [];
	#statusLand;
	#name;

	constructor(name) {
		this.#name = name
		this.#airplaneToAirport = [];
		this.#statusLand = true;
	}

	get airplaneToAirport() {
		return this.#airplaneToAirport
	}
	set airplaneToAirport(airplaneToAirport){
		this.#airplaneToAirport = airplaneToAirport;
	}

	status() {
		this.#statusLand = !this.#statusLand;
	}

	getPrin() {
		return this.#name;
	}


	landAirplane(airplane) {

		if (this.airplaneToAirport.find(item => item.name == airplane.name) !== undefined) {
			alert('Данный самолет уже находится в этом аэропорту');
			// this.airArray.push(airplane);
		} else {
			this.airplaneToAirport.push(airplane);
		}
		airplane.statusFly = 0;
	}
	takeoffAirplane(airplane) {
		console.log(this)
		if (this.#statusLand) {
			if (this.airplaneToAirport.find(item => item.name == airplane.name) == undefined) {
				alert('Данный самолет уже не находится в этом аэропорту');
			}

			for (let i = 0; i < this.airplaneToAirport.length; i++) {
				if (this.airplaneToAirport[i].name == airplane.name) {
					this.airplaneToAirport.splice(i, 1)

				}
			}

		} else {
			alert('Запрет на взлет, Аэропорт не готов');
		}
		airplane.statusFly = 1;
	}


}



const mig = new Mig('mig', 1500);
const tu154 = new Tu154('tu154', 900);
const airport = new Airport('Vnukovo');

mig.land(airport)
tu154.land(airport)

//mig.land(airport) - Иннициация взлета самолета МИГ из аэропорта
// airport.status() - запрет на взлет сменой статуса аэропорта
// mig.getStatusFly() - Проверка самолета на земле или в полете
//console.log(airport.airplaneToAirport) - Показать самолеты в аэропорту

tu154.takeoff(airport)
// mig.takeoff(airport)

// tu154.land(airport2)

// console.log(mig.attack());
console.log(airport);

// console.log();



