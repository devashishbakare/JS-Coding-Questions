//Calculator chaing with redo and undo functinality
class Calculator {
  constructor(initialValue = 0) {
    this._result = initialValue;
    this._history = []; // Store operations for undo
    this._redoStack = []; // Store operations for redo
  }

  add(value) {
    const prevResult = this._result;
    this._result += value;
    this._history.push({
      operation: "add",
      value: value,
      prevResult: prevResult,
    });
    this._redoStack = []; // Clear redo stack on new operation
    return this;
  }

  subtract(value) {
    const prevResult = this._result;
    this._result -= value;
    this._history.push({
      operation: "subtract",
      value: value,
      prevResult: prevResult,
    });
    this._redoStack = [];
    return this;
  }

  undo() {
    //undo is when you want to remove what ever you have added
    //1) we have to remove from history
    //2) and add to redo stack might user want it again
    if (this._history.length === 0) return this;

    const lastOp = this._history.pop();
    this._redoStack.push({
      operation: lastOp.operation,
      value: lastOp.value,
      prevResult: this._result,
    });
    //In Undo : I have something, I don't want
    //we go back to previous result
    this._result = lastOp.prevResult;
    return this;
  }

  redo() {
    //redo is when user want there changes back
    //we have to remove from redostack and put into history
    if (this._redoStack.length === 0) return this;
    //when we do redo when we have to update the result
    //so my current this.result becomes previous result after updating
    const lastRedo = this._redoStack.pop();
    this._history.push({
      operation: lastRedo.operation,
      value: lastRedo.value,
      prevResult: this._result, //below we are updating result before that I need to keep track of current result
    });

    if (lastRedo.operation === "add") {
      this._result += lastRedo.value;
    } else if (lastRedo.operation === "subtract") {
      this._result -= lastRedo.value;
    }

    return this;
  }

  get result() {
    return this._result;
  }
}

// Usage
const calc = new Calculator(10);
calc.add(5).subtract(3); // Result: 12
calc.undo(); // Back to 15 (after add(5))
calc.undo(); // Back to 10 (initial)
calc.redo(); // Back to 15
calc.redo(); // Back to 12
