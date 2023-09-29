const jwt = require("jsonwebtoken");
const { JWTSecretToken } = require("../configs/config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).send("you need to enter token");
    return;
  }
  try {
    const payload = jwt.verify(token, JWTSecretToken);
    req.user = payload;
    next();
  } catch {
    res.status(400).send("invalid token");
  }
};
