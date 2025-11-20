//by default lexigraphical sorting
const array = ["aaa", "acb", "aca"];
array.sort();
console.log(array);

//in numeric one you have to use lambda function
const store = [5, 4, 1, 6, 9];
store.sort((a, b) => a - b);

//using lambda function same as java
const nums = [
  [1, 3],
  [5, 1],
  [4, 1],
  [3, 9],
  [5, 5],
];
nums.sort((a, b) => {
  if (b[0] == a[0]) {
    return b[1] - a[1];
  }
  return b[0] - a[0];
});
console.log(nums);

const customArray = [
  ["abc", 3],
  ["bcc", 2],
  ["bcc", 1],
];
customArray.sort((a, b) => {
  if (a[0] == b[0]) {
    return a[1] - b[1];
  }

  return a[0] - b[0];
});
console.log(customArray);
