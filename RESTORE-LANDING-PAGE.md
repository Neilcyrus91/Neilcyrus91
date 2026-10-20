# Restore the public landing page and keep the admin dashboard

The project must be uploaded with its folder structure preserved. Do NOT upload every file from every folder into the repository root.

## Required structure

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

## Safest replacement method with GitHub Desktop

1. Download and extract this ZIP on your computer.
2. Install/open GitHub Desktop and choose **File → Clone Repository**.
3. Select `Neilcyrus91/Neilcyrus91` and clone it to your computer.
4. In Finder, open the cloned repository folder.
5. Replace its project files with the contents of the extracted ZIP, preserving `admin/`, `assets/`, and `functions/` as folders. Do not put `admin/index.html` at the repository root.
6. In GitHub Desktop, review the changed files. Confirm the root `index.html` is the public landing page and `admin/index.html` is inside `admin/`.
7. Commit to `main` and click **Push origin**.
8. Cloudflare Pages should automatically deploy the new commit. Wait for Success.
9. Test the public page at `/` and admin at `/admin/`.

## Cloudflare settings to retain

- D1 binding name: `DB`
- D1 database: `neil-lead-funnel-db`
- Production secrets: `ADMIN_PASSWORD` and `SESSION_SECRET`
- Run `schema.sql` in the D1 database console if you have not already done so.

Do not put passwords, session secrets, or tokens in GitHub. The admin will not show sign-ups until the Functions are deployed and the D1 schema/binding are correctly configured.
