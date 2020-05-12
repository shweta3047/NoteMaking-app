const bcrypt = require("bcrypt");

const handleSignup = async (req, res, db) => {
  const { username, password } = req.body;

  if (!username || !password) res.json({ error: "Fields can not be empty" });

  const exists = await db.collection("users").findOne({ username });
  if (exists) res.json({ error: "username already exits" });
  else {
    const hash = await bcrypt.hash(password, 10);
    await db.collection("users").insertOne({ username, hash });
  }
};

module.exports = { handleSignup };
