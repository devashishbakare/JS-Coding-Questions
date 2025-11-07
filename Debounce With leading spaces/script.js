console.log("this is test for leading debounce");

const fetchData = {
  counter: 0,
  submitData: function () {
    this.counter++;
    console.log(`click happend ${this.counter} times`);
  },
};

function debounce(fetchData, context, delayTime, leading = false) {
  //we are doing the leading debounce first so
  //if leading == true then we have to call imeedialtly
  // if leading == false then we have to call after a delay

  let timeoutId;
  let immediateCallHappend = false;

  return function (...args) {
    clearTimeout(timeoutId);
    //immediateCallHappend = false then call it now
    let shouldImmediateCalled =
      leading == true && immediateCallHappend == false ? true : false;

    if (shouldImmediateCalled) {
      fetchData.apply(context, args);
      //then set it to be true
      immediateCallHappend = true;
    }

    timeoutId = setTimeout(() => {
      //leading == false meaning we are going for trailing one
      //shouldImmediateCalled is always false then logic is for trailing one
      if (leading == false || shouldImmediateCalled == false) {
        if (shouldImmediateCalled == false) {
          fetchData.apply(context, args);
        }
      }
      //after delay immediateCallHappend = false reseting flag for
      //next debounce call for deboucing
      immediateCallHappend = false;
    }, delayTime);
  };
}

const debouncing = debounce(fetchData.submitData, fetchData, 3000, true);

document.getElementById("buttonId").addEventListener("click", function () {
  debouncing();
});
