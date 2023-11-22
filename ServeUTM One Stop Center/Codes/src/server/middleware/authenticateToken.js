require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_PRIVATE_KEY,
    function (err, decoded) {
      if (err) return res.sendStatus(403);
      req.user = decoded.UserInfo;
      next();
    }
  );
};
