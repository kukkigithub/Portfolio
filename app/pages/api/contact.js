import nodemailer from "nodemailer"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email options
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, // Send to your own email
      subject: `New Contact Form Submission: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
    }

    try {
      await transporter.sendMail(mailOptions)
      res.status(200).json({ success: true, message: "Email sent successfully!" })
    } catch (error) {
      console.error("Error sending email:", error)
      res.status(500).json({ success: false, error: "Error sending email" })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}
