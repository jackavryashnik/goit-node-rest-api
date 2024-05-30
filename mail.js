import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: "2525",
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

function sendMail(message) {
  transporter.sendMail(message);
}

function generateMail(email, user) {
  const HOST = process.env.HOST;
  const SENDER = process.env.SENDER_EMAIL;
  const { verificationToken } = user;

  return {
    to: email,
    from: SENDER,
    subject: "Welcome to contact app",
    html: `To confirm Your email please click on the <a href="${HOST}/api/users/verify/${verificationToken}">link</a>`,
    text: `To confirm Your email please open the link ${HOST}/api/users/verify/${verificationToken}`,
  };
}

export default { sendMail, generateMail };
