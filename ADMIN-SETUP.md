# Admin Dashboard Setup — Neil | Lead Funnel Builder

The dashboard and server endpoints are included in this project. They cannot display real signups until Cloudflare D1 is configured and the site is redeployed.

## 1. Create the database
1. Sign in at https://dash.cloudflare.com/
2. Open **Workers & Pages** (or **Storage & databases** → **D1 SQL Database**, depending on your dashboard layout).
3. Create a D1 database named `neil-lead-funnel-db`.
4. Open its **Console** / **Query** tab.
5. Open this project's `schema.sql`, copy all its SQL, paste it into the D1 console, and run it.

## 2. Bind it to Pages
1. Open **Workers & Pages** → your Pages project.
2. Open **Settings** → **Functions** (sometimes shown under **Bindings**).
3. Under **D1 database bindings**, choose **Add binding**.
4. Variable name must be exactly `DB`.
5. Select `neil-lead-funnel-db` and save.
6. If you use a separate Preview environment, configure the binding there too.

## 3. Set admin secrets
In the Pages project, open **Settings** → **Variables and Secrets** (or **Environment variables**).
Add these as **secrets**, not public variables:
- `ADMIN_PASSWORD`: use a strong, unique password. Do not use `1234` for a live dashboard because anyone who guesses it could access visitors' email addresses.
- `SESSION_SECRET`: use a long random value of at least 32 characters.

Save, then redeploy the project.

## 4. Test
- Open the public site and submit a test signup.
- Open `https://YOUR-PAGES-DOMAIN/admin/` and sign in using the `ADMIN_PASSWORD` secret.
- Confirm the test email appears, change its status, then test **Export CSV**.
- Delete the test record afterward.

## Notes
- `/admin/` is the dashboard.
- `/api/leads` saves form submissions to D1.
- `/thank-you.html` is the PDF download page.
- The form will not save real leads until the D1 binding is configured in the deployed environment.
- Never put secrets into `index.html`, GitHub source code, or a public chat.
