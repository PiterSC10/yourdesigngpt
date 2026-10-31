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
 const routes=new Set(['aurora-home','portfolio','configurador','incluye','faq','capacidades','tienda','como-funciona','links-importantes','calidad']);
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
