document.addEventListener('DOMContentLoaded',()=>{
 const year=document.getElementById('year'); if(year)year.textContent=new Date().getFullYear();
 const form=document.getElementById('lead-form'); if(!form)return;
 const button=form.querySelector('button[type="submit"]');
 const message=document.getElementById('message');
 form.addEventListener('submit',async e=>{
   e.preventDefault();
   if(!form.reportValidity())return;
   const data=new FormData(form);
   const payload={first_name:data.get('first_name'),email:data.get('email'),consent:data.get('consent')==='yes',company:data.get('company')||''};
   if(button){button.disabled=true;button.textContent='SAVING YOUR SIGNUP…';}
   if(message)message.textContent='';
   try{
     const response=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
     let result={};try{result=await response.json()}catch{}
     if(!response.ok||!result.ok)throw new Error(result.error||'We could not save your signup. Please try again.');
     window.location.href='/thank-you.html';
   }catch(err){
     if(message)message.textContent=err.message||'Something went wrong. Please try again.';
     if(button){button.disabled=false;button.innerHTML='GET INSTANT PDF ACCESS <span>↓</span>';}
   }
 });
});