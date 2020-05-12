const { ObjectID } = require("mongodb");

module.exports = async (req, res, db) => {
  const notes = await db
    .collection("notes")
    .findOne({ _id: ObjectID(req.params.id) });
  const user = await db
    .collection("users")
    .findOne({ username: req.user.username });

  const { text, caption } = req.body;
  const updatedNotes = await db
    .collection("notes")
    .update(
      { _id: ObjectID(req.params.id) },
      { $set: { text: text, caption: caption } }
    );
  res.json({ updatedNotes: updatedNotes });
};
