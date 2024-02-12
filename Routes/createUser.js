const express = require("express");
const router = express.Router();
const User = require('../model/user'); // Replace with the actual path to your User model

router.post('/createuser', async (req, res) => {
    try {
        // Extract necessary information from the request
        const { number } = req.body;

        // Check if the user with the given number already exists
        const existingUser = await User.findOne({ number });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this number already exists' });
        }

        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Get the current timestamp
        const otpGeneratedAt = new Date();

        // Create a new user in the database
        const newUser = await User.create({
            number,
            otp,
            otpGeneratedAt,
            // No need to initialize other fields as they will be undefined or null by default
        });

        // TODO: Send the OTP to the user (e.g., via SMS or email)

        res.status(200).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

module.exports = router;
