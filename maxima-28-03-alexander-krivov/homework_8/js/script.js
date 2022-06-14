const fibonacci = (function () {
  let firstNum = 0,
    twoNum = 1;

  return function () {

    function fibo() {
      let fiboNum = twoNum;

      twoNum = firstNum + twoNum;
      firstNum = fiboNum;

      return fiboNum;
    }

    return console.log(fibo());
  }
})();

fibonacci();
fibonacci();
fibonacci();
fibonacci();
fibonacci();
