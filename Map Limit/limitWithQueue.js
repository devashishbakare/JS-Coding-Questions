class ParallelTaskLimiter {
  constructor(limit) {
    this.limit = limit;
    this.running = 0;
    this.queue = [];
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.run();
    });
  }

  run() {
    while (this.running < this.limit && this.queue.length > 0) {
      const { task, resolve, reject } = this.queue.shift();
      this.running++;
      Promise.resolve(task())
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.running--;
          this.run();
        });
    }
  }
}

function executeTask(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() <= 0.3) {
        reject(`API call failed for ${id} due to randomness`);
      } else {
        resolve(`API call succeed for ${id} due to randomness`);
      }
    }, 1000);
  });
}

// Test it
const users = [1, 2, 3, 4, 5];
const parallelTaskLimiter = new ParallelTaskLimiter(2);

console.log("Starting tasks with concurrency limit of 2...");

users.forEach((user) => {
  parallelTaskLimiter
    .add(() => executeTask(user)) //here we are wrapping a call inside a function to that when task called execute task will be called
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
});
