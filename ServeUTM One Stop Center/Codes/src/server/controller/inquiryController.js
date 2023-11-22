const { Inquiry } = require("../model/inquiry");

const inquiryController = {};

inquiryController.getInquiries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    // Filter criteria
    const filter = {};
    if (req.query.textInput && req.query.type) {
      filter[req.query.type] = new RegExp(`.*${req.query.textInput}.*`);
    }

    // Count total documents
    const count = await Inquiry.countDocuments(filter);

    // Find paginated documents
    const inquiries = await Inquiry.find(filter).skip(skip).limit(limit);

    res.json({
      count,
      inquiries,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

inquiryController.addInquiry = async (req, res) => {
  try {
    // Validate request body
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required",
      });
    }

    // Create inquiry
    const inquiry = new Inquiry({
      name,
      email,
      message,
    });

    // Save to database
    await inquiry.save();

    res.status(201).json({
      message: "Inquiry submitted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

inquiryController.deleteInquiry = async (req, res) => {
  try {
    // Validate user role
    if (req.user.role !== "admin") {
      return res.status(401).send({ message: "Unauthorized" });
    }

    // Find user by username
    const inquiry = await Inquiry.findOne({ _id: req.params.id });

    if (!inquiry) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user
    await inquiry.deleteOne();
    res.status(200).send({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = inquiryController;
