const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  alphabet: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;
