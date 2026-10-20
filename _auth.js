const enc = new TextEncoder();
function b64(bytes){return btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");}
async function signature(value, secret){
  const key=await crypto.subtle.importKey("raw",enc.encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
  return b64(await crypto.subtle.sign("HMAC",key,enc.encode(value)));
}
export async function makeSession(secret){
  const payload=b64(enc.encode(JSON.stringify({exp:Date.now()+8*60*60*1000,role:"admin"})));
  return payload+"."+await signature(payload,secret);
}
export async function isAdmin(request, secret){
  if(!secret) return false;
  const cookie=request.headers.get("Cookie")||"";
  const match=cookie.match(/(?:^|;\s*)lead_admin=([^;]+)/);
  if(!match) return false;
  const parts=decodeURIComponent(match[1]).split(".");
  if(parts.length!==2) return false;
  const expected=await signature(parts[0],secret);
  if(expected.length!==parts[1].length) return false;
  let diff=0; for(let i=0;i<expected.length;i++) diff|=expected.charCodeAt(i)^parts[1].charCodeAt(i);
  if(diff) return false;
  try{
    const payload=JSON.parse(atob(parts[0].replace(/-/g,"+").replace(/_/g,"/")));
    return payload.role==="admin" && payload.exp>Date.now();
  }catch{return false;}
}
