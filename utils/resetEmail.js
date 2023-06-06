const nodemailer = require("nodemailer");

// Create a transporter to send the email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

//TODO: Get an email
// Define a function to send the password reset email
async function sendResetPasswordEmail(email, resetUrl) {
  // Define the email message
  const message = {
    from: "Your App <noreply@yourapp.com>",
    to: email,
    subject: "Password Reset Request",
    html: `
      <div style="background-color:#f6f6f6;padding:20px;">
        <div style="background-color:#ffffff;border-radius:10px;padding:20px;">
          <h2 style="color:#333333;font-size:24px;font-weight:bold;margin-top:0;">Password Reset Request</h2>
          <p style="color:#666666;font-size:16px;">You recently requested a password reset. Please click the button below to reset your password.</p>
          <a href="${resetUrl}" style="display:inline-block;background-color:#007bff;border-radius:5px;color:#ffffff;font-size:16px;font-weight:bold;padding:10px 20px;text-decoration:none;">Reset Password</a>
        </div>
      </div>
    `,
  };

  // Send the email using the transporter
  await transporter.sendMail(message);
}

module.exports = sendResetPasswordEmail;
