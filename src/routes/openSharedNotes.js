const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

module.exports = (req, res, db) => {
  const token = req.params.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  console.log(decoded);
  if (!decoded) res.status(401).json({ error: "Invalid link" });
  else {
    res.json({ notes: decoded });
  }
};
