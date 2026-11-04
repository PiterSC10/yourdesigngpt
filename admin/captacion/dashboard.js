document.addEventListener('DOMContentLoaded',()=>{
const $=id=>document.getElementById(id);
const drawer=$('leadDrawer'),info=$('infoPanel'),email=$('emailPanel');let lead=null;
function escapeText(v){return String(v||'')}
function tab(mode){const isMail=mode==='mail';email.classList.toggle('hidden',!isMail);info.classList.toggle('hidden',isMail);$('drawerEmail').classList.toggle('selected',isMail);$('drawerInfo').classList.toggle('selected',!isMail)}
function showLead(r){lead=r;drawer.dataset.leadId=r.id;$('drawerName').textContent=r.name;const p=$('drawerSummary');p.replaceChildren();const summary=document.createElement('p');summary.className='muted';summary.textContent=[r.city,r.sector,r.status].filter(Boolean).join(' · ');p.append(summary);if(r.website){const link=document.createElement('a');link.textContent='Visitar web actual';link.href=r.website;link.target='_blank';link.rel='noopener noreferrer';p.append(link)}
$('draftTo').value=r.email||'';$('draftSubject').value='Una propuesta para '+r.name;
$('draftBody').value='Hola,\n\nSomos YourDesignGPT, un servicio de diseño web para pequeños negocios de la Costa del Sol.\n\nNos gustaría saber si os interesaría conocer una propuesta para mejorar vuestra presencia online con una página web clara y adaptada a móviles.\n\nSi os interesa recibir más información, estaremos encantados de hablar.\n\nUn saludo,\nYourDesignGPT';
const st=$('trackingStatus');if(st){st.value=r.status||'Pendiente';$('trackingDate').value=r.next_followup||'';const hist=$('trackingHistory');hist.replaceChildren();String(r.notes||'').split(String.fromCharCode(10)).filter(Boolean).slice(-30).reverse().forEach(line=>{const li=document.createElement('li');li.textContent=line;hist.append(li)})}drawer.classList.remove('hidden');tab('info')}
function bindRows(){
 const api=window.YDG_LEADS_API;if(!api)return;
 const lookup=new Map(api.records().map(r=>[String(r.id),r]));
 $('rows').querySelectorAll('tr').forEach(tr=>{
   const r=lookup.get(String(tr.dataset.leadId||''));
   if(!r)return;
   tr.onclick=e=>{if(e.target.closest('button,select,a,input'))return;showLead(r)};
   const cell=tr.children[3];
   if(cell){const colors={'Pendiente':'#78869e','Preparada':'#f3bf47','Lista para enviar':'#f3bf47','Enviado':'#61a6ff','Seguimiento':'#c18aff','Cliente':'#5cdfa1','No interesado':'#ff8585'};
     cell.style.color=colors[r.status]||'#d9dfe9'}
 });
 $('emptyNote').classList.toggle('hidden',api.records().length>0)
}
window.YDG_LEADS_OPEN=showLead;
window.addEventListener('ydg-leads-refreshed',bindRows);
['q','statusFilter','cityFilter','sectorFilter','webFilter','emailFilter'].forEach(id=>$(id).addEventListener(id==='q'?'input':'change',()=>setTimeout(bindRows,0)));
$('drawerClose').onclick=()=>drawer.classList.add('hidden');$('drawerInfo').onclick=()=>tab('info');$('drawerEmail').onclick=()=>tab('mail');
$('editCurrent').onclick=()=>{if(lead&&window.YDG_LEADS_API){window.YDG_LEADS_API.edit(lead);drawer.classList.add('hidden')}};
$('openMail').onclick=()=>{if(!lead)return;const to=$('draftTo').value.trim();if(!to){alert('Falta el correo profesional.');return}if(lead.contact_permission!=='Autorizado'||lead.status==='No contactar'){alert('No consta autorización o base válida para el contacto comercial. Registra el permiso antes de abrir el email.');return}const url='mailto:'+encodeURIComponent(to)+'?subject='+encodeURIComponent($('draftSubject').value)+'&body='+encodeURIComponent($('draftBody').value);window.location.href=url};
$('markSent').onclick=async()=>{if(!lead)return;if(lead.contact_permission!=='Autorizado'){alert('No consta base válida para el contacto comercial.');return}const api=window.YDG_LEADS_API;if(!api)return;try{const ok=await api.markSent(lead.id);if(ok)drawer.classList.add('hidden')}catch(err){alert(err.message)}};
$('saveTracking').onclick=async()=>{if(!lead)return;const api=window.YDG_LEADS_API;if(!api)return;try{await api.updateCommercial(lead.id,$('trackingStatus').value,$('trackingNote').value.trim(),$('trackingDate').value);$('trackingNote').value='';lead=api.records().find(x=>String(x.id)===String(lead.id));showLead(lead)}catch(err){alert('No se pudo guardar: '+err.message)}};
document.querySelectorAll('[data-quick]').forEach(b=>b.onclick=()=>{$('statusFilter').value=b.dataset.quick;$('statusFilter').dispatchEvent(new Event('change'));$('rows').scrollIntoView({behavior:'smooth'})});
document.querySelectorAll('[data-view]').forEach(a=>a.onclick=e=>{e.preventDefault();document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',a===b));const v=a.dataset.view;$('emailFilter').value=v==='emails'?'Con email':'Todos';if(v==='emails')$('statusFilter').value='Todos';else if(v==='seguimientos')$('statusFilter').value='Esperando respuesta';else if(v==='clientes')$('statusFilter').value='Cliente';else $('statusFilter').value='Todos';$('statusFilter').dispatchEvent(new Event('change'));$('app').scrollIntoView({behavior:'smooth'})});
});