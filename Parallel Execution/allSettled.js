async function fetchUserData(users, callback) {
  try {
    const collectProimse = users.map((id, index) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() <= 0.3) {
            reject(`API call failed for ${id} due to randomness`);
          } else {
            resolve(`API call succeed for ${id} due to randomness`);
          }
        }, 1000 * index);
      });
    });
    callback(await Promise.allSettled(collectProimse));
  } catch (error) {
    console.log(error);
    callback([error]);
  }
}

const response = fetchUserData([1, 2, 3, 4, 5], (result) => {
  console.log(result);
});

//output
/*
[
  {
    status: 'fulfilled',
    value: 'API call succeed for 1 due to randomness'
  },
  {
    status: 'fulfilled',
    value: 'API call succeed for 2 due to randomness'
  },
  {
    status: 'fulfilled',
    value: 'API call succeed for 3 due to randomness'
  },
  {
    status: 'rejected',
    reason: 'API call failed for 4 due to randomness'
  },
  {
    status: 'rejected',
    reason: 'API call failed for 5 due to randomness'
  }
]
*/
