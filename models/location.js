const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let LocationSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 100
  },
  male: {
    type: Number,
    required: true
  },
  female: {
    type: Number,
    required: true
  },
  parentLocation: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Location"
  }
});

module.exports = mongoose.model("Location", LocationSchema);
