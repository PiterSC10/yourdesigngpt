document.addEventListener('DOMContentLoaded',()=>{
 const api=()=>window.YDG_LEADS_API, prefix='[YDG-EMAIL] ';
 function db(){const x=api();if(!x?.user())throw Error('Inicia sesión en el CRM');return x.client()}
 async function get(lead){
 const {data,error}=await db().from('crm_proposals').select('id,title,body,status').eq('lead_id',lead.id).like('title',prefix+'%').limit(1);
 if(error)throw Error('No se pudo consultar el borrador: '+error.message);
 const x=data?.[0];if(!x)return null;let content;try{content=JSON.parse(x.body)}catch{content={body:x.body||''}}
 return {id:x.id,subject:content.subject||x.title.slice(prefix.length),body:content.body||'',stage:x.status==='Revisada'?'Preparado':'Borrador'};
 }
 async function save(lead,subject,body,ready){
 if(!lead?.email)throw Error('Registra primero el email del negocio');
 if(!subject.trim()||!body.trim())throw Error('Completa el asunto y el mensaje');
 if(['No contactar','Descartado'].includes(lead.status))throw Error('Este contacto no está disponible para preparaciones comerciales');
 const old=await get(lead);
 const payload={lead_id:lead.id,title:prefix+subject.trim(),sector:lead.sector||'',body:JSON.stringify({subject:subject.trim(),body:body.trim()}),status:ready?'Revisada':'Borrador'};
 const q=old?db().from('crm_proposals').update(payload).eq('id',old.id):db().from('crm_proposals').insert(payload);
 const {data,error}=await q.select('id,status').single();
 if(error||!data)throw Error('No se guardó el borrador en Supabase: '+(error?.message||'Sin confirmación'));
 if(ready)await api().updateCommercial(lead.id,'Pendiente de enviar','Email y propuesta preparados; envío manual pendiente',lead.next_followup);
 else await api().refresh();
 return {stage:ready?'Preparado':'Borrador'};
 }
 window.YDG_EMAIL_PREP={get,save};
});