const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, length: 8 },
  organization: String,
  authority: {
    type: String,
    enum: ["ROLE_USER", "ROLE_ADMIN"],
    default: "ROLE_USER",
  },
});

module.exports = User = mongoose.model("user", UserSchema);
