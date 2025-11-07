Array.prototype.myFindIndex = function (callback, thisArg) {
  if (this == null) throw new TypeError();
  if (typeof callback !== "function") throw new TypeError();

  const array = Object(this);

  for (let i = 0; i < array.length; i++) {
    if (i in array && callback.call(thisArg, array[i], i, array)) {
      return i;
    }
  }
  return -1;
};
