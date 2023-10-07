const Service = require("../model/services");
const Profile = require("../model/profile");
const { User } = require("../model/user");

const MAX_IMAGES = 3;
const serviceController = {};
serviceController.createService = async (req, res) => {
  try {
    const { title, description, category, faq, pricePackage, images } =
      JSON.parse(req.body.json);
    // Validate data
    if (!title || !description || !category) {
      return res
        .status(400)
        .json({ message: "Title, description and category are required" });
    }
    if (!Array.isArray(faq) || faq.length === 0) {
      return res.status(400).json({ message: "FAQ is required" });
    }

    if (!Array.isArray(pricePackage) || pricePackage.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one pricing package is required" });
    }

    if (images && !Array.isArray(images) && images.length > MAX_IMAGES) {
      return res
        .status(400)
        .json({ message: `Cannot upload more than ${MAX_IMAGES} images` });
    }

    // Get Files
    if (!req.files) {
      return res
        .status(500)
        .json({ message: `Error while uploading images, please try again.` });
    }
    uploadedImages = req.files.map((file) => file.filename);

    // Create service
    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ message: `User not found` });
    const profile = await Profile.findOne({ owner: user._id });
    if (!profile)
      return res.status(404).json({ message: `User profile not found` });
    const service = await Service.create({
      owner: profile.owner,
      title,
      description,
      category,
      faq,
      pricePackage,
      images: uploadedImages,
    });
    profile.services.push(service._id);
    const result = await profile.save({ validateModifiedOnly: true });
    if (result) {
      res.status(201).json(service);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

serviceController.getServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filter criteria
    const filter = {};
    if (req.query.textInput && req.query.type) {
      filter[req.query.type] = new RegExp(`.*${req.query.textInput}.*`);
    }
    if (req.query.gigStatus) {
      filter.isApproved = req.query.gigStatus;
    }

    // Count total documents
    const count = await Service.countDocuments(filter);

    // Find paginated documents
    const services = await Service.find(filter)
      .skip(skip)
      .limit(limit)
      .populate("owner")
      .exec();

    services.forEach((service) => {
      service.images = service.images.map(
        (url) => `${req.protocol}://${req.get("host")}/images/thumbnails/${url}`
      );
    });

    res.json({
      count,
      services: services,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = serviceController;
