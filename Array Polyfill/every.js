Array.prototype.mySome = function (callback, thisArg) {
  const arr = Object(this);
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      const elementFound = callback.call(thisArg, arr[i], i, arr);
      if (elementFound == false) {
        return false;
      }
    }
  }
  return true;
};

const nums = [1, 2, 3, 4, 5];
const callback = (x) => x > 5;
console.log(nums.mySome(callback));
