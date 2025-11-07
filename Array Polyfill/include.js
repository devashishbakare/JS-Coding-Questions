Array.prototype.myInclude = function (searchElement, index) {
  const arr = Object(this);
  const startIndex = Math.max(
    index >= 0 ? index : arr.length - Math.abs(index),
    0
  );

  for (let i = startIndex; i < arr.length; i++) {
    if (i in arr && arr[i] == searchElement) {
      return true;
    }
  }
  return false;
};

const nums = [1, 2, 3, 4, 5];
console.log(nums.myInclude(5, 0));
console.log(nums.myInclude(5, -2));
