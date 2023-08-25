const crypto = require("crypto");
module.exports.genToken = () => crypto.randomBytes(32).toString("hex");
