const Session = require("../Models/Session");

exports.addSession = async (req, res) => {
  try {
    const newSession = new Session({ ...req.body });
    await newSession.save();
    res.status(200).send({ msg: "Session added", Session: newSession });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};

exports.getAllSessions = async (req, res) => {
  try {
    let SessionList = await Session.find();

    res.status(200).send({ msg: "List of Sessions", SessionList });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "can not get all Sessions" }] });
  }
};

exports.getSessionById = async (req, res) => {
  try {
    let SessionToFind = await Session.findById(req.params.id);

    res.status(200).send({ msg: "get Session by id", Session: SessionToFind });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "failed to get Session" }] });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    await Session.deleteOne({ _id: req.params.id });
    res.status(200).send({ msg: "Session deleted" });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "faild to delete Session" }] });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const result = await Session.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    if (result.modifiedCount) {
      return res.status(200).send("Session updated");
    }
    res.status(200).send({ msg: "no modification" });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "faild to update Session" }] });
  }
};
