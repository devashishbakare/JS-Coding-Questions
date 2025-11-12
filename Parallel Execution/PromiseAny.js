async function fetchUserData(users, callback) {
  try {
    const collectProimse = users.map((id, index) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() <= 0.9) {
            reject(`API call failed for ${id} due to randomness`);
          } else {
            resolve(`API call succeed for ${id} due to randomness`);
          }
        }, 1000 * index);
      });
    });
    callback(await Promise.any(collectProimse));
  } catch (error) {
    console.log(error);
    callback([error]);
  }
}

const response = fetchUserData([1, 2, 3, 4, 5], (result) => {
  console.log(result[0].errors);
});

//ouput
/**
 
Returns first resolved response, other just ignored 
API call succeed for 2 due to randomness

in case all the promised rejected then return array of [error] 
[AggregateError: All promises were rejected] {
  [errors]: [
    'API call failed for 1 due to randomness',
    'API call failed for 2 due to randomness',
    'API call failed for 3 due to randomness',
    'API call failed for 4 due to randomness',
    'API call failed for 5 due to randomness'
  ]
}

to get array of error
//result[0].errors;
    [
        'API call failed for 1 due to randomness',
        'API call failed for 2 due to randomness',
        'API call failed for 3 due to randomness',
        'API call failed for 4 due to randomness',
        'API call failed for 5 due to randomness'
    ]
 */
