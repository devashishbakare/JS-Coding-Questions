function asyncFun(user, index) {
  let delayTime = Math.random() * 2000 + 500;
  let shouldFail = Math.random() <= 0.8 ? true : false;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject({
          status: "reject",
          error: `data fetched failed for ${user} due to randomness`,
          index,
        });
      } else {
        resolve({
          status: "resolve",
          result: `data fetched successful for ${user} due to randomness`,
          index,
        });
      }
    }, delayTime);
  });
}

const users = ["user1", "user2", "user3", "user4"];

async function executeWithMapLimit(users, limit, fetchUserData) {
  let successResponse = [];
  let errorResponse = [];
  let response = new Array(users.length);

  let currentIndex = 0;

  while (currentIndex < users.length) {
    let batch = [];

    while (batch.length < limit && currentIndex < users.length) {
      const userDataResponse = fetchUserData(users[currentIndex], currentIndex)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });
      batch.push(userDataResponse);
      currentIndex++;
    }

    if (batch.length > 0) {
      console.log("Processing of batch length", batch.length);
      const batchProcessingReponse = await Promise.all(batch);
      batchProcessingReponse.forEach(({ status, result, error, index }) => {
        let resultIndex = index;
        if (status === "resolve") {
          response[resultIndex] = result;
          successResponse.push({ user: users[index], result });
        } else {
          response[resultIndex] = error;
          errorResponse.push({ user: users[index], error });
        }
      });
    }
  }

  return {
    successResponse,
    errorResponse,
    response,
    totalSuccessRatio: (successResponse.length / users.length) * 100,
  };
}

executeWithMapLimit(users, 2, asyncFun).then((report) => {
  console.log(report);
  console.log(
    "total response ration is",
    report.totalSuccessRatio.toFixed(2),
    "%"
  );
});
