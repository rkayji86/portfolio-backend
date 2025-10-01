import { sendMail } from "../utils/email.js";

export const submitContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        // Send Email
        await sendMail(
            `New Contact from ${name}`,
            `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
        );

        res.status(201).json({
            success: true,
            message: "Thank You for contacting us we will get back to you within 24 hours."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};