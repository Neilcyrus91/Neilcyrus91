const json = (data, status=200) => new Response(JSON.stringify(data), {
  status, headers: { "Content-Type":"application/json; charset=utf-8", "Cache-Control":"no-store" }
});
const clean = (s, max) => String(s || "").trim().replace(/\s+/g," ").slice(0,max);
export async function onRequestPost({request, env}) {
  if (!env.DB) return json({error:"Signup storage is not configured yet."}, 503);
  let body;
  try { body = await request.json(); } catch { return json({error:"Invalid request."},400); }
  // Basic bot trap; quietly accept honeypot submissions without storing them.
  if (clean(body.company,120)) return json({ok:true});
  const firstName = clean(body.first_name,80);
  const email = clean(body.email,254).toLowerCase();
  const consent = body.consent === true || body.consent === "yes";
  if (!firstName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !consent) {
    return json({error:"Please enter your first name, a valid email, and consent."},400);
  }
  try {
    await env.DB.prepare(
      "INSERT INTO leads (first_name,email,consent,source) VALUES (?1,?2,1,'free-guide') ON CONFLICT(email) DO UPDATE SET first_name=excluded.first_name, consent=1"
    ).bind(firstName,email).run();
    return json({ok:true});
  } catch (e) {
    return json({error:"We couldn't save your signup. Please try again shortly."},500);
  }
}
