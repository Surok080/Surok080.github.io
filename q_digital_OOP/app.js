class FuelValue {
   #value; // статус топлива 0- нет топлива, 1- есть топливо
   constructor() {
      this.#value = 0;
   }
   fuelQuantity(value) {
      this.value = value;
   }
   set value(value) {
      this.#value = value;
   }
   get value() {
      return this.#value
   }

}
class Airplane {
   #name; //название самолета
   #speed; // максимальная скорость самолета
   static #counter = 0;
   #num; // каунтер для добавки к имени самолета
   #status; // статус самолета
   #currentAirport; // Объект аэропорта в котором находится самолет
   #fuel; // Объект параметра топлива у самолета

   constructor(name, speed) {
      this.#fuel = new FuelValue();
      this.#name = name;
      this.#speed = speed;
      this.#status = 1;
      this.#num = Airplane.#counter;
      this.#currentAirport = '';
      Airplane.#counter++;
   }
   fuelStatus(value) {
      return this.#fuel.fuelQuantity(value);
   }
   //------------------------
   land(airport) {
      airport.landAirplane(this);
   }
   takeoff(airport) {
      airport.takeoffAirplane(this);
   }
   takeoffFreed(airport) {
      airport.takeoffFreedAirport(this);
   }
   //------------------------
   get fuel() {
      return this.#fuel;
   }
   get name() {
      return this.#name;
   }
   set name(name) {
      if (name === '') {
         throw new Error('name field cannot be empty');
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
         throw new Error('name field cannot be empty');
      }


   }
   get currentAirport() {
      return this.#currentAirport
   }
   set currentAirport(currentAirport) {
      this.#currentAirport = currentAirport;
   }

   refueling() {
      this.fuelStatus(1);
      alert(`${this.name} заправлен`)
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
      this.#statusLand = false;
   }

   readyToAccept() {
      this.#statusLand = true;
   }

   airportBan(airplane) {
      alert(`Запрет на взлет и посадку ${airplane.name} , Аэропорт - ${this.name} не готов`);
   }
   takeoffFreedAirport(airplane) {
      airplane.readyToFly();
      this.readyToAccept();
      this.takeoffAirplane(airplane);
   }

   statusLand() {
      if (!this.#statusLand) {
         alert(`Аэропорт ${this.name} не готов к принятию и отправке`)
      } else {
         alert(`Аэропорт ${this.name} готов к принятию и отправке`)
      }
   }

   landAirplane(airplane) {
      if (airplane.statusAirplane == 1) {
         if (this.#statusLand) {
            this.airplaneToAirport.push(airplane);
            airplane.currentAirport = this;
            this.onReadyToAccept(); //Статус аэропорта переходит в - "не готов", т.к. полоса занята посадкой
            airplane.statusAirplane = 0;
            airplane.fuelStatus(0); // Статус топлива самолета переводится на 0 (отсутствует)
         } else {
            this.airportBan(airplane)
         }
      } else {
         alert(`Посадка не возможна`);
         airplane.getStatus()
      }

   }
   takeoffAirplane(airplane) {
      if (airplane.statusAirplane == 3 && airplane.fuel.value == 1) {
         if (this.#statusLand) {
            for (let i = 0; i < this.airplaneToAirport.length; i++) {
               if (this.airplaneToAirport[i].name == airplane.name) {
                  this.airplaneToAirport.splice(i, 1)
                  airplane.currentAirport = '';
                  alert(`Взлет ${airplane.name} выполнен `);
               }
            }
            airplane.statusAirplane = 1;
         } else {
            this.airportBan(airplane)
         }
      } else if (airplane.fuel.value == 0) {
         alert(`Взлет не возможен, ${airplane.name} требуется заправка топлива `);
      } else {
         alert(`Взлет не возможен`);
         airplane.getStatus()
      }
   }
}



const mig = new Mig('mig', 1500);
const tu154 = new Tu154('tu154', 900);
const airport = new Airport('Vnukovo');

// Возможный сценарий с использованием всех методов--------------
// mig.getStatus() // получить статус самолета МИГ
// tu154.getStatus() // получить статус самолета Ту154
// airport.readyToAccept(); // Перевести аэропорт в состояние готовности принять самолет
// mig.land(airport); // Посадить самолет МИГ в выбранный аэропорт, состояние аэропорта переходит в неготовое принять или отправить самолет
// mig.getStatus() // получить статус самолета МИГ
// mig.parkingAirplane() // Отправить МИГ на парковку
// mig.getStatus() // получить статус самолета МИГ
// airport.readyToAccept(); // Перевести аэропорт в состояние готовности принять самолет
// tu154.land(airport); // Посадить самолет Ту154 в выбранный аэропорт, состояние аэропорта переходит в неготовое принять или отправить самолет
// tu154.getStatus() // получить статус самолета Ту154
// airport.statusLand(); // получить статус аэропорта
// mig.refueling() // заправка самолета МИГ
// mig.readyToFly(); // Привести самолет МИГ в готовность взлета;
// airport.readyToAccept(); // Перевести аэропорт в состояние готовности принять самолет
// mig.takeoff(airport) // Произвести взлет самолета МИГ
// mig.getStatus() // получить статус самолета МИГ
// tu154.refueling() // заправка самолета Ту154
// airport.statusLand(); // получить статус аэропорта
// tu154.takeoffFreed(airport); // Привести аэропорт в готовность к взлету, произвести взлет самолета;
// tu154.getStatus() // получить статус самолета Ту154
// mig.attack() // Метод атаки самолета МИГ
//---------------------------------------------------------------




// Список всех возможных команд--------------------------
// mig.refueling() - заправка самолета МИГ
// mig.parkingAirplane(); - Отправить самолет на стоянку
// mig.readyToFly(); - Привести самолет в готовность взлета;
// mig.takeoffFreed(airport); - Аэропорт готов к взлету, самолет взлетает;
// airport.readyToAccept(); - Аэропорт готов принять самолет
// mig.land(airport) - Иннициация посадки самолета МИГ из аэропорта
// tu154.takeoff(airport) - Иннициация взлета самолета ту154 из аэропорта
// airport.statusLand() - статуса аэропорта на отправку и принятие самолета
// mig.getStatus() - Проверка самолета на земле или в полете
// console.log(airport.airplaneToAirport) - Показать самолеты в аэропорту
// mig.attack() - Метод атаки самолета МИГ
//--------------------------------------------------------

console.log(mig);

