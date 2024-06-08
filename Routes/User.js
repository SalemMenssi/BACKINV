const express = require("express");
const {
  Register,
  Login,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  changeAvatar,
  changePassword,
} = require("../Controller/User.Controller");
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);

// router.get("/current",isAuth, (req, res) => {
//   res.send( {msg:"authorized", user :req.user});
// });

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.put("/change-password/:id", changePassword);
router.post("/change-avatar/:userId/:imageId", changeAvatar);

module.exports = router;
