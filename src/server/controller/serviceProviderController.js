const { User } = require("../model/user");
const Profile = require("../model/profile");
const { pickUserData, pickProfileData } = require("./helper/database");
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
  const result = await user.save({ validateModifiedOnly: true });
  if (!result) res.status(500).json({ message: "Something wrong with server" });
  res
    .status(200)
    .json({ message: "Successfully registered as Service Provider" });
};

serviceProviderController.getSellerByUsername = async (req, res) => {
  const username = req.params.username;
  if (!username) return res.sendStatus(400);
  const user = await User.findOne({ username });
  if (!user)
    return res
      .status(400)
      .json({ message: `User with username of ${username} not found` });
  const profile = await Profile.findOne({ owner: user._id });
  if (!profile)
    return res
      .status(400)
      .json({ message: `Seller data with username of ${username} not found` });
  const pickedProfile = pickProfileData(profile);
  return res.status(200).send(pickedProfile);
};

serviceProviderController.updateSellerInfo = async (req, res) => {
  const username = req.user.username;
  if (!username) return res.sendStatus(400);
  const user = await User.findOne({ username });
  if (!user)
    return res
      .status(400)
      .json({ message: `User with username of ${username} not found` });
  const profile = await Profile.findOne({ owner: user._id });
  if (!profile)
    return res
      .status(400)
      .json({ message: `Seller data with username of ${username} not found` });

  const { description, language, skills, PersonalWebsite } = req.body;
  if (!description || !language || !skills)
    return res
      .status(400)
      .json({ message: `Description, language and skills are required` });
  profile.description = description;
  profile.language = language;
  profile.skills = skills;
  profile.PersonalWebsite = PersonalWebsite;
  try {
    const result = await profile.save({ validateModifiedOnly: true });

    if (!result)
      return res.status(500).json({ message: "Something went wrong" });
    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = serviceProviderController;
