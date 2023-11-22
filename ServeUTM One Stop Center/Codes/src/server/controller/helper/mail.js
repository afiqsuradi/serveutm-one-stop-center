require("dotenv").config();
const { transportMail } = require("../../utils/mail");
const verifyMail = require("./template/verifyMail");
const resetPasswordMail = require("./template/resetPasswordMail");

async function sendVerifyMail(email, token) {
  return await transportMail.sendMail({
    from: "no-reply@serveutm.online",
    to: email,
    subject: "Verify Your Email",
    html: verifyMail(process.env.ORIGIN_URL, token),
  });
}
async function sendPasswordResetMail(email, token) {
  return await transportMail.sendMail({
    from: "no-reply@serveutm.online",
    to: email,
    subject: "One-time code for password reset",
    html: resetPasswordMail(token),
  });
}
module.exports = { sendVerifyMail, sendPasswordResetMail };
