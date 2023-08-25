const { User } = require("../model/user");
const { validateUserInput } = require("./helper/validation");
const { createUserInDatabase } = require("./helper/database");
const { generateVerificationToken } = require("./helper/token");
const { sendMail } = require("./helper/mail");

const userController = {};

userController.validateAndCreateUser = async (req, res) => {
  try {
    const user = await validateUserInput(req.body);

    if (!user.success) {
      return res.status(400).send(user.error);
    }

    const existingUser = await User.findOne({ email: user.data.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const newUser = await createUserInDatabase(user.data);
    const token = await generateVerificationToken(newUser._id);
    sendMail(newUser.email, token.token);
    return res.status(200).send(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.userController = userController;
