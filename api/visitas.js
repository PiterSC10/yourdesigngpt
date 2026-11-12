// Aggregate-only Google Sheets counter. Historical Blob data remains untouched.
const BACKEND='https://script.google.com/macros/s/AKfycbyhGqAW8AiwHt11JBT3jmf2In5do2MRpO-H_urxftlewpJgvmWdQV3mrbQQdtOnYndNEg/exec';
const count=n=>Number.isSafeInteger(n)&&n>=0;
export function createHandler({fetcher=fetch,endpoint=BACKEND}={}){
 return async function handler(req,res){
  const send=(code,data)=>{res.status(code);res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');if(code===200&&req.method==='GET')res.setHeader('Vercel-CDN-Cache-Control','public, s-maxage=30');res.end(JSON.stringify(data));};
  const origin=req.headers?.origin;
  if(origin&&!['https://yourdesigngpt.es','https://www.yourdesigngpt.es','https://yourdesigngpt.vercel.app','https://'+req.headers?.host].includes(origin))return send(403,{error:'Origen no permitido'});
  if(!['GET','POST'].includes(req.method)){res.setHeader('Allow','GET, POST');return send(405,{error:'Método no permitido'});}
  const token=req.body?.session;
  if(req.method==='POST'&&(typeof token!=='string'||!/^[a-f0-9]{32}$/.test(token)))return send(400,{error:'Identificador inválido'});
  const url=new URL(endpoint);url.searchParams.set('public','ydg-visitas');
  if(req.method==='POST')url.searchParams.set('session',token);
  if(req.method==='GET'&&req.query?.stats==='1')url.searchParams.set('stats','1');
  try{
   const response=await fetcher(url,{redirect:'follow',signal:AbortSignal.timeout(25000)});if(!response.ok)throw Error('Backend unavailable');
   const data=await response.json();if(data.error||!count(data.total)||!count(data.hoy)||data.hoy>data.total||!/^\d{4}-\d{2}-\d{2}$/.test(data.fecha)||data.registroPausado!==false)throw Error('Invalid aggregate');
   const out={total:data.total,hoy:data.hoy,fecha:data.fecha,zona:'Europe/Madrid',criterio:'Una visita por sesión de navegador',registroPausado:false};
   if(req.method==='POST'){if(typeof data.registrada!=='boolean')throw Error('Write not acknowledged');out.registrada=data.registrada;}
   if(url.searchParams.has('stats')){if(!Array.isArray(data.historial)||!data.historial.every(r=>/^\d{4}-\d{2}-\d{2}$/.test(r.fecha)&&count(r.visitas)))throw Error('Invalid history');out.historial=data.historial.map(r=>({fecha:r.fecha,visitas:r.visitas}));}
   return send(200,out);
  }catch{return send(503,{error:'No se pudieron consultar las visitas'});}
 };
}
export default createHandler();
