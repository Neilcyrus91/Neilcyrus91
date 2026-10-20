import {makeSession} from "./_auth.js";
const json=(d,s=200)=>new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json","Cache-Control":"no-store"}});
export async function onRequestPost({request,env}){
  if(!env.ADMIN_PASSWORD||!env.SESSION_SECRET) return json({error:"Admin secrets are not configured."},503);
  let b; try{b=await request.json()}catch{return json({error:"Invalid request."},400)}
  const supplied=String(b.password||"");
  // Compare hashes to avoid direct variable-time password comparison.
  const digest=async s=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s)))).map(x=>x.toString(16).padStart(2,"0")).join("");
  if((await digest(supplied))!==(await digest(env.ADMIN_PASSWORD))) return json({error:"Incorrect password."},401);
  const token=await makeSession(env.SESSION_SECRET);
  return new Response(JSON.stringify({ok:true}),{headers:{
    "Content-Type":"application/json","Cache-Control":"no-store",
    "Set-Cookie":`lead_admin=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`
  }});
}
