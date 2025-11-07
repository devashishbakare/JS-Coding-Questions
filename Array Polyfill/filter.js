Array.prototype.myFilter = function (callback, thisArg) {
  if (this == null) {
    throw new Error("No context provided for this");
  }
  if (typeof callback !== "function") {
    throw new error("No callback function provided");
  }

  const array = Object(this);
  const length = array.length;
  const result = [];
  for (let i = 0; i < length; i++) {
    if (i in array) {
      const shouldWeAdd = callback.call(thisArg, array[i], i, array);
      if (shouldWeAdd) {
        result.push(array[i]);
      }
    }
  }
  return result;
};

const numbers = [1, 3, 5, 8, 10];
const callback = (x) => x >= 5;
const storeResult = numbers.myFilter(callback);
console.log(storeResult);

const fruits = ["apple", "banana", "cherry", "date"];
const shortFruits = fruits.myFilter((fruit, index) => fruit.length <= 5);
console.log("Test 2 - Short fruits:", shortFruits);
// ['apple', 'date']

const validator = {
  minLength: 3,
  isValid: function (item) {
    return item.length >= this.minLength;
  },
};

const words = ["a", "ab", "abc", "abcd"];
const validWords = words.myFilter(validator.isValid, validator);
console.log("Test 3 - With thisArg:", validWords);
// ['abc', 'abcd']

const sparseArray = [1, , 3, , 5]; // Holes at index 1 and 3
const sparseResult = sparseArray.myFilter((x) => x > 2);
console.log("Test 5 - Sparse array:", sparseResult);
// [3, 5]
