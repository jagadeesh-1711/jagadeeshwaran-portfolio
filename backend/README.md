# Portfolio contact API

## Run locally
1. Install Node.js 20 or later.
2. In this folder run `npm install`.
3. Copy `.env.example` to `.env` and fill in your SMTP credentials. Never commit `.env`.
4. Run `npm run dev`. Health check: `http://localhost:5000/api/health`.

For Gmail SMTP, enable 2-Step Verification and create a Google App Password. Do not use your regular Gmail password.
