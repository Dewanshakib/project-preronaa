import nodemailer from "nodemailer"

export const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_ID!,
        pass: process.env.GMAIL_PASS!
    }
})

export async function sendEmail(to: string, token: string) {
    await transpoter.sendMail({
        from: process.env.EMAIL_FROM!,
        to,
        subject: 'Reset Password',
        html: `<h2>Password Reset Request</h2>
        <p>Copy the token below to reset your password:</p>
        <p>${token}</p>
        <p>This token will expire in 10 minutes.</p>
      
        <p>If you did not request this ,please ignore this email.</p>
      `
    })
}
