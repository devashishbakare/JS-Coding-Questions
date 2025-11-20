const users = [
  { name: "same", age: 25, salary: 60000 },
  { name: "same", age: 30, salary: 50000 },
  { name: "diff", age: 35, salary: 50000, some: "random" },
];

//compare strings using localecompare function
// console.log("apple".localeCompare("banana"));  // -1 (apple comes before banana)
// console.log("banana".localeCompare("apple"));  // 1  (banana comes after apple)
// console.log("apple".localeCompare("apple"));   // 0  (equal)
users.sort((a, b) => b.name.localeCompare(a.name));

//sort on the basis of size of object
users.sort((a, b) => Object.keys(b).length - Object.keys(a).length);
console.log(users);
