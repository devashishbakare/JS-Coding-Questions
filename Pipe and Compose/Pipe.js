/*
### Things you need to remember the most

1. First thing you need to understand here, there is initialValue is there that is important
    - Given string then validate it like below
    - initial price is given then add tax, delivery charges and all
2. you need to pass the accumulator to the function, next function expecting the result for 
prev function so to have that you need to pass accumulator to a reduce function like below
*/
//in Pipe : function executes from left to right

class DataProcessing {
  static removeWhiteSpace(str) {
    return str.trim().toUpperCase();
  }
  static removeSC(str) {
    return str.replace(/[^A-Z0-9]/g, "");
  }

  static addPrefix(str) {
    return `HDFC-${str}`;
  }

  static pipe =
    (...functions) =>
    (initialValue) =>
      functions.reduce((acc, fun) => fun(acc), initialValue);
}

const result = DataProcessing.pipe(
  DataProcessing.removeWhiteSpace,
  DataProcessing.removeSC,
  DataProcessing.addPrefix
)(" @devashisH");

console.log(result);
Result = "HDFC-DEVASHISH";
