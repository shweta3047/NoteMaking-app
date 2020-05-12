const jwt = require("jsonwebtoken");
const { ObjectID } = require("mongodb");
const { JWT_SECRET } = require("../keys");

module.exports = async (req, res, db) => {
  const notes = await db
    .collection("notes")
    .findOne({ _id: ObjectID(req.params.id) });
  const user = await db
    .collection("users")
    .findOne({ username: req.user.username });
  const { _id, username } = user;
  const payload = {
    title: notes.title,
    text: notes.text,
    caption: notes.caption,
    id: _id,
    userName: username
  };
  console.log(payload);
  const token = jwt.sign(payload, JWT_SECRET);
  console.log(token);
  res.json({ message: "link generated", data: token });
};
