import { createHash } from 'node:crypto';

const SITE = 'https://yourdesigngpt.es';
const RECIPIENT = 'iampetersc@gmail.com';
const FIELD_LIMITS = {
  Nombre: 120,
  Email: 254,
  'Teléfono': 40,
  Idea: 3000,
  'Tipo de web': 120,
  Funciones: 800,
  Idioma: 120,
  Estilo: 120,
  'Promoción': 60,
  Precio: 60
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method' });
  }
  if (req.headers.origin !== SITE || !req.headers['content-type']?.startsWith('application/json')) {
    return res.status(403).json({ error: 'origin' });
  }

  const { RESEND_API_KEY, YDG_BUDGET_FROM } = process.env;
  if (!RESEND_API_KEY || !YDG_BUDGET_FROM) {
    return res.status(503).json({ error: 'mail_not_configured' });
  }

  const fields = {};
  for (const [name, limit] of Object.entries(FIELD_LIMITS)) {
    const value = req.body?.[name];
    if (value === undefined) continue;
    if (typeof value !== 'string' || value.length > limit) {
      return res.status(400).json({ error: 'invalid_fields' });
    }
    fields[name] = value.trim();
  }
  if (!fields.Nombre || !/^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(fields.Email || '')) {
    return res.status(400).json({ error: 'invalid_contact' });
  }

  const text = ['Solicitud recibida desde ' + SITE, '',
    ...Object.entries(fields).filter(([, value]) => value).map(([name, value]) => name + ': ' + value)
  ].join('\n');
  const key = createHash('sha256').update(text).digest('hex');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + RESEND_API_KEY,
        'Content-Type': 'application/json',
        'Idempotency-Key': 'ydg-presupuesto/' + key
      },
      body: JSON.stringify({
        from: YDG_BUDGET_FROM,
        to: [RECIPIENT],
        reply_to: fields.Email,
        subject: 'Nuevo presupuesto · YourDesignGPT',
        text
      }),
      signal: AbortSignal.timeout(6500)
    });
    const result = await response.json();
    if (response.ok && typeof result?.id === 'string') {
      return res.status(200).json({ success: true });
    }
    console.error('Budget email rejected', response.status);
  } catch (error) {
    console.error('Budget email request failed', error.name);
  }
  return res.status(502).json({ error: 'mail_delivery_unconfirmed' });
}
