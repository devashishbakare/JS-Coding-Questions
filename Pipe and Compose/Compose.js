//function executes from right to left
const compose =
  (...functions) =>
  (initialValue) =>
    functions.reduceRight((acc, fun) => fun(acc), initialValue);

const compose1 =
  (...functions) =>
  (initialValue) => {
    return functions.reduce((collector, fun) => {
      return fun(collector);
    }, initialValue);
  };
