function flattenObject(obj, path = "") {
  let result = {};
  for (let key of Object.keys(obj)) {
    let newPath = path ? `${path}.${key}` : key;
    if (obj.hasOwnProperty(key)) {
      let value = obj[key];
      if (value !== null && typeof value === "object") {
        if (Array.isArray(value)) {
          value.forEach((indexValue, index) => {
            let arrayPath = `${newPath}.[${index}]`;
            if (typeof indexValue === "object") {
              Object.assign(result, flattenObject(value, arrayPath));
            } else {
              result[arrayPath] = indexValue;
            }
          });
        } else {
          Object.assign(result, flattenObject(value, newPath));
          //result.push(...flattenObject(value, newPath));
        }
      } else {
        result[newPath] = value;
        //here you can store array as well, like array flattern
        //result.push({ newPath, value });
      }
    }
  }
  return result;
}
const config = {
  database: {
    host: "localhost",
    port: 5432,
    credentials: {
      username: "admin",
      password: "secret",
    },
  },
  server: {
    port: 3000,
    cors: {
      origins: ["http://localhost:3000", "http://localhost:3001"],
    },
  },
  features: {
    auth: true,
    logging: {
      level: "debug",
      format: "json",
    },
  },
};
const flatConfig = flattenObject(config);
console.log(flatConfig);
