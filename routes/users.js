const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const sendResetPasswordEmail = require('../utils/resetEmail');


// Register a new user
//http://localhost:3000/users/register
router.post("/register", async (req, res, next) => {
  try {
    const { email, password, role, name, lastName, phoneNumber } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create a new user
    const user = new User({ email, password, role, name, lastName, phoneNumber });
    await user.save();

    res.json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
});

// Authenticate a user and return a JWT token
//http://localhost:3000/users/login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Add the urlRedirect property to the response
    let urlRedirect = '/dashboard'; // Default redirection URL for non-admin and non-moderator roles

    if (user.role === 'admin') {
      urlRedirect = '/admin-dashboard';
    } else if (user.role === 'moderator') {
      urlRedirect = '/dashboard-moderator';
    }

    res.json({ token, urlRedirect });
  } catch (err) {
    next(err);
  }
});

// Define an endpoint to initiate a password reset
router.post("/forgot-password", async (req, res, next) => {
  try {
    // Extract the email from the request body
    const { email } = req.body;

    // Look up the user by their email in the database
    const user = await User.findOne({ email });

    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a password reset token and save it to the user's account
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    // Save the changes to the database
    await user.save();

    // Send a password reset email to the user with a link to the password reset page
    const resetUrl = `https://swift-collab.vercel.app/reset-password/${token}`;
    await sendResetPasswordEmail(user.email, resetUrl);

    // Return a success message
    res.json({ message: "Password reset email sent" });
  } catch (err) {
    // If an error occurs, pass it on to the error handler middleware
    next(err);
  }
});

// Define an endpoint to handle password reset requests
router.get("/reset-password/:token", async (req, res, next) => {
  try {
    // Look up the user by their reset token in the database
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }, // Check if token is not expired
    });

    // If the user is not found or the reset token is expired, return an error
    if (!user) {
      return res.status(400).json({ message: "Invalid reset token" });
    }

    // Render the password reset page with the reset token as a hidden input
    res.render("reset-password", { token: req.params.token });
  } catch (err) {
    // If an error occurs, pass it on to the error handler middleware
    next(err);
  }
});

// Define an endpoint to handle password reset submissions
router.post("/reset-password", async (req, res, next) => {
  try {
    // Extract the reset token and new password from the request body
    const { token, password } = req.body;

    // Look up the user by their reset token in the database
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Check if token is not expired
    });

    // If the user is not found or the reset token is expired, return an error
    if (!user) {
      return res.status(400).json({ message: "Invalid reset token" });
    }

    // Update the user's password with the new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the changes to the database
    await user.save();

    // Return a success message
    res.json({ message: "Password successfully reset" });
  } catch (err) {
    // If an error occurs, pass it on to the error handler middleware
    next(err);
  }
});

// Get a list of all users (only accessible to admin users)
//http://localhost:3000/users/
router.get("/", auth, async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({ message: "Authorization failed" });
    }
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Update a user's profile
//http://localhost:3000/users/update/${id}
router.put("/update/:id", auth, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.email = email || user.email;
    user.password = password || user.password;
    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    next(err);
  }
});

// Delete a user (only accessible to admin users)
//http://localhost:3000/users/delete/${id}
router.delete("/delete/:id", auth, async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({ message: "Authorization failed" });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
