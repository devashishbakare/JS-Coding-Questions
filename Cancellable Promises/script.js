//here we are calling the abortController.abort() method that internally trigger the singal.abort()
//like abortController is remote and signal is receiver of it
const statusElement = document.getElementById("status");
const resultElement = document.getElementById("result");
const startButton = document.getElementById("startButton");
const cancelButton = document.getElementById("cancelButton");

function fetchData(signal) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      resolve({ data: "Request has been proceeded succssfully" });
    }, 5000);

    signal.addEventListener("abort", () => {
      const abortError = new Error("User requested for abort request");
      abortError.name = "AbortError";
      reject(abortError);
    });
  });
}

let abortController = null;
async function startButtonClicked() {
  try {
    abortController = new AbortController();
    const signal = abortController.signal;

    console.log(typeof abortController);
    console.log(abortController);
    console.log(typeof signal);
    console.log(signal);

    statusElement.textContent = "loading....";
    resultElement.textContent = "N/A";
    startButton.disable = true;
    cancelButton.disable = false;

    const response = await fetchData(signal);
    statusElement.textContent = "Complate";
    resultElement.textContent = response.data;
  } catch (error) {
    if (error.name == "AbortError") {
      statusElement.textContent = "Cancel";
      resultElement.textContent = "Request has been cancel due to user request";
    } else {
      statusElement.textContent = "ERROR";
      resultElement.textContent = "something went wrong";
    }
  } finally {
    startButton.disable = false;
    cancelButton.disable = true;
    abortController = null;
  }
}

function cancelButtonClicked() {
  if (abortController) {
    console.log("user requested for abort call");
    abortController.abort();
  }
}

startButton.addEventListener("click", startButtonClicked);
cancelButton.addEventListener("click", cancelButtonClicked);
