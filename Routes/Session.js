const express = require("express");
const {
  addSession,
  getAllSessions,
  getSessionById,
  deleteSession,
  updateSession,
} = require("../Controller/Session.Controller");
const router = express.Router();

router.post("/", addSession);
router.get("/", getAllSessions);
router.get("/:id", getSessionById);
router.delete("/:id", deleteSession);
router.put("/:id", updateSession);

module.exports = router;
