Array.prototype.myFlat = function (depth = 1) {
  const result = [];
  const arr = Object(this);

  const flattern = function (array, currentDepth) {
    for (let item of array) {
      if (Array.isArray(item) && currentDepth > 0) {
        flattern(item, currentDepth - 1);
      } else {
        result.push(item);
      }
    }
  };
  flattern(arr, depth);
  return result;
};

const subarray = [1, 2, [[3], 4], 5];
console.log(subarray.myFlat(1));
