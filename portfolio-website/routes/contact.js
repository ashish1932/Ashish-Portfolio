const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', (req, res) => {
    const { name, email, message } = req.body; // Destructure form data

    if (!name || !email || !message) {
        return res.status(400).send('All fields are required.');
    }

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
        service: 'ashishkumar1932005@gmail.com', // You can change this to your email provider
        auth: {
            user: process.env.EMAIL_USER, // Load from .env file
            pass: process.env.EMAIL_PASS  // Load from .env file
        }
    });

    // Email options
    const mailOptions = {
        from: email, // The sender's email (from contact form)
        to: process.env.RECEIVER_EMAIL, // Your email (receiver)
        subject: `New message from ${name}`,
        text: `You have received a new message from ${name} (${email}): \n\n${message}`
    };

    // Sending email using Nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending message.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Message sent successfully!');
        }
    });
});

module.exports = router;
