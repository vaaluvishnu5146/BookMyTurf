const mongoose = require("mongoose");

const TurfSchema = mongoose.Schema({
  turfName: {
    type: String,
    required: true,
  },
  turfUtilities: {
    type: Array,
    required: true,
  },
  turfOpen: {
    type: Boolean,
    default: false,
  },
});

const TurfModel = mongoose.model("turfs", TurfSchema);

module.exports = TurfModel;
