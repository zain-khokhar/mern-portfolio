// app/api/sendmail/route.js
import nodemailer from 'nodemailer';

export async function POST(req) {
  const { username, email, message } = await req.json();

  if (!username || !email || !message) {
    return new Response(JSON.stringify({ success: false, error: 'All fields are required' }), { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid email address' }), { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact from ${username}`,
      text: `Name: ${username}\nEmail: ${email}\nMessage: ${message}`,
    });

    return new Response(JSON.stringify({ success: true, message: 'Email sent successfully!' }), { status: 200 });
  } catch (err) {
    console.error('Send Error:', err);
    return new Response(JSON.stringify({ success: false, error: 'Failed to send email' }), { status: 500 });
  }
}
