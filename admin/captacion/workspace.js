document.addEventListener('DOMContentLoaded',()=>{
'use strict';
const $=id=>document.getElementById(id),api=()=>window.YDG_LEADS_API;
const current=()=>api()?.records().find(r=>r.id===$('leadDrawer').dataset.leadId);
function el(tag,text,cls){const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n}
const notice=el('p','', 'muted');notice.setAttribute('aria-live','polite');$('infoPanel').append(notice);
const download=el('button','Descargar mockup PNG');download.type='button';$('makeDemo').after(download);
download.onclick=()=>{const r=current();if(!r)return;const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=760;const ctx=canvas.getContext('2d');
const kind=$('demoKind').value,colors={beauty:['#55264d','#d27d9f'],food:['#55271c','#c07840'],retail:['#153d47','#399e8d'],trades:['#112a55','#14769b'],auto:['#211748','#6556d9']};
const pair=colors[kind]||colors.auto,g=ctx.createLinearGradient(0,0,1200,760);g.addColorStop(0,pair[0]);g.addColorStop(1,pair[1]);ctx.fillStyle=g;ctx.fillRect(0,0,1200,760);
ctx.fillStyle='#ffffff';ctx.font='bold 18px system-ui';ctx.fillText('DEMO NO OFICIAL · YOURDESIGNGPT',55,55);ctx.font='bold 48px system-ui';
function wrap(text,y,font){ctx.font=font;let line='';for(const word of text.split(' ')){const next=(line+' '+word).trim();if(ctx.measureText(next).width>1050&&line){ctx.fillText(line,55,y);line=word;y+=60}else line=next}ctx.fillText(line,55,y);return y+60}
let y=wrap(r.name,230,'bold 54px system-ui');y=wrap(r.sector||'Tu negocio, también online',y+20,'32px system-ui');ctx.font='24px system-ui';ctx.fillText(r.city,55,y+15);
ctx.fillStyle='#ffffff';ctx.fillRect(55,520,320,65);ctx.fillStyle=pair[0];ctx.font='bold 24px system-ui';ctx.fillText('Consultar servicios',80,562);
ctx.fillStyle='#ffffff';ctx.font='19px system-ui';ctx.fillText('Propuesta orientativa. No representa la web oficial del negocio.',55,710);
canvas.toBlob(blob=>{if(!blob)return;const a=document.createElement('a'),url=URL.createObjectURL(blob);a.href=url;a.download='demo-'+r.name.replace(/[^a-zA-Z0-9]/g,'-')+'.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)},'image/png')};
const note=el('textarea');note.placeholder='Nueva nota interna';note.maxLength=5000;note.rows=3;
const save=el('button','Guardar nota'),history=el('div');save.type='button';$('infoPanel').append(el('h3','Notas e historial'),note,save,history);
const follow=el('input');follow.type='datetime-local';follow.setAttribute('aria-label','Fecha y hora de seguimiento');
const task=el('input');task.placeholder='Próximo paso comercial';task.maxLength=300;
const add=el('button','Programar seguimiento');add.type='button';$('infoPanel').append(el('h3','Próximo seguimiento'),task,follow,add);
async function details(){const r=current();if(!r||!api()?.user())return;history.replaceChildren();notice.textContent='Cargando historial…';
try{const db=api().client();const results=await Promise.all([db.from('crm_notes').select('body,created_at').eq('lead_id',r.id).order('created_at',{ascending:false}).limit(30),db.from('crm_history').select('action,occurred_at').eq('lead_id',r.id).order('occurred_at',{ascending:false}).limit(30),db.from('crm_followups').select('id,title,due_at,completed_at').eq('lead_id',r.id).order('due_at').limit(30)]);
if(results.some(x=>x.error))throw results.find(x=>x.error).error;
if(current()?.id!==r.id)return;
results[0].data.forEach(n=>history.append(el('p',new Date(n.created_at).toLocaleString('es-ES')+' · '+n.body)));
results[1].data.forEach(n=>history.append(el('p',new Date(n.occurred_at).toLocaleString('es-ES')+' · '+({insert:'Empresa creada',update:'Empresa actualizada',delete:'Empresa eliminada'}[n.action]||n.action),'muted')));
results[2].data.forEach(n=>{const row=el('div',null,'row');row.append(el('p',new Date(n.due_at).toLocaleString('es-ES')+' · '+n.title));if(!n.completed_at){const b=el('button','Completar');b.type='button';b.onclick=async()=>{b.disabled=true;const res=await db.from('crm_followups').update({completed_at:new Date().toISOString()}).eq('id',n.id);if(res.error){notice.textContent=res.error.message;b.disabled=false}else{await details();await badges()}};row.append(b)}else row.append(el('small','Completado'));history.append(row)});notice.textContent=history.children.length?'':'Sin historial adicional.'}catch(e){notice.textContent='No se pudo leer el historial: '+e.message}}
save.onclick=async()=>{const r=current();if(!r||!note.value.trim())return;save.disabled=true;try{const res=await api().client().from('crm_notes').insert({lead_id:r.id,body:note.value.trim()});if(res.error)throw res.error;note.value='';await details()}catch(e){notice.textContent=e.message}finally{save.disabled=false}};
add.onclick=async()=>{const r=current();if(!r||!task.value.trim()||!follow.value){notice.textContent='Indica el próximo paso y su fecha.';return}add.disabled=true;try{const res=await api().client().from('crm_followups').insert({lead_id:r.id,title:task.value.trim(),due_at:new Date(follow.value).toISOString()});if(res.error)throw res.error;task.value='';follow.value='';await details();await badges()}catch(e){notice.textContent=e.message}finally{add.disabled=false}};
const badge=el('p','','hint');$('quickActions').before(badge);
async function badges(){if(!api()?.user()){badge.textContent='';return}const db=api().client(),r=await db.from('crm_communications').select('id',{count:'exact',head:true}).eq('direction','inbound').is('read_at',null);
const f=await db.from('crm_followups').select('id',{count:'exact',head:true}).is('completed_at',null).lte('due_at',new Date().toISOString());
badge.textContent=r.error||f.error?'No se pudieron consultar los avisos.':'💡 '+r.count+' respuestas registradas sin leer · '+f.count+' seguimientos vencidos';}
new MutationObserver(changes=>{if(changes.some(c=>c.attributeName==='data-lead-id')){note.value='';details()}}).observe($('leadDrawer'),{attributes:true,attributeFilter:['data-lead-id']});
window.addEventListener('ydg-leads-refreshed',badges);
$('openMail').textContent='Abrir en aplicación de correo';
$('emailPanel').append(el('p','Gmail aún no está vinculado al CRM. Los textos se preparan aquí y se abren en tu aplicación de correo; las respuestas no se sincronizan automáticamente.','muted'));
});
