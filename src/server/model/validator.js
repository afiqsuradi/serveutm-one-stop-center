const mongoose = require("mongoose");
const z = require("zod");

exports.validateUser = (userData) => {
  const User = z.object({
    name: z.string().min(5).max(50).trim(),
    username: z.string().min(5).max(20).trim(),
    email: z.string().email().trim().min(5).max(255),
    password: z.string().min(5).max(255),
    role: z
      .string()
      .enum(["user", "service_provider", "admin"])
      .default("user"),
    services: z
      .array(z.instanceof(mongoose.Schema.Types.ObjectId).ref("Service"))
      .optional(),
  });
  return User.parse(userData);
};
