module.exports = async (req, res, db) => {
  const { title, text, caption } = req.body;
  if (title.length === 0)
    res.status(401).json({ error: "titile must be given to new note" });
  const user = await db
    .collection("users")
    .findOne({ username: req.user.username });
  //console.log(user);
  const id = user._id;
  const userName = user.username;
  const notes = await db
    .collection("notes")
    .insertOne({ id, userName, title, text, caption });
  //console.log(notes);
  const notesid = notes.insertedid;
  //console.log(notesid);
  await db
    .collection("users")
    .updateOne({ useername: req.user.username }, { $push: { notes: notesid } });
};
