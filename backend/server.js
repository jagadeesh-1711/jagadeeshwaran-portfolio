const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5500,http://127.0.0.1:5500,http://localhost:5000')
  .split(',').map(value => value.trim()).filter(Boolean);

app.use(helmet());
app.use(cors({ origin(origin, callback) {
  if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
  return callback(new Error('Origin is not allowed by CORS.'));
}}));
app.use(express.json({ limit: '20kb' }));
app.use('/api/contact', rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: 'draft-7', legacyHeaders: false }));

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'portfolio-contact-api' }));

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (![name, email, subject, message].every(value => typeof value === 'string' && value.trim())) {
    return res.status(400).json({ error: 'Please complete all required fields.' });
  }
  if (name.length > 80 || email.length > 160 || subject.length > 140 || message.length > 4000) {
    return res.status(400).json({ error: 'One or more fields exceed the allowed length.' });
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });

  const required = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_TO'];
  const missing = required.filter(key => !process.env[key]);
  if (missing.length) return res.status(503).json({ error: 'Contact email service is not configured yet. Please email jagadeeshwaran024@gmail.com directly.' });

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || 'false') === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    await transporter.sendMail({
      from: `Portfolio Contact <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: { name: name.trim(), address: email.trim() },
      subject: `[Portfolio] ${subject.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
    });
    return res.status(200).json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact email delivery failed:', error.message);
    return res.status(502).json({ error: 'Email delivery failed. Please try again later or contact me directly by email.' });
  }
});

app.use((error, _req, res, _next) => {
  if (error && error.message === 'Origin is not allowed by CORS.') return res.status(403).json({ error: error.message });
  console.error(error);
  return res.status(500).json({ error: 'Unexpected server error.' });
});

app.listen(PORT, () => console.log(`Portfolio API listening on port ${PORT}`));
