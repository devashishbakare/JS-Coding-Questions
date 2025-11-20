//sort by most frequency, if same use the max value first
function sortByFequncyOfNumber(arr) {
  let freq = {};
  for (let num of arr) {
    freq[num] = (freq[num] || 0) + 1;
  }
  //we are not sorting here a freq, we are using arr to use sort function using frequency as our need
  arr.sort((a, b) => {
    if (freq[a] == freq[b]) {
      return b - a;
    }
    return freq[b] - freq[a];
  });
  return arr;
}

const storeResponse = sortByFequncyOfNumber([5, 5, 5, 9, 9, 9, 9, 1, 3, 4, 4]);
console.log(storeResponse);
