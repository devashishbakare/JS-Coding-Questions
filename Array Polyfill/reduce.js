Array.prototype.myReduce = function (callback, initialValue) {
  //you don't need to hardcode acc = 0
  //here because what if we want to do the multiplcation
  //then 0 will make it complecated

  const array = Object(this);

  if (array.length === 0 && initialValue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  if (array.length == 0) {
    throw new Error("no element found");
  }

  let acc;
  let startIndex = 0;
  if (initialValue !== undefined) {
    acc = initialValue;
  } else {
    while (startIndex < array.length && startIndex in array == false) {
      startIndex++;
    }
    if (startIndex >= array.length) {
      throw new Error("Sparse Array found");
    }
    acc = array[startIndex];
    startIndex = startIndex + 1;
  }

  for (let i = startIndex; i < array.length; i++) {
    if (i in array) {
      acc = callback(acc, array[i], i, array);
    }
  }
  return acc;
};
const number = [, , , 3, 4, 5];
const callback = (acc, num) => num + acc;
const sum = number.myReduce(callback);
console.log(sum);
