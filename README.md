# Neil | Lead Funnel Builder — lead database + admin dashboard

## Included
- Responsive landing page and provided visual assets
- Free PDF copied to `/lead-funnel-starter-guide.pdf`
- `/api/leads` signup endpoint that validates and stores leads in Cloudflare D1
- `/admin/` password login and dashboard to search/filter/update/delete leads
- CSV export from the dashboard
- D1 schema in `schema.sql`

## Required Cloudflare setup before it can collect leads
1. Create a Cloudflare Pages project connected to this Git repository.
2. Create a Cloudflare D1 database (e.g. `neil-lead-funnel-db`).
3. Open the D1 console and execute the complete contents of `schema.sql`.
4. In Pages → Settings → Functions → D1 database bindings, bind the database as `DB`.
5. In Pages → Settings → Variables and Secrets, create these **secrets** for Production (and Preview if you use it):
   - `ADMIN_PASSWORD`: a strong unique password for `/admin/`
   - `SESSION_SECRET`: a long random secret (at least 32 random characters)
6. Redeploy after adding the binding and secrets.

## Use
- Public landing page: `/`
- Admin dashboard: `/admin/`
- Guide download page after signup: `/thank-you.html`
- PDF direct path: `/lead-funnel-starter-guide.pdf`

## Test before launch
- Submit a test name/email and confirm it goes to thank-you only after successful DB write.
- Open `/admin/`, sign in, confirm the test signup is visible.
- Change status, refresh, and export CSV.
- Delete the test lead after verifying.
- If you see “Signup storage is not configured yet”, the `DB` binding is missing in the active environment.
- If admin login says secrets are not configured, check `ADMIN_PASSWORD` and `SESSION_SECRET`.

## Privacy/security
The form stores the data visitors submit and their consent to contact about the guide/relevant services. Update `privacy.html` to include your real business contact method and accurately describe your deployed data handling before publishing. Keep admin secrets private and CSV exports secure. This implementation uses a signed HttpOnly session cookie for admin authentication. Consider adding rate limiting/WAF rules for production.
