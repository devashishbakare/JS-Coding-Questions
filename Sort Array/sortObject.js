const users = [
  { name: "same", age: 25, salary: 60000 },
  { name: "same", age: 30, salary: 50000 },
  { name: "diff", age: 35, salary: 50000 },
];

//sort on the basis of age
users.sort((a, b) => a.age - b.age);

//sort by salary descending if salary same then age ascending
users.sort((a, b) => {
  if (a.salary == b.salary) {
    return a.age - b.age;
  }
  return b.salary - a.salary;
});
console.log(users);
