const Inquiry = require("../model/inquiry");

const inquiryController = {};

inquiryController.getInquiries = async (req, res) => {
  try {
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

module.exports = inquiryController;
