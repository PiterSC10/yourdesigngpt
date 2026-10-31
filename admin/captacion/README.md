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
Importación Excel: columnas name, city, sector, status, email, phone, website, source_url, contacted_at, next_followup, notes, web_status, email_status, activity_status, contact_permission, last_verified_at. Fechas YYYY-MM-DD. Deduplicación básica por name+city. Hasta 1000 filas/importación.
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

## Campaña territorial acordada (31 octubre 2026)
- Objetivo: identificar 500 negocios REALES sin web propia localizada, no 500 búsquedas brutas; ninguna cifra se presenta como hallazgo hasta su verificación.
- Cobertura: Marbella, Benalmádena, Torremolinos, Fuengirola, Mijas (incluida La Cala de Mijas), Estepona, Rincón de la Victoria, Alhaurín de la Torre, Alhaurín el Grande y Vélez-Málaga. Málaga capital excluida.
- Zona de búsqueda específica: La Cala de Mijas; evitar duplicación en Mijas. Rincón de la Victoria incluye La Cala del Moral; verificar confusiones entre nombres de zonas.
- Filtro de inclusión: actividad vigente, presencia web revisada, sin web propia localizada, fuentes públicas, fecha y referencia, deduplicación; direcciones y correos solo si verificados.
- Indicadores: localizados, verificados, elegibles sin web localizada, propuestas redactadas, envíos confirmados, respuestas recibidas, interesados, clientes; ceros reales hasta tener datos.
- Workflow: empresa seleccionada -> generar mockup PNG/JPG claramente etiquetado DEMO NO OFICIAL -> revisión mensaje y adjunto -> comprobación de autorización/contacto permitido -> confirmación explícita del usuario -> envío por Gmail -> confirmación proveedor -> historial y seguimiento.
- Indicador visual de respuesta nueva: icono bombilla + contador de respuestas sin leer, vínculo a ficha y conversación Gmail; marcar leída y estado de respuesta tras verificación, sin clasificar automáticamente como interesado sin evidencia.
- Gmail debe recibir eventos o consultar threads por ID en forma autenticada. Envío con acuse de API no equivale a entrega ni lectura. No enviar campañas comerciales no solicitadas a direcciones públicas.
- Estado técnico actual: mapa real, mockups imagen, envío Gmail, escucha de respuestas y búsqueda/autoimportación masiva pendientes. No marcar como completado hasta pruebas y credenciales.

## Auditoría de datos — 31/10/2026
- Excel unificado de trabajo guardado fuera del repositorio público (contiene emails profesionales): 176 negocios únicos; 99 con email publicado; 77 sin email localizado; 1 duplicado de «Aphrodite» descartado.
- El anterior titular de 100 emails era provisional; al deduplicar resultan 99. No presentarlos como 100 válidos.
- Ninguno de los 99 emails está confirmado como entregable; ninguna ausencia de web está confirmada independientemente y ningún contacto tiene autorización acreditada para publicidad.
- La columna web_status «Sin web localizada» se debe usar solo tras búsqueda independiente; un directorio sin URL no basta.
- La columna contact_permission debe ser «Autorizado» únicamente cuando exista una base válida para el contacto; la interfaz bloquea la apertura del email comercial y el marcado como enviado mientras no conste.
- Importar primero en un proyecto Supabase privado de pruebas; revisar el resultado de CRUD, filtros, búsqueda y exportación antes de producción.
- La rama feature/ydg-leads-crm permanece separada de main hasta que estén creados Supabase, usuario privado y RLS comprobadas. El preview Vercel no sustituye esas comprobaciones.
