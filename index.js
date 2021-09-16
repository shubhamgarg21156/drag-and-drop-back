require("dotenv").config();
const { config } = require("dotenv");
const express = require("express");
const app = express();

const port = process.env.PORT || 8000;

//Mongo Database
const db = require("./config/mongoose");

//Data Model of MongoDB
const Data = require("./models/data");

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

//router to find the required data
app.get("/find", (req, res) => {
  let alphabet = req.query.alphabet;
  let integer = req.query.integer;
  let operator = req.query.operator;

  if (operator == "gt") {
    Data.find({ value: { $gt: integer }, alphabet: alphabet }, (err, data) => {
      if (data) {
        return res.json(data);
      }
    });
  } else if (operator == "lt") {
    Data.find({ value: { $lt: integer }, alphabet: alphabet }, (err, data) => {
      if (data) {
        return res.json(data);
      }
    });
  } else {
    Data.find({ alphabet: alphabet, value: integer }, (err, data) => {
      if (data) {
        return res.json(data);
      }
    });
  }
});

//router to add data to database
app.get("/add", (req, res) => {
  Data.create(
    { alphabet: req.query.alphabet, value: req.query.integer },
    (err, data) => {
      if (err) {
        console.log(err);
      }
      if (data) {
        return res.json({ message: "success" });
      }
    }
  );
});

//node.js server to listen
app.listen(port, (err) => {
  if (err) console.log(`Error : ${err}`);

  console.log(`Running on Port ${port}`);
});
