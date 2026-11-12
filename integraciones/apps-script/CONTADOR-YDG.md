# YourDesignGPT · contador reanudado

Migración del 12/11/2026. El histórico original verificable de Vercel Blob contiene 182 visitas: 04/11: 9; 05/11: 96; 06/11: 35; 07/11: 42. Se conserva el almacén anterior intacto.

El módulo `contador-ydg.gs` está publicado en la versión 50 del motor Apps Script existente. Usa un libro privado independiente llamado YOURDESIGNGPT_CONTADOR_VISITAS, con HISTORICO, REGISTROS y MIGRACION. El ID está guardado únicamente en la propiedad de servidor YDG_VISITS_SHEET_ID. No borrar ni reinicializar esa propiedad. La inicialización manual `ydgVisitsPrepare` conserva el libro existente si ya está configurado.

En Código.gs se añadió una sola ruta a doGet:

```js
if(p.public==='ydg-visitas')return ydgVisitsPublic_(p);
```

Las rutas de DEA, sus registros y autorizaciones no se modifican. Los datos de YourDesignGPT no se escriben en el libro de DEA. La API pública devuelve exclusivamente totales y fechas, nunca IDs de sesión, credenciales ni identificadores del libro.

La API /api/visitas de YourDesignGPT consulta esta ruta; POST registra una sesión válida y GET solo lee. El motor usa bloqueo de script, identificadores SHA-256 y deduplicación por día de Europe/Madrid e ID de sesión. Se conserva el token de sesión de navegador y el aspecto original del cliente ydg-header-v3.js, sin cambios de CSS ni HTML.

Ocho comprobaciones aisladas verifican conservación del total y de los días originales, altas, duplicados, cambio de día, fechas nativas de Sheets y validación del proxy. No se generan visitas sintéticas en producción. Las visitas que no llegaron a registrarse durante la suspensión no pueden reconstruirse con certeza.
