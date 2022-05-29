const fibonacci = (function () {
   let counter = 1;
   return function () {
      counter += 1;

      function fibo(counter) {
         let firstNum = 0,
            twoNum = 1,
            result;

         for (let i = 1; i < counter; i++) {
            let fiboNum = twoNum;

            twoNum = firstNum + twoNum;
            firstNum = fiboNum;
            result = fiboNum;
         }
         return result;
      }
      return console.log(fibo(counter));
   }
})();

fibonacci();
fibonacci();
fibonacci();
fibonacci();
fibonacci();
