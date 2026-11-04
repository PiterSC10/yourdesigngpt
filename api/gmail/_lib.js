const crypto=require('node:crypto');
const ORIGIN='https://leads-yourdesigngpt.vercel.app';
const CALLBACK=ORIGIN+'/api/gmail/callback';
const COOKIE='ydg_gmail_session',STATE='ydg_gmail_state';
const KEY=crypto.createHash('sha256').update(process.env.GMAIL_TOKEN_ENCRYPTION_KEY||'').digest();
function ready(){return !!(process.env.GOOGLE_CLIENT_ID&&process.env.GOOGLE_CLIENT_SECRET&&process.env.GMAIL_TOKEN_ENCRYPTION_KEY&&process.env.GMAIL_TOKEN_ENCRYPTION_KEY.length>=32)}
function seal(obj){const iv=crypto.randomBytes(12);const cipher=crypto.createCipheriv('aes-256-gcm',KEY,iv);const body=Buffer.concat([cipher.update(JSON.stringify(obj)),cipher.final()]);return Buffer.concat([iv,cipher.getAuthTag(),body]).toString('base64url')}
function unseal(s){const b=Buffer.from(s,'base64url'),iv=b.subarray(0,12),tag=b.subarray(12,28);const dec=crypto.createDecipheriv('aes-256-gcm',KEY,iv);dec.setAuthTag(tag);return JSON.parse(Buffer.concat([dec.update(b.subarray(28)),dec.final()]).toString())}
function cookies(req){return Object.fromEntries((req.headers.cookie||'').split(';').map(x=>x.trim().split(/=(.*)/s).slice(0,2)).filter(x=>x.length===2))}
function setCookie(res,name,value,maxAge){res.setHeader('Set-Cookie',[...(res.getHeader('Set-Cookie')||[]),name+'='+value+'; Path=/api/gmail; HttpOnly; Secure; SameSite=Lax; Max-Age='+maxAge])}
function json(res,status,data){res.status(status).setHeader('Cache-Control','no-store').json(data)}
async function auth(req){const jwt=(req.headers.authorization||'').replace(/^Bearer /,'');if(!jwt)return null;const response=await fetch('https://gryelmlodljyvfjwaplp.supabase.co/auth/v1/user',{headers:{apikey:'sb_publishable_NbsNpXrR1psTGGDZWXfeKw_yQyhyp4U',Authorization:'Bearer '+jwt}});if(!response.ok)return null;const u=await response.json();return u.email?.toLowerCase()==='iampetersc@gmail.com'&&u.email_confirmed_at?u:null}
async function tokenRequest(params){const response=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:process.env.GOOGLE_CLIENT_ID,client_secret:process.env.GOOGLE_CLIENT_SECRET,...params})});const data=await response.json();if(!response.ok)throw Error(data.error||'OAuth token error');return data}
module.exports={ORIGIN,CALLBACK,COOKIE,STATE,ready,seal,unseal,cookies,setCookie,json,auth,tokenRequest};
