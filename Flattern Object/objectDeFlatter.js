function unflattenObject(flatObj) {
  const result = {};

  for (const [key, value] of Object.entries(flatObj)) {
    const keys = parseKey(key); // Split key into parts
    setNestedValue(result, keys, value);
  }

  return result;
}

// Helper function to parse keys like "address.coordinates.lat" or "hobbies.[0]"
function parseKey(key) {
  const parts = [];
  let current = "";
  let inArray = false;

  for (let char of key) {
    if (char === "[" && !inArray) {
      if (current) parts.push(current);
      current = "";
      inArray = true;
    } else if (char === "]" && inArray) {
      parts.push(Number(current)); // Convert array indices to numbers
      current = "";
      inArray = false;
    } else if (char === "." && !inArray) {
      if (current) parts.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  if (current) parts.push(current);
  return parts;
}

// Helper function to set nested values
function setNestedValue(obj, keys, value) {
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const nextKey = keys[i + 1];

    if (typeof nextKey === "number") {
      // Next key is array index, ensure current[key] is array
      if (!current[key] || !Array.isArray(current[key])) {
        current[key] = [];
      }
    } else {
      // Next key is object property, ensure current[key] is object
      if (
        !current[key] ||
        typeof current[key] !== "object" ||
        Array.isArray(current[key])
      ) {
        current[key] = {};
      }
    }

    current = current[key];
  }

  // Set the final value
  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;
}

const flatternObject = {
  name: "John",
  age: 30,
  "address.street": "123 Main St",
  "address.city": "New York",
  "address.coordinates.lat": 40.7128,
  "address.coordinates.lng": -74.006,
  "hobbies.[0]": "reading",
  "hobbies.[1]": "gaming",
  "scores.[0]": 95,
  "scores.[1]": 87,
  "scores.[2]": 92,
  "nestedArray.[0].0.id": 1,
  "nestedArray.[0].0.value": "a",
  "nestedArray.[0].1.id": 2,
  "nestedArray.[0].1.value": "b",
  "nestedArray.[1].0.id": 1,
  "nestedArray.[1].0.value": "a",
  "nestedArray.[1].1.id": 2,
  "nestedArray.[1].1.value": "b",
};
const store = unflattenObject(flatternObject);
console.log(store);

// {
//   name: 'John',
//   age: 30,
//   address: {
//     street: '123 Main St',
//     city: 'New York',
//     coordinates: { lat: 40.7128, lng: -74.006 }
//   },
//   hobbies: [ 'reading', 'gaming' ],
//   scores: [ 95, 87, 92 ],
//   nestedArray: [
//     { '0': [Object], '1': [Object] },
//     { '0': [Object], '1': [Object] }
//   ]
// }
