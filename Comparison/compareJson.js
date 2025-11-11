function compareJSON(obj1, obj2, path = "") {
  let differences = [];

  if (typeof obj1 !== typeof obj2) {
    differences.push({
      path,
      type: "TYPE MISMATCH",
      value1: typeof obj1,
      value2: typeof obj2,
    });
    return differences;
  }

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    let maxLength = Math.max(obj1.length, obj2.length);
    for (let i = 0; i < maxLength; i++) {
      let arrayPath = `${path}[${i}]`;

      if (i >= obj1.length) {
        differences.push({
          path: arrayPath,
          type: "Array Item Added",
          value2: obj2[i],
        });
      } else if (i >= obj2.length) {
        differences.push({
          path: arrayPath,
          type: "Array Item Removed",
          value1: obj1[i],
        });
      } else {
        differences.push(...compareJSON(obj1[i], obj2[i], arrayPath));
      }
    }
  } else if (
    typeof obj1 == "object" &&
    typeof obj2 == "object" &&
    obj1 != null &&
    obj2 != null
  ) {
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

    for (let key of allKeys) {
      let objPath = path ? `${path}.${key}` : key;
      if (key in obj1 == false) {
        differences.push({
          path: objPath,
          type: "Property Added",
          value2: obj2[key],
        });
      } else if (key in obj2 == false) {
        differences.push({
          path: objPath,
          type: "Property Removed",
          value1: obj1[key],
        });
      } else {
        differences.push(...compareJSON(obj1[key], obj2[key], objPath));
      }
    }
  } else {
    //premitive type
    if (obj1 !== obj2) {
      differences.push({
        path,
        type: "VALUE_CHANGED",
        value1: obj1,
        value2: obj2,
      });
    }
  }

  return differences;
}

const obj1 = {
  name: "John",
  age: 30,
  hobbies: ["reading", "swimming"],
  address: {
    city: "New York",
    zip: "10001",
  },
};

const obj2 = {
  name: "Jane",
  age: 30,
  hobbies: ["reading", "coding"],
  address: {
    city: "Boston",
    zip: "10001",
  },
  email: "jane@example.com",
};

const differences = compareJSON(obj1, obj2);
console.log(differences);
