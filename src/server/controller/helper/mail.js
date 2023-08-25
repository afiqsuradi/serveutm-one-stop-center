require("dotenv").config();
const { transportMail } = require("../../utils/mail");

async function sendMail(email, token) {
  return await transportMail.sendMail({
    from: "no-reply@serveUTM.com",
    to: email,
    subject: "Verify Your Email",
    html: `<a href=\"${process.env.BASE_URL}/verify?token=${token}\">Verify Email</a>`,
  });
}
module.exports.sendMail = sendMail;
