import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendMail = async (subject, text, html) => {
    console.log({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
    try {
        // Verify connection configuration
        await transporter.verify();
        console.log("🔌 SMTP connection verified");

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.SMTP_EMAIL}>`,
            to: process.env.ADMIN_EMAIL,
            subject,
            text,
            html,
        });
        console.log("📩 Email sent successfully!");
    } catch (error) {
        console.error("❌ Email error:", error.message);
        throw new Error("Email sending failed");
    }
};