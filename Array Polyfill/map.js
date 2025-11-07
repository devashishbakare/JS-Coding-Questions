Array.prototype.myMap = function (callback, thisArg) {
  // 1. Validate that 'this' is not null or undefined
  if (this == null) {
    throw new TypeError("Array.prototype.myMap called on null or undefined");
  }

  // 2. Validate that callback is a function
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  // 3. Convert 'this' to object and get length
  const array = Object(this);
  const length = array.length >>> 0; // Convert to uint32

  // 4. Create result array
  const result = new Array(length);

  // 5. Loop through each element
  for (let i = 0; i < length; i++) {
    // 6. Check if index exists in array (handles sparse arrays)
    if (i in array) {
      // 7. Call callback with proper context and all parameters
      result[i] = callback.call(thisArg, array[i], i, array);
    }
  }

  // 8. Return the new array
  return result;
};

// Test 1: Basic usage
const numbers = [1, 2, 3];
const doubled = numbers.myMap((x) => x * 2);
console.log("Test 1 - Basic:", doubled); // [2, 4, 6]

// Test 2: Using index
const fruits = ["apple", "banana", "cherry"];
const indexedFruits = fruits.myMap((fruit, index) => `${index}: ${fruit}`);
console.log("Test 2 - With index:", indexedFruits); // ['0: apple', '1: banana', '2: cherry']

// Test 3: Using thisArg
const multiplier = {
  factor: 10,
  multiply: function (x) {
    return x * this.factor;
  },
};
const multiplied = numbers.myMap(multiplier.multiply, multiplier);
console.log("Test 3 - With thisArg:", multiplied); // [10, 20, 30]

// Test 4: Sparse arrays
const sparseArray = [1, , 3]; // Hole at index 1
const sparseResult = sparseArray.myMap((x) => (x || 0) * 2);
console.log("Test 4 - Sparse array:", sparseResult); // [2, empty, 6]

// Test 5: Using all parameters
const prices = [10, 20, 30];
const percentages = prices.myMap((price, index, originalArray) => {
  const total = originalArray.reduce((sum, p) => sum + p, 0);
  return (price / total) * 100;
});
console.log("Test 5 - All parameters:", percentages); // [16.66..., 33.33..., 50]

// Test 6: Error cases
try {
  [].myMap(null); // Should throw error
} catch (e) {
  console.log("Test 6 - Error handling:", e.message); // "null is not a function"
}

try {
  Array.prototype.myMap.call(null, (x) => x); // Should throw error
} catch (e) {
  console.log("Test 7 - Null context:", e.message); // "called on null or undefined"
}
