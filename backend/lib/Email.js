import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // true for port 587, false for other ports
  auth: {
    user: process.env.NODE_EMAIL, // Secure email from .env
    pass: process.env.NODE_PASSWORD, // Secure password from .env
  },
});

// Function to send a verification email
export const sendVerificationEmail = async (recipientEmail, verificationCode) => {
  try {
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; background: linear-gradient(135deg, #6dd5ed, #2193b0); color: #ffffff; border-radius: 10px; text-align: center; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
    <h2 style="margin-bottom: 10px;">🔐 Verify Your Email</h2>
    <p style="font-size: 16px; margin-bottom: 15px;">Thank you for signing up! Use the verification code below to complete your registration:</p>
    
    <div style="background: #ffffff; color: #2193b0; font-size: 24px; font-weight: bold; padding: 10px; border-radius: 5px; display: inline-block; margin-bottom: 15px;">
        ${verificationCode}
    </div>
    
    <p style="font-size: 14px;">This code is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
    <p style="font-size: 12px;">If you did not request this, please ignore this email.</p>
    
    <a href="http://localhost:5173/emailverification" style="display: inline-block; margin-top: 20px; padding: 10px 20px; font-size: 16px; font-weight: bold; color: #2193b0; background: #ffffff; border-radius: 5px; text-decoration: none; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);">
        Verify Now
    </a>
    
    <p style="margin-top: 20px; font-size: 14px;">Best regards,<br><strong>PassVault</strong></p>
</div>

    `;

    const info = await transporter.sendMail({
      from: `"PassVault" <${process.env.NODE_EMAIL}>`, // Sender email
      to: recipientEmail, // Dynamic recipient
      subject: "Your Verification Code for PassVault", // Email subject
      html: emailHTML, // Email body
    });

    console.log("Verification email sent to:", recipientEmail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendWelcomeEmail = async (recipientEmail) => {
  try {
    const emailHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; background: linear-gradient(135deg, #6dd5ed, #2193b0); color: #ffffff; border-radius: 10px; text-align: center; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
            <h1 style="margin-bottom: 10px;">🎉 Welcome to PassVault! 🎉</h1>
            <p style="font-size: 16px; margin-bottom: 15px;">Congratulations! Your email has been successfully verified.</p>
            <p style="font-size: 14px;">We’re excited to have you on board. Get ready to explore amazing features and secure Your logins.</p>
            
            <a href="http://localhost:5173" style="display: inline-block; margin-top: 20px; padding: 10px 20px; font-size: 16px; font-weight: bold; color: #2193b0; background: #ffffff; border-radius: 5px; text-decoration: none; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);">
                Go to Dashboard
            </a>
            
            <p style="margin-top: 20px; font-size: 12px; color: #e3f2fd;">If you have any questions, feel free to contact our support team.</p>
            <p style="font-size: 14px; margin-top: 15px;">Best regards,<br><strong>PassVault</strong></p>
        </div>
      `;

    const info = await transporter.sendMail({
      from: `"PassVault" <${process.env.NODE_EMAIL}>`,
      to: recipientEmail,
      subject: "🎉 Welcome to PassVault!",
      html: emailHTML,
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

export const sendNewDeviceEmail = async (recipientEmail, activity) => {
  try {
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background-color: #f9fafb;">
        <h2 style="color: #1e293b; text-align: center;">New Device Login Alert</h2>
        <p style="color: #4b5563;">Hello,</p>
        <p style="color: #4b5563;">Your account was accessed from a new device. If this was not you, please reset your password immediately.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr style="background-color: #e5e7eb;">
            <th style="padding: 10px; text-align: left; color: #1e293b;">Device Info</th>
            <th style="padding: 10px; text-align: left; color: #1e293b;">Details</th>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">📍 IP Address</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${activity.ip}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">🌍 Location</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${activity.location}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">🖥️ Browser</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${activity.browser}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">💻 OS</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${activity.os}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">📱 Device</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${activity.device}</td>
          </tr>
        </table>
        <p style="color: #4b5563; margin-top: 20px;">If this was you, no action is required. If not, please <a href="http://localhost:5173/resetpassword" style="color: #3b82f6; text-decoration: none;">reset your password</a> immediately.</p>
        <p style="color: #4b5563;">Stay Safe, <br> <strong>PassVault Team</strong></p>
      </div>
    `;

    await transporter.sendMail({
      from: `"PassVault" <${process.env.NODE_EMAIL}>`,
      to: recipientEmail,
      subject: "New Device Login Alert",
      html: emailHTML,
    });
    console.log("New device login email sent!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendPasswordChangeEmail = async (recipientEmail, activity) => {
  try {

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9fafb; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #1e293b; text-align: center;">🔒 Password Changed Successfully</h2>
        <p style="color: #4b5563;">Hello,</p>
        <p style="color: #4b5563;">Your account password has been changed. If this was not you, please reset your password immediately.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr style="background-color: #e5e7eb;">
            <th style="padding: 10px; text-align: left; color: #1e293b;">Details</th>
            <th style="padding: 10px; text-align: left; color: #1e293b;">Information</th>
          </tr>
          <tr><td style="padding: 10px;">📍 IP Address</td><td style="padding: 10px;">${activity.ip}</td></tr>
          <tr><td style="padding: 10px;">🌍 Location</td><td style="padding: 10px;">${activity.location}</td></tr>
          <tr><td style="padding: 10px;">🖥️ Browser</td><td style="padding: 10px;">${activity.browser}</td></tr>
          <tr><td style="padding: 10px;">💻 OS</td><td style="padding: 10px;">${activity.os}</td></tr>
        </table>
        <p style="color: #4b5563; margin-top: 20px;">If this was you, no action is required. If not, please <a href="http://localhost:5173/resetpassword" style="color: #3b82f6; text-decoration: none;">reset your password</a> immediately.</p>
        <p style="color: #4b5563; margin-top: 20px;">Stay Secure, <br> <strong>Your Security Team</strong></p>
      </div>
    `;

    await transporter.sendMail({
      from: `"PassVault" <${process.env.NODE_EMAIL}>`,
      to: recipientEmail,
      subject: "Password Changed Successfully",
      html: emailHTML,
    });
    console.log("Password change email sent!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendOtpEmail = async (recipientEmail, verificationCode) => {
  try {
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; background: linear-gradient(135deg, #6dd5ed, #2193b0); color: #ffffff; border-radius: 10px; text-align: center; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
    <h2 style="margin-bottom: 10px;">🔐 Verify Your Email</h2>
    <p style="font-size: 16px; margin-bottom: 15px;">Use the verification code below to reset your password</p>
    
    <div style="background: #ffffff; color: #2193b0; font-size: 24px; font-weight: bold; padding: 10px; border-radius: 5px; display: inline-block; margin-bottom: 15px;">
        ${verificationCode}
    </div>
    
    <p style="font-size: 14px;">This code is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
    <p style="font-size: 12px;">If you did not request this, please ignore this email.</p>
    
    <p style="margin-top: 20px; font-size: 14px;">Best regards,<br><strong>PassVault</strong></p>
</div>

    `;

    const info = await transporter.sendMail({
      from: `"PassVault" <${process.env.NODE_EMAIL}>`, // Sender email
      to: recipientEmail, // Dynamic recipient
      subject: "Your Verification Code for PassVault", // Email subject
      html: emailHTML, // Email body
    });

    console.log("Verification email sent to:", recipientEmail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

