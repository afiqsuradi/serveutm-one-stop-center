const { User } = require("../model/user");
const Profile = require("../model/profile");
const mongoose = require("mongoose");
const serviceProviderController = {};

serviceProviderController.registerProvider = async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  if (!user) return res.status(404).json({ message: "Invalid user" });
  const { language, skills, PersonalWebsite, description } = req.body;
  if (!language || !skills || !description)
    return res
      .status(400)
      .json({ message: "Language and skills data are required" });
  const profile = new Profile({
    owner: user._id,
    language: [...language],
    skills: [...skills],
    description: description,
    PersonalWebsite: PersonalWebsite,
  });
  user.profile = (await profile.save())._id;
  user.role = "service_provider";
  const result = await user.save();
  if (!result) res.status(500).json({ message: "Something wrong with server" });
  res
    .status(200)
    .json({ message: "Successfully registered as Service Provider" });
};

module.exports = serviceProviderController;
