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
    const uploadedImages = req.files.map((file) => file.filename);

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

serviceController.deleteService = async (req, res) => {
  try {
    // Check if the owner requested deletion
    if (!(req.params.username === req.user.username)) {
      // Validate user role
      if (req.user.role !== "admin") {
        return res.status(401).send({ message: "Unauthorized" });
      }
    }
    const { serviceId } = req.body;
    if (!serviceId)
      return res.status(401).json({ message: "Invalid Service Id" });
    // Find user by username
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });
    // Find service by id
    //Delete Service Using id
    const service = await Service.findOne({ _id: serviceId });
    const profile = await Profile.findOne({ owner: user._id });
    if (!service || !profile)
      return res.status(404).json({ message: "Service or profile not found" });

    // Update profile
    profile.services = profile.services.filter((id) => id !== service._id);
    // Delete Service
    await service.deleteOne();
    // Save Profile
    await profile.save({ validateModifiedOnly: true });

    res.status(200).send({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

serviceController.getService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    if (!serviceId)
      return res.status(401).json({ message: "Invalid Service Id" });
    const service = await Service.findOne({ _id: serviceId })
      .populate("owner", "name username profileImage")
      .exec();
    service.owner.profileImage = `${req.protocol}://${req.get("host")}/${
      service.owner.profileImage
    }`;
    if (!service) return res.status(404).json({ message: "Service not found" });
    service.images = service.images.map(
      (url) => `${req.protocol}://${req.get("host")}/images/thumbnails/${url}`
    );
    return res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

serviceController.updateService = async (req, res) => {
  try {
    const target = req.query.serviceId;
    // If its another user then check if its admin
    if (
      req.query.requestor !== req.user.username &&
      !(req.user.role === "admin")
    )
      return res.status(403).json({ message: "Access Denied." });
    if (!target) return res.sendStatus(400);
    // Done authorisation check

    // Data check
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
    // Done Basic Data check

    // Get Files
    if (!req.files) {
      return res
        .status(500)
        .json({ message: `Error while uploading images, please try again.` });
    }
    const uploadedImages = req.files.map((file) => file.filename);

    //Find service
    const service = await Service.findOne({ _id: target });
    if (!service)
      return res
        .status(404)
        .json({ message: `Service with id of: ${target} not found` });
    service.title = title;
    service.description = description;
    service.category = category;
    service.faq = faq;
    service.pricePackage = pricePackage;
    service.images = uploadedImages;
    const result = await service.save({ validateModifiedOnly: true });

    if (!result)
      return res.status(500).json({ message: "Something went wrong" });
    return res.status(200).json(service);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = serviceController;
