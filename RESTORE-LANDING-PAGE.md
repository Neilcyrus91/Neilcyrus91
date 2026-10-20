# Restore the public landing page and keep the admin dashboard

This project is prepared for the existing Git-connected Cloudflare Pages project. The archive has the website files at its top level. When copied into the GitHub repository, preserve all folders exactly as shown below.

## Required repository structure

```text
index.html                  # Public landing page (NOT the admin login)
styles.css
app.js
privacy.html
thank-you.html
lead-funnel-starter-guide.pdf
assets/
  lead-funnel-mockup.png
  neil-working-at-laptop.png
  neil-lead-funnel-office.png
admin/
  index.html                # Admin login/dashboard at /admin/
functions/
  api/
    leads.js                # POST /api/leads
    admin/
      _auth.js
      login.js              # POST /api/admin/login
      logout.js             # POST /api/admin/logout
      leads.js              # /api/admin/leads
schema.sql
```

## Safest repair method using GitHub Desktop

1. Download and extract `neil-lead-funnel-github-ready.zip`.
2. Open GitHub Desktop and choose **File → Clone Repository**.
3. Select `Neilcyrus91/Neilcyrus91` and clone it to your Mac.
4. Open the cloned repository folder in Finder.
5. Copy the extracted project files and folders into the cloned repository, replacing the incorrect website files when asked. Keep the `admin/`, `assets/`, and `functions/` folders intact. Do not move `admin/index.html` to the repository root.
6. Before committing, verify that the repository-root `index.html` begins with the title `Neil | Lead Funnel Builder — Free Lead Funnel Starter Guide` and that `admin/index.html` is still inside the `admin` folder.
7. In GitHub Desktop, review the changes, commit them to `main`, then click **Push origin**.
8. Wait for Cloudflare Pages to finish deploying the new commit.
9. Test `/` for the public landing page and `/admin/` for the admin login.

## Cloudflare settings to retain

- D1 binding variable name: `DB`
- D1 database: `neil-lead-funnel-db`
- Production secrets: `ADMIN_PASSWORD` and `SESSION_SECRET`
- Run `schema.sql` in the D1 database console if the `leads` table has not been created.
- Redeploy after changing bindings or secrets.

Never put passwords, session secrets, or tokens in GitHub or in a public chat. The admin will not display sign-ups until the Pages Functions are deployed and the D1 schema/binding are configured correctly.
