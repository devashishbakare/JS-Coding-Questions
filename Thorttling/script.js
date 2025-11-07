console.log("Throttling in test");
const API_Info = {
  counter: 0,
  API_Call: function () {
    this.counter++;
    console.log(`API called, ${this.counter} time`);
  },
};

function throtlling(context, delay) {
  let flag = true;
  return function (...args) {
    if (flag === true) {
      flag = false;
      context.API_Call.apply(context, args);
      setTimeout(() => {
        flag = true;
      }, delay);
    }
  };
}
/*
const bindThisToFunction = API_Info.API_Call.bind(API_Info);
const throttle = throtlling(bindThisToFunction, 3000);
*/
const throttle = throtlling(API_Info, 3000);

const button = document.getElementById("addToCartId");
button.addEventListener("click", function (event) {
  throttle();
});
