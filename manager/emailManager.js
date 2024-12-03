const jsonwebtoken = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const emailManager = async (to, subject, text, html) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "49dfd459e6844a",
      pass: "b342e2b9374ff4",
    },
  });
  await transport.sendMail({
    to: to,
    from: "info@expensetrack.com",
    subject: subject,
    text: text,
    html: html,
  });
};
module.exports = emailManager;
