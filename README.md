# Jagadeeshwaran T — Professional Portfolio

A single-page responsive portfolio with separate HTML, CSS, and JavaScript files, plus an optional Node.js/Express backend for the contact form.

## Project structure

```text
Jagadeeshwaran_T_Portfolio_GitHub_Project/
├── index.html                 # Frontend markup
├── assets/
│   ├── css/style.css          # All portfolio styling and animations
│   └── js/
│       ├── config.js          # Backend API URL
│       └── main.js            # Theme, navigation, interactions, contact form
├── backend/
│   ├── server.js              # Express contact API
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── .gitignore
└── README.md
```

## Run the frontend locally

The frontend is static. Open `index.html` in a browser for the portfolio UI. For a local server, use VS Code Live Server or run `python -m http.server 5500` from the project root. With Live Server, the page is normally at `http://127.0.0.1:5500`.

The contact form needs the backend to be running and configured. Follow `backend/README.md`. Set `window.PORTFOLIO_API_URL` in `assets/js/config.js` to the API URL. Locally, use `http://localhost:5000`.

## Publish the frontend with GitHub Pages

> GitHub Pages hosts static files only. It cannot run the Express/Node backend. The frontend can live on GitHub Pages while the backend is deployed separately (for example, to Render or another Node.js host).

1. Sign in to GitHub and create a **public repository** named `jagadeeshwaran-portfolio` (or another name you prefer).
2. Extract this ZIP and open the extracted project folder.
3. In the folder, open a terminal and run:

   ```bash
   git init
   git add .
   git commit -m "Create professional portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/jagadeeshwaran-portfolio.git
   git push -u origin main
   ```

   Replace `YOUR-USERNAME` with your actual GitHub username. If Git asks you to sign in, follow the GitHub browser authentication prompt.

4. On GitHub, open the repository → **Settings** → **Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose branch `main`, folder `/(root)`, then click **Save**.
7. Wait for the Pages deployment. The website URL will be similar to `https://YOUR-USERNAME.github.io/jagadeeshwaran-portfolio/`.

### Recommended: enable the contact form backend

1. Deploy the `backend` folder as a Node.js web service on a backend host such as Render. Set the root directory to `backend`, build command to `npm install`, and start command to `npm start`.
2. Add environment variables from `backend/.env.example` in the host dashboard. Use a Gmail **App Password** for `SMTP_PASS`; never publish credentials in GitHub.
3. Set `FRONTEND_URL` to your exact GitHub Pages origin, e.g. `https://YOUR-USERNAME.github.io` (no path). Include local origins only if needed for development.
4. Copy the deployed backend URL, e.g. `https://your-api.onrender.com`, into `assets/js/config.js`:

   ```js
   window.PORTFOLIO_API_URL = "https://your-api.onrender.com";
   ```

5. Commit and push the updated `config.js`. The contact form can then send messages through the backend.

If you don't deploy the backend or configure SMTP, the portfolio itself still loads; the form will show a useful message and the direct Gmail/email links remain available.

## Before publishing

- Check your LinkedIn, GitHub, phone, and email links.
- Do not commit `.env`, SMTP passwords, API keys, or other secrets.
- Check the site on both desktop and mobile after deployment.
- Replace any demo or placeholder project links with your real repositories/live demos.
