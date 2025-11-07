class EventEmiter {
  constructor() {
    this.events = new Map();
  }

  on(eventName, listener) {
    if (this.events.has(eventName) == false) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(listener);
    return this;
  }

  off(eventName, listenerToRemove) {
    if (this.events.has(eventName) == false) return;

    const allListener = this.events.get(eventName);

    const updatedListener = allListener.filter((listener) => {
      return (
        listener !== listenerToRemove &&
        listener.originalListener !== listenerToRemove
      );
    });

    if (updatedListener.length == 0) {
      this.events.delete(eventName);
    }

    this.events.set(eventName, updatedListener);
    return this;
  }

  once(eventName, listener) {
    const listenerWrapper = (...args) => {
      listener.apply(null, args);
      this.off(eventName, listenerWrapper);
    };
    listenerWrapper.originalListener = listener;
    return this.on(eventName, listenerWrapper);
  }

  emit(eventName, ...args) {
    if (this.events.has(eventName) == false) return;
    for (let listener of this.events.get(eventName)) {
      listener.apply(null, args);
    }
  }

  getListenerCount(eventName) {
    if (this.events.has(eventName) == false) return 0;
    return this.events.get(eventName).length;
  }
}

function simpleMessage(message) {
  console.log("simple message", message);
}
function complexMessage(message) {
  console.log("complex message", message);
}

const eventEmiter = new EventEmiter();
eventEmiter.on("logs", simpleMessage);
eventEmiter.on("logs", complexMessage);

let totalListener = eventEmiter.getListenerCount("logs");
console.log(totalListener);

eventEmiter.emit("logs", "new message arrived");
eventEmiter.off("logs", simpleMessage);

totalListener = eventEmiter.getListenerCount("logs");
console.log(totalListener);

eventEmiter.emit("logs", "new message arrived 2");

function showTempMessageAtOnce() {
  console.log("this is temp message");
}

eventEmiter.once("tempMessage", showTempMessageAtOnce);
eventEmiter.emit("tempMessage", "");

totalListener = eventEmiter.getListenerCount("tempMessage");
console.log(totalListener);
