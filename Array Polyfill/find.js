Array.prototype.myFind = function (callback, thisArg) {
  const arr = Object(this);
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      const elementFound = callback.call(thisArg, arr[i], i, arr);
      if (elementFound) {
        return arr[i];
      }
    }
  }
  return undefined;
};

const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Mouse", price: 25 },
  { id: 3, name: "Keyboard", price: 75 },
];

const nums = [1, 2, 3, 4, 5];
const callback = (product) => product.price == 25;
console.log(products.myFind(callback));
//{ id: 2, name: 'Mouse', price: 25 }
console.log(nums.myFind((x) => x > 3));
//4

const searcher = {
  targetName: "Bob",
  findUser: function (user) {
    return user.name === this.targetName;
  },
};

const foundUser = users.myFind(searcher.findUser, searcher);
console.log("Found with thisArg:", foundUser);
