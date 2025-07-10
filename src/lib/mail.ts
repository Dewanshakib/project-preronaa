import nodemailer from "nodemailer"

export const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_ID!,
        pass: process.env.GMAIL_PASS!
    }
})

export async function sendEmail(to: string, link: string) {
    await transpoter.sendMail({
        from: process.env.EMAIL_FROM!,
        to,
        subject: 'Reset Password',
        html: `<h2>Password Reset Request</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${link}" target="_blank">${link}</a>
        <p>This link will expire in 10 minutes.</p>
      
        <p>If you did not request this ,please ignore this email.</p>
      `
    })
}
