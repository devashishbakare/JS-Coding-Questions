async function fetchUserData(users, callback) {
  try {
    const collectProimse = users.map((id, index) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() <= 0.2) {
            reject(`API call failed for ${id} due to randomness`);
          } else {
            resolve(`API call succeed for ${id} due to randomness`);
          }
        }, 1000 * index);
      });
    });
    callback(await Promise.race(collectProimse));
  } catch (error) {
    console.log(error);
    callback([error]);
  }
}

const response = fetchUserData([1, 2, 3, 4, 5], (result) => {
  console.log(result);
});

//ouput
/**
 
first called faild, stoped other tasks and return first response in this case its rejected
API call failed for 1 due to randomness

first called succed, stoped other tasks and return first response in this case its success
API call succeed for 1 due to randomness
 */
