const express = require("express");
const bodyparser = require("body-parser");
var cors = require("cors");
const { setupDBConnection } = require("./Database/DBConfig");

// Initiate DB Connection
setupDBConnection();

// Create a express HTTP server
const server = express();

// Enabling view engine ejs
server.set("view engine", "ejs");

// use res.render to load up an ejs view file

// Render views
// home page
server.get("/", function (req, res) {
  res.render("pages/index");
});

// about page
server.get("/home", function (req, res) {
  res.render("pages/home");
});

// CORS setup
var whitelist = ["http://127.0.0.1:5500"];
var corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// Enabling the server to accept and parse the incoming request body as json
server.use(bodyparser.json());
server.use(cors(corsOptionsDelegate));

// Inject routes inside the HTTP Express server
server.use("/api/turf", require("./Controllers/Turfs.controller"));

// Creating a server and listening to the server with PORT 5000
server.listen(5000, () => {
  console.log("Connection is successfull");
});

// server.get("*", (req, res, next) => {
//   res.status(200).json({
//     message: "Successfull",
//   });
// });
