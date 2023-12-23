const mongoose = require("mongoose");

function setupDBConnection() {
  return mongoose
    .connect("mongodb://localhost:27017/bookmyturf")
    .then((response) => {
      console.log("Database connected successfully!!!");
    })
    .catch((error) => console.log(error));
}

module.exports = {
  setupDBConnection,
};
