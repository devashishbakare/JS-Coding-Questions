//promise sequencing includes
//1) tracking and executing task in sequence
//2) handeling proper erros, result and generating report
//3) execute task with retries
//4) execute task within given timeout

class TaskExecuteWithPromiseSequencing {
  static async executeTask(tasks, options = {}) {
    const {
      timeout = 0,
      maxRetry = 0,
      continueOnError = false,
      onProgress = null,
      onTaskCompleted = null,
      onTaskError = null,
    } = options;

    const results = [];
    const errors = [];

    for (let i = 0; i < tasks.length; i++) {
      const taskName = `Task ${i + 1}`;
      try {
        onProgress({
          taskName,
          status: "IN-PROCESS",
          progressCount: ((i + 1) / tasks.length) * 100,
        });

        const result = await this.executeTaskWithRetry(
          taskName,
          tasks[i],
          timeout,
          maxRetry
        );
        results.push(result);
        onTaskCompleted({
          taskName,
          status: "Completed",
          progressCount: (results.length / tasks.length) * 100,
        });
      } catch (error) {
        errors.push(`Error at task ${taskName} and error is ${error}`);

        onTaskError({
          taskName,
          status: "ERROR",
          error: error,
        });
      }
    }
    const report = {
      totalTasks: tasks.length,
      taskFinished: (results.length / tasks.length) * 100,
      taskNotFinished: (errors.length / tasks.length) * 100,
      result: results,
      error: errors,
    };
    return report;
  }

  static async executeTaskWithRetry(taskName, task, timeout, maxRetry) {
    let lastError;
    for (let attempt = 0; attempt < maxRetry; attempt++) {
      try {
        if (timeout > 0) {
          return await this.executeTaskWithTimeout(task, taskName, timeout);
        } else {
          return await task();
        }
      } catch (error) {
        lastError = error;
        console.error(
          `Error for task ${taskName} while retrying ${attempt + 1} time`
        );
        if (attempt < maxRetry) {
          const delayTime = 1000 * Math.pow(2, attempt); // 1s, 2s, 4s, 8s
          console.log(`Waiting ${delayTime}ms before retry ${attempt + 1}...`);
          await this.delay(delayTime);
        }
      }
    }
    throw lastError;
  }

  static async executeTaskWithTimeout(task, taskName, timeout) {
    return new Promise(async (resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(`Timeout for ${taskName}`);
      }, timeout);

      try {
        const result = await task();
        clearTimeout(timeoutId);
        resolve(result);
      } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  }

  static delay(delayTime) {
    return new Promise((resolve) => setTimeout(resolve, delayTime));
  }
}

const tasks = [
  () => Promise.resolve("task 1 resolved"),
  () => Promise.reject("task 2 rejected"),
  () => Promise.resolve("task 3 resolved"),
  () => Promise.resolve("task 4 resolved"),
];

TaskExecuteWithPromiseSequencing.executeTask(tasks, {
  timeout: 5000,
  maxRetry: 4,
  continueOnError: true,
  onProgress: function ({ taskName, status, progressCount }) {
    console.log(
      `Task ${taskName} is in progress with status ${status} and in total ${progressCount} is processed`
    );
  },
  onTaskCompleted: function ({ taskName, status, progressCount }) {
    console.log(
      `Task ${taskName} is completed with status ${status} and in total ${progressCount} is complted`
    );
  },
  onTaskError: function ({ taskName, status, error }) {
    console.log(
      `Error in Task ${taskName} with status ${status} and following is error ${error}`
    );
  },
})
  .then((report) => {
    console.log("Promise sequence complete", report);
  })
  .catch((error) => {
    console.log("Promise sequence falied", error);
  });
