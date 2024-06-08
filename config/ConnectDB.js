const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGO_URI = "mongodb://127.0.0.1:27017/eyaPfe";
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected`);
  } catch (err) {
    console.error(err);
  }
};
module.exports = connectDB;
