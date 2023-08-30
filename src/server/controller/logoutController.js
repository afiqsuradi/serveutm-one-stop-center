const jwtCookie = require("./helper/cookie");
const { User } = require("../model/user");

const logoutController = {};

logoutController.handleLogout = async (req, res) => {
  // Get token from cookie
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(204);
  const refreshToken = cookie?.jwt;
  // Get user from refresh token
  const user = await User.findOne({ refreshToken: refreshToken });
  if (!user) {
    res.clearCookie(jwtCookie.name, jwtCookie.properties);
    return res.sendStatus(204);
  }
  //save user to database
  const result = await User.updateOne(user, {
    $set: { refreshToken: "" },
  });
  if (!result) res.sendStatus(500);
  res.clearCookie(jwtCookie.name, jwtCookie.properties);
  return res.sendStatus(200);
};

module.exports = logoutController;
