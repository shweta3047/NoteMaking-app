const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

const handleLogin = async (req, res, db) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).json({ response: "fields cannot be empty" });
  } else {
    const exists = await db.collection("users").findOne({ username });
    if (!exists) res.status(401).json({ response: "Email does not exits" });
    else {
      const match = await bcrypt.compare(password, exists.hash);
      if (match) {
        const payload = { username: exists.username };
        const token = jwt.sign(payload, JWT_SECRET);
        res.json({ message: "success", data: token });
      } else {
        res.status(401).json({ response: "incorrect password" });
      }
    }
  }
};

module.exports = { handleLogin };
