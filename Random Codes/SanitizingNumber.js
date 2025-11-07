//In js the floating point calculation does not go as expected as like java and other programming languages
/**
 
Let's take 0.1 + 0.2
const a = 0.1;
const b = 0.2;

// What JavaScript actually stores:
console.log(a); // Actually stores: 0.1000000000000000055511151231257827021181583404541015625
console.log(b); // Actually stores: 0.200000000000000011102230246251565404236316680908203125

so we have to make this 0.1000000000000000055511151231257827021181583404541015625 to 0.1
 */

function _sanitizeNumber(num) {
  return Math.round(num * 100000000) / 100000000;
}

function add() {
  let a = 0.1;
  let b = 0.2;
  let sum = _sanitizeNumber(a) + _sanitizeNumber(b);
  console.log(`here is sum ${sum}`);
}

add();
