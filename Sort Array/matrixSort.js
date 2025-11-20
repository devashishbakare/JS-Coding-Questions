const matrix = [
  [3, 2, 1],
  [1, 3, 2],
  [2, 1, 3],
];

//sorting on the basis of first column and row will be sheffled acording to it
matrix.sort((a, b) => {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return a[i] - b[i];
    }
  }
});
console.log(matrix);
//ouput -> first column 1, 2, 3
/*
matrix = [
  [1, 3, 2],
  [2, 1, 3],
  [3, 2, 1],
];
*/

function sortInWaveForm(arr) {
  arr.sort((a, b) => a - b);

  let store = [...arr];
  for (let i = 0; i < arr.length; i += 2) {
    store[i] = arr[i + 1];
    store[i + 1] = arr[i];
  }
  console.log(store);
}
sortInWaveForm([1, 6, 8, 4, 3, 10]);
