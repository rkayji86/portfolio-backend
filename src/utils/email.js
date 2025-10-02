import nodemailer from "nodemailer";
import SibApiV3Sdk from '@sendinblue/client';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendMail = async (subject, text, html) => {
    try {
        // Verify connection configuration
        await transporter.verify();

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

const brevo = new SibApiV3Sdk.TransactionalEmailsApi();
brevo.setApiKey(
    SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);

export const sendEmailHttp = async (subject, text, html) => {
    try {
        const response = await brevo.sendTransacEmail({
            sender: { email: process.env.SMTP_EMAIL, name: "Portfolio Contact" },
            to: [{ email: process.env.ADMIN_EMAIL }],
            subject,
            textContent: text,
            htmlContent: html,
        });

        console.log("📩 Email sent successfully!", response);
        return true;
    } catch (error) {
        console.error("❌ Email error:", error.message);
        throw new Error("Email sending failed");
    }
};