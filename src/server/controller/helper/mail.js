const { transportMail } = require("../../utils/mail");

async function sendVerifyMail(email, url, token) {
  return await transportMail.sendMail({
    from: "no-reply@serveutm.online",
    to: email,
    subject: "Verify Your Email",
    html: `<a href=\"${url}/verify-confirm?token=${token}\">Verify Email</a>`,
  });
}
async function sendPasswordResetMail(email, url, token) {
  return await transportMail.sendMail({
    from: "no-reply@serveutm.online",
    to: email,
    subject: "One-time code for password reset",
    html: `<a href="${url}/password-reset/confirm?token=${token}">Reset Password</a>`,
  });
}
module.exports = { sendVerifyMail, sendPasswordResetMail };
