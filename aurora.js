/* Aurora presentation only: reuse the original forms, portal and language system. */
(()=>{'use strict';
const copy={
es:{home:'Inicio',services:'Servicios',pricing:'Configurar',client:'Área de clientes',eyebrow:'DISEÑO WEB PROFESIONAL · MÁLAGA',headline:'Una web que no pasa',highlight:'desapercibida.',lead:'Webs para negocios y profesionales: solicitudes de reserva por WhatsApp, llamadas y mensajes directos. Facilita que tus clientes contacten contigo.',year:'/año',priceLabel:'de creación + servicio anual',expiry:'Promoción hasta el 31/12/2026 · Primer año: 199 €',cta:'Quiero mi web',projects:'Ver proyectos',terms:'Dominio, hosting, SSL, mantenimiento y hasta 3 ajustes menores al año. Funciones avanzadas, aparte.',example:'Ejemplo de diseño · Tu web se adapta a tu negocio',custom:'Diseño a tu medida',customDesc:'Tu identidad, tus servicios y una imagen que conecta con tus clientes.',mobile:'Tu web, también en móvil',mobileDesc:'Una experiencia cuidada en ordenador, tablet y teléfono.',clientDesc:'Accede a tu espacio de cliente desde un único lugar.',store:'Ver YDG-STORE',about:'CV y experiencia',faq:'Preguntas frecuentes'},
en:{home:'Home',services:'Services',pricing:'Configure',client:'Client area',eyebrow:'PROFESSIONAL WEB DESIGN · MÁLAGA',headline:'A website that gets',highlight:'noticed.',lead:'Web design and development for businesses ready to stand out. The best digital version of your brand.',year:'/year',priceLabel:'creation + annual service',expiry:'Offer until 31/12/2026 · First year: €199',cta:'I want my website',projects:'View projects',terms:'Domain, hosting, SSL, maintenance and up to 3 minor updates a year. Advanced features quoted separately.',example:'Design example · Adapted to your business',custom:'Designed for you',customDesc:'Your identity, your services and a design that connects with your customers.',mobile:'Great on mobile too',mobileDesc:'A polished experience on desktop, tablet and phone.',clientDesc:'Access your dedicated client space.',store:'View YDG-STORE',about:'CV & experience',faq:'Frequently asked questions'},
fr:{home:'Accueil',services:'Services',pricing:'Configurer',client:'Espace clients',eyebrow:'CRÉATION WEB PROFESSIONNELLE · MÁLAGA',headline:'Un site qui ne passe pas',highlight:'inaperçu.',lead:'Création de sites pour les entreprises qui veulent se démarquer. Le meilleur de votre marque en ligne.',year:'/an',priceLabel:'création + service annuel',expiry:'Offre jusqu’au 31/12/2026 · Première année : 199 €',cta:'Je veux mon site',projects:'Voir les projets',terms:'Domaine, hébergement, SSL, maintenance et 3 petites modifications par an. Fonctions avancées sur devis.',example:'Exemple de design · Adapté à votre activité',custom:'Un design sur mesure',customDesc:'Votre identité et vos services, dans un site qui parle à vos clients.',mobile:'Aussi sur mobile',mobileDesc:'Une expérience soignée sur ordinateur, tablette et téléphone.',clientDesc:'Accédez à votre espace client.',store:'Voir YDG-STORE',about:'À propos de Pedro SC',faq:'Questions fréquentes'},
it:{home:'Home',services:'Servizi',pricing:'Configura',client:'Area clienti',eyebrow:'WEB DESIGN PROFESSIONALE · MÁLAGA',headline:'Un sito che non passa',highlight:'inosservato.',lead:'Design e sviluppo web per attività che vogliono distinguersi. La migliore versione digitale del tuo marchio.',year:'/anno',priceLabel:'creazione + servizio annuale',expiry:'Promozione fino al 31/12/2026 · Primo anno: 199 €',cta:'Voglio il mio sito',projects:'Vedi i progetti',terms:'Dominio, hosting, SSL, manutenzione e 3 piccole modifiche all’anno. Funzioni avanzate su preventivo.',example:'Esempio di design · Adattato alla tua attività',custom:'Design su misura',customDesc:'La tua identità e i tuoi servizi, con un’immagine che parla ai clienti.',mobile:'Anche su mobile',mobileDesc:'Un’esperienza curata su computer, tablet e telefono.',clientDesc:'Accedi alla tua area clienti.',store:'Vedi YDG-STORE',about:'Chi è Pedro SC',faq:'Domande frequenti'},
de:{home:'Start',services:'Leistungen',pricing:'Konfigurieren',client:'Kundenbereich',eyebrow:'PROFESSIONELLES WEBDESIGN · MÁLAGA',headline:'Eine Website, die',highlight:'auffällt.',lead:'Webdesign und Entwicklung für Unternehmen, die sich abheben möchten. Ihre Marke digital in Bestform.',year:'/Jahr',priceLabel:'Erstellung + jährlicher Service',expiry:'Angebot bis 31.12.2026 · Erstes Jahr: 199 €',cta:'Meine Website starten',projects:'Projekte ansehen',terms:'Domain, Hosting, SSL, Wartung und bis zu 3 kleine Anpassungen jährlich. Erweiterte Funktionen nach Angebot.',example:'Designbeispiel · Passend zu Ihrem Unternehmen',custom:'Design nach Maß',customDesc:'Ihre Identität und Leistungen, passend zu Ihren Kunden.',mobile:'Auch mobil überzeugend',mobileDesc:'Ein gutes Erlebnis auf Computer, Tablet und Smartphone.',clientDesc:'Zugang zu Ihrem persönlichen Kundenbereich.',store:'YDG-STORE ansehen',about:'Über Pedro SC',faq:'Häufige Fragen'}
};
function apply(){const lang=(document.documentElement.lang||'es').slice(0,2),c=copy[lang]||copy.es;document.querySelectorAll('[data-aurora]').forEach(el=>{const v=c[el.dataset.aurora];if(v)el.textContent=v});const toggle=document.getElementById('nav-toggle');if(toggle)toggle.setAttribute('aria-label',lang==='es'?'Abrir menú':'Menu');}
const footer=document.querySelector('footer');if(footer){const links=document.createElement('div');links.id='aurora-footer-links';links.innerHTML='<a href="#tienda" id="aurora-store-toggle" data-aurora="store">Ver YDG-STORE</a><a href="#capacidades" data-aurora="about">Sobre Pedro SC</a><a href="#faq" data-aurora="faq">Preguntas frecuentes</a>';footer.prepend(links);document.getElementById('aurora-store-toggle').addEventListener('click',()=>document.getElementById('tienda')?.classList.add('aurora-store-open'));}
function showStoreHash(){if(location.hash==='#tienda')document.getElementById('tienda')?.classList.add('aurora-store-open');}showStoreHash();addEventListener('hashchange',showStoreHash);
const menu=document.getElementById('nav-content');menu?.querySelectorAll('.aurora-links a').forEach(link=>link.addEventListener('click',()=>{if(innerWidth<1001){menu.classList.add('hidden');menu.classList.remove('flex');document.getElementById('nav-toggle')?.setAttribute('aria-expanded','false');}}));
apply();addEventListener('ydg-language-change',apply);
// Keep all pricing and payment logic in the existing application. The hero follows promo expiry.
if(Date.now()>=new Date('2027-01-01T00:00:00+01:00').getTime()){const offer=document.querySelector('.aurora-offer');if(offer){offer.querySelector('.aurora-price').innerHTML='<strong>495 €</strong><span>+</span><strong>150 €<small data-aurora="year">/año</small></strong>';offer.querySelector('.aurora-expiry').remove();apply();}}
})();

/* Focused navigation: one section at a time, no long homepage. */
(()=>{
 const main=document.getElementById('main-content');
 const sections=[...main.children].filter(e=>e.tagName==='SECTION');
 const routes=new Set(['aurora-home','portfolio','configurador','incluye','faq','capacidades','tienda','como-funciona','links-importantes','calidad','servicios-web','opiniones']);
 function show(id,scroll=true){
  if(!routes.has(id))id='aurora-home';
  document.body.dataset.auroraView=id;
  sections.forEach(s=>{s.classList.toggle('aurora-active-section',s.id===id);});
  if(id==='tienda')document.getElementById('tienda')?.classList.add('aurora-store-open');
  const menu=document.getElementById('nav-content');menu?.classList.add('hidden');menu?.classList.remove('flex');
  document.getElementById('nav-toggle')?.setAttribute('aria-expanded','false');
  document.querySelectorAll('.aurora-links a').forEach(a=>{a.toggleAttribute('aria-current',a.hash.slice(1)===id||(id==='aurora-home'&&a.hash==='#main-content'));});
  if(scroll)window.scrollTo({top:0,behavior:'instant'});
 }
 document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="#"]');if(!a)return;
  let id=a.getAttribute('href').slice(1);if(id==='main-content'||id==='hero-section')id='aurora-home';
  if(!routes.has(id))return;
  e.preventDefault();e.stopImmediatePropagation();
  history.pushState(null,'',id==='aurora-home'?location.pathname:'#'+id);
  show(id);
 },true);
 const route=()=>show(location.hash.slice(1)||'aurora-home');
 addEventListener('popstate',route);addEventListener('hashchange',route);
 document.querySelector('.aurora-links a[href="#incluye"]')?.remove();
 document.body.classList.add('aurora-focused');
 route();
})();

/* Keep configuration directly accessible and restore the brand click gesture. */
(()=>{
 const nav=document.querySelector('.aurora-nav'),menu=document.getElementById('nav-content'),brand=document.getElementById('ydg-brand-home');
 const configure=menu?.querySelector('a[href="#configurador"]');
 if(configure&&nav){configure.className='aurora-config-direct';nav.insertBefore(configure,document.getElementById('nav-toggle'));}
 if(brand){
  brand.classList.add('aurora-click-brand');
  const cursor=document.createElement('span');cursor.className='aurora-brand-cursor';cursor.setAttribute('aria-hidden','true');
  cursor.innerHTML='<svg viewBox="0 0 25 30" width="22" height="27"><path d="M3 2 22 17l-9 1 4 9-5 2-4-10-6 6Z" fill="currentColor" stroke="#07111f" stroke-width="1.4"/></svg>';
  brand.append(cursor);
  function play(){brand.classList.remove('aurora-brand-playing');void brand.offsetWidth;brand.classList.add('aurora-brand-playing');setTimeout(()=>brand.classList.remove('aurora-brand-playing'),1900);}
  document.addEventListener('click',e=>{if(e.target.closest('#ydg-brand-home'))play();},true);
  // The focused navigation handler intercepts links; pointer feedback is independent.
  brand.addEventListener('pointerdown',play);
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)play();
 }
})();

(()=>{
 const links=document.getElementById('aurora-footer-links');
 if(links){const scan=document.createElement('a');scan.href='#calidad';scan.textContent='Escáner web · Simulación';links.append(scan);}
})();

/* Direct navigation on all screen sizes, without a nested menu. */
(()=>{
 const flags=document.getElementById('ydg-language-strip'),footer=document.querySelector('footer');
 if(flags&&footer)footer.append(flags);
 document.getElementById('nav-toggle')?.remove();
 const hero=document.querySelector('.aurora-lead');
 if(hero){const row=document.createElement('p');row.className='aurora-contact-features';row.innerHTML='<span>WhatsApp · Reservas</span><span>Llamadas directas</span><span>Mensajes</span>';hero.after(row);}
})();

/* Final compact pass: plain CTA labels and concise contact benefits. */
(()=>{
 function tidy(){
  document.querySelectorAll('.aurora-primary').forEach(a=>{[...a.childNodes].filter(n=>n.nodeType===3).forEach(n=>{n.textContent=n.textContent.replace(/[↗→]/g,'').trim();});});
  const lang=(document.documentElement.lang||'es').slice(0,2);
  const texts={
   es:['Webs para negocios y profesionales con reservas por WhatsApp, llamadas y mensajes directos.','WhatsApp · Reservas','Llamadas directas','Mensajes'],
   en:['Websites for businesses and professionals, with booking enquiries by WhatsApp, direct calls and messages.','WhatsApp · Bookings','Direct calls','Messages'],
   fr:['Sites pour entreprises et professionnels : demandes de réservation par WhatsApp, appels et messages directs.','WhatsApp · Réservations','Appels directs','Messages'],
   it:['Siti per attività e professionisti: richieste di prenotazione via WhatsApp, chiamate e messaggi diretti.','WhatsApp · Prenotazioni','Chiamate dirette','Messaggi'],
   de:['Websites für Unternehmen: Buchungsanfragen per WhatsApp, direkte Anrufe und Nachrichten.','WhatsApp · Anfragen','Direkte Anrufe','Nachrichten']
  }[lang]||null;
  if(texts){const lead=document.querySelector('.aurora-lead');if(lead)lead.textContent=texts[0];document.querySelectorAll('.aurora-contact-features span').forEach((e,i)=>e.textContent=texts[i+1]||'');}
 }
 tidy();addEventListener('ydg-language-change',tidy);
})();

/* Restore the original gradient wordmark and click signature in the main brand. */
(()=>{
 const brand=document.getElementById('ydg-brand-home');
 if(!brand)return;
 const label=brand.querySelector('span:not(.aurora-brand-cursor)');
 if(label)label.innerHTML='<span class="ydg-wordmark">YourDesignGPT</span><small>WEB DESIGN & DEVELOPMENT</small>';
 brand.querySelector('.aurora-brand-cursor')?.remove();
 const cursor=document.createElement('span');cursor.className='ydg-click-cursor';cursor.setAttribute('aria-hidden','true');
 cursor.innerHTML='<svg viewBox="0 0 25 30" width="24" height="28"><path d="M3 2 22 17l-9 1 4 9-5 2-4-10-6 6Z" fill="currentColor" stroke="#07111f" stroke-width="1.4"/></svg>';
 brand.append(cursor);
 const ring=document.createElement('span');ring.className='ydg-click-ring';ring.setAttribute('aria-hidden','true');brand.append(ring);
})();

/* Full visible site navigation, with editorial footer links. */
(()=>{
 const links=document.querySelector('.aurora-links');
 const items=[['#main-content','Inicio'],['#portfolio','Proyectos'],['#incluye','Qué incluye'],['#como-funciona','Cómo trabajamos'],['#calidad','Escáner web'],['#capacidades','CV y experiencia'],['#tienda','YDG Store'],['#faq','Preguntas frecuentes'],['#links-importantes','Contacto']];
 if(links)links.innerHTML=items.map(([href,label])=>'<a href="'+href+'">'+label+'</a>').join('');
 document.getElementById('aurora-footer-links')?.remove();
 const scan=document.getElementById('calidad');
 if(scan&&!document.getElementById('ydg-scan-scope')){
  const note=document.createElement('p');note.id='ydg-scan-scope';note.textContent='Demostración visual del proceso de revisión. Los resultados de esta animación son orientativos y no constituyen una auditoría técnica en tiempo real.';
  scan.querySelector('.ydg-status-actions')?.before(note);
 }
 const price=document.querySelector('.aurora-offer');
 if(price){const badge=document.createElement('p');badge.className='aurora-offer-badge';badge.textContent='TU NEGOCIO, CON WEB PROPIA';price.prepend(badge);}
})();

/* Sector previews: independent buttons, accessible native dialog, original selection logic. */
(()=>{
 const cards=[...document.querySelectorAll('#configurador .ydg-choice-card[data-type]')];
 if(!cards.length)return;
 const examples=[
 {brand:'NEXO / STUDIO',title:'Ideas claras.<br>Negocios que crecen.',tag:'CONSULTORÍA & ESTRATEGIA',desc:'Tu próximo paso empieza con una buena conversación.',cta:'Hablemos de tu proyecto',theme:'business',detail:'Servicios, presentación de empresa y contacto directo.',body:'<div class="mp-metrics"><b>01<small>Estrategia</small></b><b>02<small>Diseño</small></b><b>03<small>Resultados</small></b></div>'},
 {brand:'BRASA & SAL',title:'El Mediterráneo,<br>en cada mesa.',tag:'COCINA DE TEMPORADA',desc:'Sabores de aquí. Momentos para quedarse.',cta:'Reservar mesa',theme:'restaurant',detail:'Carta visual, horarios y solicitudes de reserva por WhatsApp.',body:'<div class="mp-food"><i></i><span>Producto fresco · Cocina con alma</span></div><div class="mp-minirow"><b>La carta</b><b>El espacio</b><b>Reserva</b></div>'},
 {brand:'CASA AZUL / BOUTIQUE',title:'Desconecta.<br>Ya has llegado.',tag:'TU REFUGIO JUNTO AL MAR',desc:'Habitaciones con calma y días sin prisa.',cta:'Consultar disponibilidad',theme:'hotel',detail:'Habitaciones, servicios y acceso a reservas o contacto.',body:'<div class="mp-booking"><span>Llegada<big>12 JUN</big></span><span>Salida<big>15 JUN</big></span><span>Huéspedes<big>2 adultos</big></span></div>'},
 {brand:'ALEX / CREATIVE',title:'Diseño con intención.<br>Ideas con carácter.',tag:'PORTFOLIO PERSONAL',desc:'Identidad visual, experiencias digitales y proyectos propios.',cta:'Explora mi trabajo',theme:'personal',detail:'Presentación, proyectos, experiencia y redes profesionales.',body:'<div class="mp-work"><div>TYPE<br><b>Aa</b></div><div>BRAND<br><b>✳</b></div><div>DIGITAL<br><b>↗</b></div></div>'},
 {brand:'LA PAUSA / JOURNAL',title:'Historias que<br>merecen un café.',tag:'CULTURA · VIAJES · IDEAS',desc:'Una mirada curiosa a las pequeñas cosas.',cta:'Leer la última historia',theme:'blog',detail:'Artículos, categorías y una lectura cómoda en cualquier pantalla.',body:'<div class="mp-stories"><article><i></i><small>ESCAPADAS</small><b>El lujo de ir despacio</b></article><article><i></i><small>INSPIRACIÓN</small><b>Una idea para cada día</b></article></div>'},
 {brand:'PULSE / AUDIO',title:'Menos ruido.<br>Más tú.',tag:'DESCUBRE TU NUEVO RITMO',desc:'Una página. Un producto. Todo el protagonismo.',cta:'Descubrir Pulse',theme:'landing',detail:'Propuesta de valor, beneficios y una llamada a la acción clara.',body:'<div class="mp-product"><div class="mp-headphones"><i></i><i></i></div><span>Diseñado para acompañarte.</span></div>'},
 {brand:'ORBIT / LAB',title:'Tu idea no cabe<br>en una plantilla.',tag:'PROYECTOS A MEDIDA',desc:'Experiencias digitales con personalidad propia.',cta:'Cuéntanos tu idea',theme:'custom',detail:'Una referencia creativa para definir contigo un proyecto a medida.',body:'<div class="mp-orbit"><span>IDEA</span><span>DISEÑO</span><span>ACCIÓN</span></div>'},
 {brand:'IMPULSO / ACADEMY',title:'Tu siguiente meta,<br>más cerca.',tag:'APRENDE · PRACTICA · AVANZA',desc:'Tu temario y tus cuestionarios, en un solo lugar.',cta:'Explorar los cursos',theme:'academy',detail:'Temarios, cuestionarios y progreso: funciones según el alcance contratado.',body:'<div class="mp-dashboard"><div><small>MI PROGRESO</small><b>68%</b><i></i></div><ul><li>Temario organizado <b>12 temas</b></li><li>Practica a tu ritmo <b>Test</b></li><li>Tu próxima sesión <b>Continuar</b></li></ul></div>'}
 ];
 const dialog=document.createElement('dialog');dialog.id='ydg-example-dialog';dialog.setAttribute('aria-labelledby','ydg-example-title');
 dialog.innerHTML='<div class="mp-dialog-head"><div><p>INSPÍRATE PARA TU PROYECTO</p><h2 id="ydg-example-title"></h2></div><button type="button" class="mp-close" aria-label="Cerrar ejemplo">×</button></div><p class="mp-description"></p><div class="mp-stage"></div><p class="mp-note">Ejemplo orientativo con marca ficticia. Adaptamos el diseño a tu negocio; las funciones se acuerdan según el alcance.</p><div class="mp-dialog-actions"><button type="button" class="mp-choose">Elegir este tipo</button><button type="button" class="mp-back">Seguir mirando</button></div>';
 document.body.append(dialog);
 let chosen=0,opener=null,previousOverflow='';
 function close(){dialog.close();}
 function render(ex,mobile=false){return '<div class="mp-screen '+ex.theme+(mobile?' mp-phone-screen':'')+'"><div class="mp-site-nav"><b>'+ex.brand+'</b><span>Inicio &nbsp; Colección &nbsp; Contacto</span></div><div class="mp-content"><div class="mp-copy"><small>'+ex.tag+'</small><h3>'+ex.title+'</h3><p>'+ex.desc+'</p><span class="mp-visual-cta">'+ex.cta+' ↗</span></div>'+ex.body+'</div><div class="mp-site-bottom">HECHO PARA TU MARCA <span>Diseño · Experiencia · Conexión</span></div></div>';}
 function open(i,btn){
  chosen=i;opener=btn;const ex=examples[i];
  dialog.querySelector('h2').textContent=cards[i].dataset.type;
  dialog.querySelector('.mp-description').textContent=ex.detail;
  dialog.querySelector('.mp-stage').innerHTML='<div class="mp-desktop"><div class="mp-browser-bar"><i></i><i></i><i></i><span>Vista de ordenador · Ejemplo de diseño</span></div>'+render(ex)+'</div><div class="mp-phone" aria-hidden="true"><div class="mp-notch"></div>'+render(ex,true)+'</div>';
  previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();dialog.querySelector('.mp-close').focus();
 }
 cards.forEach((card,i)=>{
  const wrap=document.createElement('div');wrap.className='ydg-example-choice';card.before(wrap);wrap.append(card);
  const btn=document.createElement('button');btn.type='button';btn.className='ydg-example-open';btn.textContent='Ver ejemplo';btn.setAttribute('aria-label','Ver ejemplo de '+card.dataset.type);btn.setAttribute('aria-haspopup','dialog');btn.addEventListener('click',()=>open(i,btn));wrap.append(btn);
 });
 dialog.querySelector('.mp-close').addEventListener('click',close);
 dialog.querySelector('.mp-back').addEventListener('click',close);
 dialog.querySelector('.mp-choose').addEventListener('click',()=>{cards[chosen].click();close();cards[chosen].focus();});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
 dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;opener?.focus();});
})();
