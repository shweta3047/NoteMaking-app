//const { ObjectId } = require("mongodb");

module.exports = async (req, res, db) => {
  const notes = await db
    .collection("notes")
    .find({ userName: req.user.username })
    .toArray();

  console.log(notes);
  res.status(200).json(notes);
};
