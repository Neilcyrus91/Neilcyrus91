import {isAdmin} from "./_auth.js";
const json=(d,s=200)=>new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"}});
export async function onRequestGet({request,env}){
 if(!await isAdmin(request,env.SESSION_SECRET)) return json({error:"Unauthorized"},401);
 if(!env.DB) return json({error:"Database is not configured"},503);
 const {results=[]}=await env.DB.prepare("SELECT id,first_name,email,consent,status,created_at,source FROM leads ORDER BY created_at DESC LIMIT 5000").all();
 return json({leads:results});
}
export async function onRequestPatch({request,env}){
 if(!await isAdmin(request,env.SESSION_SECRET)) return json({error:"Unauthorized"},401);
 if(!env.DB) return json({error:"Database is not configured"},503);
 let b;try{b=await request.json()}catch{return json({error:"Invalid request"},400)}
 const id=Number(b.id), status=String(b.status||"");
 if(!Number.isInteger(id)||id<1||!["New","Contacted","Qualified","Converted","Archived"].includes(status))return json({error:"Invalid lead or status"},400);
 await env.DB.prepare("UPDATE leads SET status=?1 WHERE id=?2").bind(status,id).run();
 return json({ok:true});
}
export async function onRequestDelete({request,env}){
 if(!await isAdmin(request,env.SESSION_SECRET)) return json({error:"Unauthorized"},401);
 if(!env.DB) return json({error:"Database is not configured"},503);
 let b;try{b=await request.json()}catch{return json({error:"Invalid request"},400)}
 const id=Number(b.id);if(!Number.isInteger(id)||id<1)return json({error:"Invalid id"},400);
 await env.DB.prepare("DELETE FROM leads WHERE id=?1").bind(id).run();
 return json({ok:true});
}
