const express = require("express");
const connectDB = require("./config/ConnectDB");
const path = require("path");
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();
require("dotenv").config();

connectDB();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/user", require("./Routes/User"));
app.use("/api/product", require("./Routes/Product"));
app.use("/api/session", require("./Routes/Session"));
app.use("/api/images", require("./Routes/Image"));

app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 1597;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
