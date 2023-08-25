const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../model/user");
const { validateUser } = require("../model/validator");
const { VerificationToken } = require("../model/verificationToken");
const { genToken } = require("../utils/tokenGen");

router.post("/", async (req, res) => {
  // Validate with zod
  const user = validateUser({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role ? req.body.role : undefined,
  });
  // If invalid send error
  if (!user.success) return res.status(400).send(user.error);
  // Add data to mongo schema
  const newUser = new User(user.data);
  //Encrypt password
  try {
    const pass = await bcrypt.hash(
      newUser.password,
      Number(process.env.SALT_ROUND)
    );
    newUser.password = pass;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  // Create new verify token
  try {
    req.body.token = await bcrypt.hash(
      genToken(),
      Number(process.env.SALT_ROUND)
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  const verifyToken = new VerificationToken({
    owner: newUser._id,
    token: req.body.token,
  });
  // Save User and token
  const resultUser = await newUser.save();
  const resultToken = await verifyToken.save();
  if (!resultUser || !resultToken)
    return res.status(500).send({ message: "Something went wrong" });
  return res.status(200).send(resultUser);
});

module.exports = router;
