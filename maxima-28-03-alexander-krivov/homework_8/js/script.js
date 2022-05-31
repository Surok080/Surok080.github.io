const fibonacci = (function () {
	// let counter = 0;
	let firstNum = 0,
		twoNum = 1;

	return function () {
		// counter += 1;

		function fibo() {
			let fiboNum = twoNum;

			twoNum = firstNum + twoNum;
			firstNum = fiboNum;

			return fiboNum;
		}

		//=====================================================
		//Решене с использованием рекурсии
		// function fibo(counter) {
		//    if (counter === 1 || counter === 2) {
		//       return 1;
		//    } else {
		//       return fibo(counter - 1) + fibo(counter - 2);
		//    }
		// }
		//=====================================================

		return console.log(fibo());
		// return console.log(fibo(counter));
	}
})();

fibonacci();
fibonacci();
fibonacci();
fibonacci();
fibonacci();
