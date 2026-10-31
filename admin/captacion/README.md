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


## Diseño funcional objetivo — cerebro comercial
- Dashboard: estadísticas derivadas exclusivamente de registros persistentes. Sin cifras ficticias.
- Dos ejes separados: estado comercial y presencia web, además de localidad y sector.
- Estados: investigar, pendiente propuesta, enviado (confirmado), esperando respuesta, interesado, cliente, descartado, no contactar.
- Ficha editable con fuente verificable, último contacto, notas, fecha de verificación, próximo paso y trazabilidad.
- Mapa: únicamente ubicaciones reales verificadas; colores por estado; filtrado y agrupación de puntos.
- Búsqueda: investigación y validación de presencia web, sin asumir que no hay web por ausencia de enlace en directorios.
- Propuesta: seleccionar plantilla sectorial, generar mockup como imagen con etiqueta de demo no oficial, adjuntar a borrador Gmail y revisar. No afirmar envío hasta confirmación de Gmail.
- Seguimiento: tareas e historial solo a partir de eventos reales y sin duplicados.
- Seguridad: acceso privado, RLS, almacenamiento privado para imágenes, minimización de datos, noindex y pruebas antes de integrar producción.
- Compliance: no realizar envíos comerciales no solicitados a direcciones públicas; requerir base jurídica válida y registrar supresión/no contactar.
- Las capacidades de render de imagen, envío Gmail integrado, mapa real y estadísticas avanzadas están **pendientes de implementación**; el frontend actual es parcial.
