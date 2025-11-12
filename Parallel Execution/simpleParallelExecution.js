const tasks = [
  new Promise((resolve) => resolve("task1 resolved")),
  new Promise((resolve) => resolve("task2 resolved")),
  new Promise((resolve) => resolve("task2 resolved")),
];

Promise.all(tasks).then((result) => console.log(result));
