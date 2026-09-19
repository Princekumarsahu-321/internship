// ---- Sending emails ----
// Mailgen = builds a good-looking email
// Nodemailer = actually sends the email

const Mailgen = require("mailgen");
const nodemailer = require("nodemailer");
require("dotenv").config();


// --------------------------------------------------
// Send Email
// --------------------------------------------------

const sendMail = async (options) => {
  // Mailgen configuration
  const mailGenerator = new Mailgen({
    theme: "default",

    product: {
      name: "Homely Hub",
      link: "https://homelyhub.vercel.app",
    },
  });

  // Generate HTML email
  const emailBody = mailGenerator.generate(
    options.mailGenContent
  );

  // Generate plain-text email
  const emailText = mailGenerator.generatePlaintext(
    options.mailGenContent
  );


  // --------------------------------------------------
  // Nodemailer Transporter
  // --------------------------------------------------

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,

    port: Number(process.env.MAILTRAP_SMTP_PORT),

    secure: false,

    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });


  // --------------------------------------------------
  // Email Details
  // --------------------------------------------------

  const mail = {
    from: "hello@homelyhub.in",
    to: options.email,
    subject: options.subject,

    text: emailText,

    html: emailBody,
  };


  // --------------------------------------------------
  // Send Email
  // --------------------------------------------------

  try {
    const info = await transporter.sendMail(mail);

    console.log("Email sent successfully:", info.messageId);

    return info;
  } catch (error) {
    console.error("Email failed:", error);

    throw error;
  }
};


// --------------------------------------------------
// Forgot Password Email Content
// --------------------------------------------------

const forgotPasswordMailGenContent = (
  username,
  passwordResetUrl
) => {
  return {
    body: {
      name: username,

      intro:
        "Welcome to Homely Hub! We are sending you a link to reset your password.",

      action: {
        instructions:
          "To reset your password, please click the button below.",

        button: {
          color: "#22C55E",
          text: "Reset Your Password",
          link: passwordResetUrl,
        },
      },

      outro:
        "If you did not request a password reset, you can safely ignore this email. Need help? Just reply to this email and we will be happy to help.",
    },
  };
};


// --------------------------------------------------
// Export
// --------------------------------------------------

module.exports = {
  sendMail,
  forgotPasswordMailGenContent,
};