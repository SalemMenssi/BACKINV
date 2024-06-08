const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Image = require("../Models/Image");
const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER, // Your email address
//     pass: process.env.EMAIL_PASS, // Your email password
//   },
// });

exports.Register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).send({ msg: "User already exist" });
    }
    const newUser = new User({ ...req.body });

    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: 3600,
    });
    // const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: "Your account has been created",
    //   text: `Your password is: ${password}`,
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     return res.status(500).send({ msg: "Error sending email", error });
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });
    res.status(200).send({ msg: "User registred", user: newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};

// LOGIN REQUEST
exports.Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(400).send({ msg: "Bad credentials" });
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(400).send({ msg: "Bad credentials" });
    }
    const token = jwt.sign({ id: findUser._id }, process.env.SECRET_KEY, {
      expiresIn: 3600,
    });
    res.status(200).send({ msg: "Welcome", user: findUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    let userList = await User.find();
    res.status(200).send({ msg: "List of users", userList });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "can not get all users" }] });
  }
};
exports.getUserById = async (req, res) => {
  try {
    let userToFind = await User.findById(req.params.id);
    res.status(200).send({ msg: "get user by id", user: userToFind });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "faild to get user" }] });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).send({ msg: "delete success" });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "delete failed" }] });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const result = await User.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    if (result.modifiedCount) {
      return res.status(200).send("user updated");
    }
    res.status(200).send({ msg: "no modification" });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "update failed" }] });
  }
};
exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    // Hash the new password and update it in the database
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).send({ msg: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};
exports.changeAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const image = await Image.findById(req.params.imageId);

    user.avatar = image; // Store the entire image object
    await user.save();

    res.status(200).json({ message: "Avatar changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
