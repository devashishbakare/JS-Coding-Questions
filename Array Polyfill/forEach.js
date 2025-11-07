Array.prototype.myForEach = function (callback, thisArg) {
  const arr = Object(this);
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    if (i in arr) {
      callback.call(thisArg, arr[i], i, arr);
    }
  }
};

const printArray = {
  arrayFormat: "Number",
  print: function (num, index) {
    console.log(
      `Array formate of ${this.arrayFormat} and number ${num} at index ${index}`
    );
  },
};

const number = [1, 2, 3, 4, 5];
console.log(number.myForEach(printArray.print, printArray));
