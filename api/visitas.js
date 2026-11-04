import {get, list, put} from '@vercel/blob';
import {createHash} from 'node:crypto';

const PREFIX = 'ydg-visitas/v1/';
const dayOf = () => new Intl.DateTimeFormat('en-CA', {
  timeZone:'Europe/Madrid', year:'numeric', month:'2-digit', day:'2-digit'
}).format(new Date());
const isDuplicate = error => error?.status===409 || error?.statusCode===409 ||
  /already exists/i.test(error?.message||'');

export async function readVisits(storage={list}) {
  const blobs=[]; let cursor;
  do {
    const page=await storage.list({prefix:PREFIX,limit:1000,...(cursor?{cursor}:{})});
    blobs.push(...page.blobs);
    cursor=page.hasMore?page.cursor:undefined;
  } while (cursor);
  const today=dayOf();
  const days={};
  for (const blob of blobs) {
    const day=blob.pathname.match(/^ydg-visitas\/v1\/(\d{4}-\d{2}-\d{2})\//)?.[1];
    if (day) days[day]=(days[day]||0)+1;
  }
  return {total:blobs.length,hoy:days[today]||0,fecha:today,
    zona:'Europe/Madrid',criterio:'Una visita por sesión de navegador',
    days};
}
export default async function handler(req,res) {
  const send=(status,data)=>{
    res.status(status);
    res.setHeader('Content-Type','application/json; charset=utf-8');
    res.setHeader('Cache-Control','no-store');
    res.end(JSON.stringify(data));
  };
  if (!['GET','POST'].includes(req.method)) {
    res.setHeader('Allow','GET, POST'); return send(405,{error:'Método no permitido'});
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) return send(503,{error:'Almacenamiento pendiente de configurar'});
  const token=req.body?.session;
  if (req.method==='POST' && (typeof token!=='string'|| !/^[a-f0-9]{32}$/.test(token)))
    return send(400,{error:'Identificador inválido'});
  try {
    if (req.method==='POST') {
      const filename=createHash('sha256').update(token).digest('hex');
      const path=PREFIX+dayOf()+'/'+filename+'.json';
      try {
        await put(path,'{}',{access:'private',addRandomSuffix:false,
          allowOverwrite:false,contentType:'application/json'});
      } catch(error) {if (!isDuplicate(error)) throw error;}
    }
    const {days,...result}=await readVisits();
    if (req.method==='GET' && req.query?.stats==='1')
      return send(200,{...result,historial:Object.keys(days).sort().map(fecha=>({fecha,visitas:days[fecha]}))});
    return send(200,result);
  } catch(error) {
    console.error('YDG visit storage error:',error?.constructor?.name||'StorageError');
    return send(503,{error:'No se pudieron consultar las visitas'});
  }
}
