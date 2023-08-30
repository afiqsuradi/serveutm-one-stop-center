require("dotenv").config();
const { transportMail } = require("../../utils/mail");

async function sendVerifyMail(email, url, token) {
  return await transportMail.sendMail({
    from: "no-reply@serveutm.online",
    to: email,
    subject: "Verify Your Email",
    html: `<a href=\"${url}/verify-confirm?token=${token}\">Verify Email</a>`,
  });
}
module.exports.sendVerifyMail = sendVerifyMail;
