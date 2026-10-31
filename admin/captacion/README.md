# YourDesignGPT Leads — instalación
Este CRM funciona en /admin/captacion/ y no cambia la portada pública.
## Para activar el backend privado
1. Crea un proyecto Supabase en su plan gratuito (sujeto a límites).
2. Ejecuta el contenido de schema.sql en SQL Editor.
3. En Authentication > Providers/Settings deshabilita los registros públicos y crea/invita SOLO tu usuario autorizado desde el panel de Supabase.
4. Sustituye en config.js las cadenas vacías por Project URL y la **clave pública anon/publishable**. NUNCA uses la clave service_role/secret en el navegador.
5. Publica GitHub en Vercel y entra en /admin/captacion/; verifica login, CRUD, importación y exportación.
6. Evita compartir expedientes o Excel con datos de contacto; exporta copias solo a ubicaciones seguras.
La autorización se aplica en la base mediante RLS por owner_id; el ocultamiento de enlaces NO constituye protección.
Importación Excel: columnas name, city, sector, status, email, phone, website, source_url, contacted_at, next_followup, notes. Fechas YYYY-MM-DD. Deduplicación básica por name+city. Hasta 1000 filas/importación.
La app NO envía comunicaciones ni automatiza captación. Cumple con LSSI/RGPD antes de contactar.
