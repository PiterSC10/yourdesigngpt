/* Local conversation rules and authored knowledge. No network or persistent storage. */
(function(global){
'use strict';
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9€+\s]/g,' ').replace(/\s+/g,' ').trim();
const has=(s,k)=>(' '+s+' ').includes(' '+norm(k)+' ');
const topics={
price:['precio','precios','cuanto cuesta','cuanto vale','cuanto sale','cuanto cobrais','presupuesto','economico','economica','barato','barata','caro','cara','pasta','dinero','99','100','cuesta','coste','costos','no quiero gastarme mucho','voy justo','poco presupuesto'],
time:['72h','72 h','72 horas','plazo','plazos','cuanto tarda','cuanto tardais','rapido','rapida','urgente','para manana','fecha','entrega','tiempo'],
included:['que incluye','que entra','incluido','incluye','pack','landing','basica','sencilla'],
hosting:['dominio','hosting','servidor','ssl','https','direccion web'],
maintenance:['mantenimiento','cambios','cambiar textos','actualizar','ajustes','soporte'],
renew:['renovacion','renovar','cancelar','permanencia','darme de baja','suscripcion','ano siguiente'],
payment:['pagar','pago','pagos','stripe','tarjeta','fraccionado','dos fases'],
seo:['seo','google','posicionar','posicionamiento','buscadores','indexar','primero en google','primera posicion'],
extras:['tienda online','carrito','vender online','pasarela','area privada','automatizacion','chatbot','base de datos','reservas online','sistema de reservas','calendario de citas','motor de reservas'],
projects:['portfolio','ejemplos','proyectos','trabajos','demos','ver webs'],
process:['como funciona','proceso','pasos','como empezamos','que necesitas','que necesitais'],
materials:['textos','fotos','imagenes','logo','contenido','materiales','no tengo nada'],
responsive:['movil','iphone','android','tablet','ordenador','responsive'],
ownership:['llevarme la web','archivos','propiedad','sera mia','es mia','otro hosting','migrar'],
languages:['idioma','idiomas','ingles','frances','italiano','aleman','traducir'],
contact:['hablar con pedro','hablar con alguien','persona real','contactar','correo','email','telefono','contacto'],
identity:['quien eres','eres una persona','eres real','eres una ia','eres un robot','que eres'],
store:['camiseta','merch','merchandising','ydg store','ropa'],
start:['quiero una web','quiero mi web','me interesa','contratar','empezar','comenzar','solicitar','configurar']};
const knowledge={
price:['La landing de lanzamiento parte de <strong>99 € de creación + 100 €/año</strong>. La parte anual cubre dominio, hosting, mantenimiento y hasta 3 ajustes menores. Las funciones avanzadas se presupuestan aparte.','Para una web de presentación, la promoción es <strong>99 € de desarrollo y 100 €/año</strong> de servicio. La referencia inicial suma 199 € entre creación y primer año; el presupuesto final depende del alcance.'],
time:['El objetivo para una landing sencilla es de unas <strong>72 horas desde que recibimos el contenido necesario</strong>. Hay que confirmar disponibilidad y alcance; no es una entrega garantizada para cualquier proyecto.','Si tenemos textos, imágenes e información listos, la referencia es <strong>unas 72 horas para una landing estándar</strong>. Si faltan materiales o necesitas funciones especiales, Pedro debe revisar el calendario.'],
included:['El pack base es una <strong>landing de presentación</strong>: información, servicios, imágenes, contacto, redes, adaptación a móvil y base SEO inicial. Puede llevar formulario sencillo o acceso a WhatsApp. Reservas complejas, tienda y automatizaciones se valoran aparte.','La idea es reunir lo esencial en una página: qué haces, qué ofreces, imágenes y una forma clara de contactar. El diseño se adapta a móvil, tablet y PC. Las funciones avanzadas requieren presupuesto propio.'],
hosting:['El <strong>dominio</strong> es la dirección y el <strong>hosting</strong> donde se aloja la web. La promoción los reúne con mantenimiento y SSL cuando corresponda por 100 €/año. Si ya tienes dominio, indícalo para revisar su gestión antes de contratar.','Si ya tienes una dirección web, no hace falta decidir otra a ciegas: Pedro revisará cómo conectarla. Si no, el pack anual contempla la gestión del dominio y el alojamiento; la disponibilidad del nombre se comprueba después.'],
maintenance:['Los 100 €/año incluyen hasta <strong>3 ajustes menores</strong>, como textos, horarios, precios, teléfono o imágenes. Nuevas páginas, rediseños e integraciones se presupuestan aparte.','Hay mantenimiento técnico y hasta 3 pequeños cambios al año en la promoción. Si el cambio altera la estructura o añade funciones, se revisa como ampliación.'],
renew:['Puedes cancelar la renovación anual sin permanencia antes del siguiente cobro. El servicio sigue activo durante el periodo abonado. Si quieres mantener la web después fuera de YourDesignGPT, hay que planificar su traslado antes de que termine ese periodo.'],
payment:['La web explica un pago seguro mediante <strong>Stripe en dos fases</strong>: al iniciar el proyecto y al finalizar, antes de publicar. Los importes concretos y condiciones se confirman con Pedro; este chat no cobra ni contrata nada.'],
seo:['Se incluye una <strong>base SEO inicial</strong> para ayudar a los buscadores a entender la web. Publicarla no significa aparecer inmediatamente ni salir primero. Contenido, competencia y autoridad influyen; no puedo prometer una posición ni una fecha.'],
extras:['Podemos estudiar esa funcionalidad, pero no está incluida automáticamente en los 99 €. Una tienda, pagos, área privada o reservas con calendario necesitan valorar integración, alcance y costes de terceros. Seleccionarla en el configurador sirve para explicar tu necesidad.'],
projects:['En <strong>Proyectos</strong> puedes explorar los ejemplos de diseño y los estilos disponibles. Las demostraciones ficticias sirven como referencia visual; no son testimonios ni resultados acreditados de clientes.'],
process:['Lo organizamos en cuatro partes: <strong>definir el proyecto, diseñar, revisar y publicar</strong>. El configurador recoge tipo de web, funciones, estilo y contacto; después Pedro revisa el alcance contigo. Enviar la solicitud no confirma una contratación.'],
materials:['Para avanzar vienen bien nombre o marca, servicios, textos, fotos con permiso de uso y datos que quieras publicar. Si no tienes logo o contenido, cuéntalo en la solicitud: hay que valorar esa preparación, no darla por incluida.'],
responsive:['La web se prepara para móvil, tablet y ordenador. Buscamos que se pueda leer, navegar y contactar con facilidad en cada tamaño de pantalla.'],
ownership:['Según las condiciones publicadas, una vez abonado el desarrollo y completado el primer periodo anual puedes pedir una copia de los archivos. La entrega de archivos no tiene coste; una migración técnica realizada por Pedro se presupuesta aparte.'],
languages:['El configurador incluye <strong>español como idioma base</strong> y permite seleccionar como máximo un idioma adicional. Traducción, contenido y cualquier ampliación deben concretarse en el presupuesto.'],
contact:['Puedes escribir directamente a <strong>iampetersc@gmail.com</strong> o usar los enlaces de contacto de Pedro. Yo no envío este chat ni aviso a nadie; para recibir respuesta personal debes enviar la solicitud o contactar por esos canales.'],
identity:['Soy <strong>YDG Assistant, un asistente automático con respuestas guardadas</strong>. Uso lo que me cuentas durante esta conversación para orientarte. No soy Pedro, no consulto Internet y no envío tus mensajes a una IA externa.'],
store:['YDG Store muestra una edición conceptual de merchandising. El DROP 01 figura <strong>archivado y agotado</strong>; no puedo reservar unidades ni confirmar nuevas existencias.'],
start:['Puedes preparar tu solicitud en el configurador: tipo de web, funciones y datos de contacto. Pedro revisará el proyecto antes de confirmar presupuesto y calendario.']};
const sectors=[['peluquería',['peluqueria','barberia','salon de belleza']],['restaurante',['restaurante','bar','cafeteria','pizzeria']],['alojamiento',['hotel','apartamento','alojamiento','casa rural']],['estética',['estetica','unas','masajes']],['servicios profesionales',['electricista','fontanero','abogado','clinica','autonomo']],['marca personal',['web personal','marca personal','portfolio personal','curriculum','fotografo','artista']]];
function create(){
 const state={sector:'',need:'',pending:'',lastIntent:'',lastText:'',turns:0,counts:{}};
 function pick(key){const a=knowledge[key];const i=(state.counts[key]||0)%a.length;state.counts[key]=i+1;return a[i];}
 function respond(raw){
 const q=norm(raw);state.turns++;let found='';for(const [name,keys] of sectors)if(keys.some(k=>has(q,k))){state.sector=name;found=name;break;}
 const remembered=state.pending;state.pending='';
 if(/^(gracias|muchas gracias|perfecto|genial|vale|ok|estupendo|de acuerdo)( gracias)?$/.test(q))return result('Puedes seguir preguntando o preparar tu solicitud cuando quieras. No se contrata nada desde este chat.','start',['Ver ejemplos','Empezar configuración']);
 if(/^(hola|buenas|hey|buenos dias|buenas tardes|buenas noches)$/.test(q))return result('¡Hola! Soy el asistente automático de YourDesignGPT. Para orientarte mejor: <strong>¿qué actividad o proyecto quieres presentar con tu web?</strong>','greeting',['Tengo un negocio','Quiero una web personal','Quiero saber el precio']);
 if(/^(si|no|eso|lo primero|lo segundo)$/.test(q)){
  if(!remembered)return result('¿Te refieres al presupuesto, al plazo o a una función concreta? Dímelo con un poco más de detalle para no asumir algo que no quieres.','clarify',['Precio y plazo','Qué incluye','Contactar con Pedro']);
  if(remembered==='materials'){state.pending='';return result(q==='no'?'Entonces conviene indicar qué materiales te faltan antes de fijar una fecha. Pedro podrá revisar si necesitas ayuda con textos, imágenes o logo.':'Con los materiales preparados será más fácil revisar el alcance y confirmar un calendario. Puedes indicarlo en el campo de tu idea al solicitar presupuesto.','start',['Empezar configuración','Ver ejemplos']);}
  if(remembered==='need')return result('¿Prefieres contacto por WhatsApp, un formulario sencillo o reservas con calendario? Así distinguimos la presentación básica de una integración adicional.','clarify',['Contacto por WhatsApp','Formulario sencillo','Reservas con calendario']);
 }
 let keys=Object.entries(topics).filter(([_,words])=>words.some(k=>has(q,k))).map(([key])=>key);
 if(has(q,'whatsapp')||has(q,'wasap')){state.need='WhatsApp';state.pending='materials';return result('Para '+(state.sector||'tu proyecto')+', un botón que abra WhatsApp permite recibir consultas sin implantar un calendario de reservas. No es lo mismo que una reserva automática: esa gestión la harías tú. <strong>¿Ya tienes textos y fotos?</strong>','included',['Sí','No','Precio y plazo']);}
 if(has(q,'formulario sencillo')||has(q,'formulario de contacto')){state.need='formulario';state.pending='materials';return result('Un formulario sencillo puede encajar en la landing para recibir consultas por correo. No implica agenda ni reserva confirmada. <strong>¿Ya tienes textos y fotos para presentar tu actividad?</strong>','included',['Sí','No','Qué incluye']);}
 if(has(q,'cuanto')&&/tard|tiempo/.test(q)&&!topics.price.some(k=>has(q,k)))keys=keys.filter(k=>k!=='price');
 if(remembered==='materials'&&!keys.length&&/tengo|falta|preparad/.test(q))keys=['materials'];
 if(has(q,'reserva')||has(q,'reservas')||has(q,'citas')){state.need='reservas';if(!keys.includes('extras'))keys.push('extras');}
 if(has(q,'pedro')&&!keys.length)keys=['contact'];
 if(has(q,'todo')&&remembered==='materials')keys=['materials'];
 const specific=keys.filter(k=>!['start','process'].includes(k));if(specific.length)keys=specific;
 if(!found&&!state.sector&&(has(q,'negocio')||has(q,'empresa'))&&keys.length===0)return result('¿Qué tipo de negocio tienes y qué te gustaría que hiciera su web? Por ejemplo, presentar servicios, recibir consultas o gestionar reservas.','clarify',['Quiero saber el precio','Qué incluye','Ver proyectos']);
 if(found&&keys.length===0){state.pending='need';const examples={restaurante:'carta, fotos, ubicación y contacto',alojamiento:'presentación, habitaciones y vías de contacto','peluquería':'servicios, fotos, horarios y contacto','estética':'tratamientos, imágenes y contacto','servicios profesionales':'servicios, zona de trabajo y contacto','marca personal':'presentación, trayectoria y proyectos'};return result('Para tu '+found+' podemos plantear una presentación con '+examples[found]+'. <strong>¿Buscas mostrar información y recibir consultas, o necesitas reservas o alguna otra función?</strong>','sectors',['Contacto por WhatsApp','Formulario sencillo','Reservas con calendario']);}
 if(!keys.length){if(/^(y )?(eso|y el otro|explicame mas|mas detalles|por que|como seria)$/.test(q)&&state.lastIntent&&knowledge[state.lastIntent])keys=[state.lastIntent];else return result(['No quiero darte una respuesta que no encaje. ¿Puedes contarme qué necesitas hacer con la web? Puedo orientarte sobre el servicio, pero no resolver cualquier tema.','Me falta un detalle para entenderte: ¿preguntas por una función, por el precio o por cómo empezar? Si es un caso particular, puedes hablar con Pedro.'][state.turns%2],'fallback',['Precio y plazo','Qué incluye','Contactar con Pedro']);}
 keys=[...new Set(keys)].slice(0,3);let text=keys.map(pick).join('<br><br>');
 if(found)text='Para tu '+found+', revisaría primero lo que necesitas publicar. '+text;
 const intent=keys[0];
 if(keys.includes('price'))text+='<br><br>La promoción usa el código <strong>YOURDESIGNGPT</strong> y figura vigente hasta el <strong>31/12/2026</strong>.';
 if(['price','included','start','process'].includes(intent)&&!state.sector){state.pending='sector';text+='<br><br><strong>¿Para qué actividad o proyecto sería?</strong>';}
 else if(['time','materials'].includes(intent)){state.pending='materials';text+='<br><br><strong>¿Ya tienes el contenido preparado?</strong>';}
 else if(intent==='extras'){state.pending='need';text+='<br><br>¿Qué debería poder hacer el visitante exactamente?';}
 return result(text,intent,intent==='contact'?['Ver contacto']:intent==='projects'?['Ver proyectos','Precio y plazo']:['Qué incluye','Precio y plazo','Empezar configuración']);
 }
 function result(text,intent,suggestions){state.lastIntent=intent;state.lastText=text;return {text,intent,suggestions};}
 return {respond,state};
}
global.YDGConversation={create,normalize:norm};
})(typeof window!=='undefined'?window:globalThis);
