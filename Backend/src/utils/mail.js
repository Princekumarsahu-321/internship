import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_SMTP_HOST,
  port: Number(process.env.MAILTRAP_SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.MAILTRAP_SMTP_USER,
    pass: process.env.MAILTRAP_SMTP_PASS,
  },
});

export const sendMail = async ({
  email,
  subject,
  mailGenContent,
}) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "HomelyHub",
      link:
        process.env.ORIGIN_ACCESS_URL ||
        "http://localhost:5173",
    },
  });

  const html = mailGenerator.generate(mailGenContent);
  const text =
    mailGenerator.generatePlaintext(mailGenContent);

  return transporter.sendMail({
    from:
      process.env.MAIL_FROM ||
      "HomelyHub <hello@homelyhub.in>",
    to: email,
    subject,
    text,
    html,
  });
};

export const forgotPasswordMailGenContent = (
  username,
  passwordResetUrl
) => {
  return {
    body: {
      name: username || "User",

      intro:
        "Welcome to HomelyHub! We are sending you a link to reset your password.",

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
        "If you did not request a password reset, you can safely ignore this email.",
    },
  };
};

export default transporter;