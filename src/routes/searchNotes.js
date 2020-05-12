module.exports = async (req, res, db) => {
  const { search } = req.body;
  const notes = await db
    .collection("notes")
    .find({ userName: req.user.username }, { $text: { $search: search } })
    .toArray();
  console.log(notes);

  res.json({ searchResults: notes });
};
