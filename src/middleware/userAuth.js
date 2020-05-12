const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "User must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  const decoded = jwt.verify(token, JWT_SECRET);
  if (!decoded) res.status(401).json({ error: "User must be logged in" });
  else {
    req.user = decoded;
    next();
  }
};
