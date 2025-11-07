console.log("Debouncing search");

function debounce(context, delayTime) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      context.API.apply(context, args);
    }, delayTime);
  };
}

const fetchData = {
  baseURL: "localhost://8000/",
  counter: 0,
  API: function (serachQuery) {
    this.counter++;
    console.log(`calling API ${this.counter} time with keyword ${serachQuery}`);
  },
};

const debouncing = debounce(fetchData, 400);

document.getElementById("searchInput").addEventListener("input", (event) => {
  debouncing(event.target.value);
});
