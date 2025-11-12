async function fetchUserData(users, callback) {
  try {
    const collectProimse = users.map((id, index) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(`API call succeed for ${id}`);
        }, 1000 * index);
      });
    });
    callback(await Promise.all(collectProimse));
  } catch (error) {
    console.log(error);
    callback([error]);
  }
}

const response = fetchUserData([1, 2, 3, 4, 5], (result) => {
  console.log(result);
});

//output :
/**
[ 
  'API call succeed for 1',
  'API call succeed for 2',
  'API call succeed for 3',
  'API call succeed for 4',
  'API call succeed for 5'
]
 */
