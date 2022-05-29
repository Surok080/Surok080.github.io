const fibonacci = (function () {
   let counter = 0;
   return function () {
      counter += 1;

      function fibo(counter) {
         let firstNum = 0,
            twoNum = 1,
            result;

         for (let i = 0; i < counter; i++) {
            let fiboNum = twoNum;

            twoNum = firstNum + twoNum;
            firstNum = fiboNum;
            result = fiboNum;
         }
         return result;
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

      return console.log(fibo(counter));
   }
})();

fibonacci();
fibonacci();
fibonacci();
fibonacci();
fibonacci();
