const mongoose = require("mongoose");
const { Schema } = mongoose;

const SessionSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date },
  duration: { type: Number, required: true },
  status: { type: String, required: true },
  participants: Array,
});

module.exports = Session = mongoose.model("session", SessionSchema);
