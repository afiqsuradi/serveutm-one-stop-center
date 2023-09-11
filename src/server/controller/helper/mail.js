require("dotenv").config();
const { transportMail } = require("../../utils/mail");
const verifyMail = require("./template/verifyMail");

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
    html: `<a href="${process.env.ORIGIN_URL}/password-reset/confirm?token=${token}">Reset Password</a>`,
  });
}
module.exports = { sendVerifyMail, sendPasswordResetMail };
