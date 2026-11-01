/* YDG navigation + pricing refinement · 2026-11 */
(() => {
  'use strict';
  const style = document.createElement('style');
  style.id = 'ydg-navigation-final-style';
  style.textContent = `
    #ydg-site-header.aurora-header{
      position:sticky!important;top:0!important;z-index:1000!important;
      width:100%;background:rgba(8,13,22,.94)!important;
      -webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);
      border-bottom:1px solid rgba(103,232,249,.16);
      box-shadow:0 8px 26px rgba(0,0,0,.22);
    }
    #ydg-site-header .aurora-nav{
      display:flex!important;align-items:center!important;gap:clamp(7px,1vw,14px)!important;
      flex-wrap:nowrap!important;width:100%;max-width:1500px;margin:0 auto;
      padding:9px clamp(10px,2vw,24px)!important;min-height:68px;
    }
    #ydg-site-header .aurora-brand{flex:0 0 auto!important;min-width:0}
    #ydg-site-header #nav-content{
      display:flex!important;visibility:visible!important;opacity:1!important;
      flex:1 1 auto!important;min-width:0!important;align-items:center!important;
      gap:8px!important;background:transparent!important;
    }
    #ydg-site-header #nav-content.hidden{display:flex!important}
    #ydg-site-header .aurora-links{
      display:flex!important;align-items:center!important;justify-content:center!important;
      flex:1 1 auto!important;min-width:0!important;gap:clamp(5px,.75vw,12px)!important;
      white-space:nowrap!important;overflow-x:auto!important;scrollbar-width:none;
    }
    #ydg-site-header .aurora-links::-webkit-scrollbar{display:none}
    #ydg-site-header .aurora-links a{
      flex:0 0 auto!important;white-space:nowrap!important;
      padding:9px clamp(7px,.85vw,13px)!important;border-radius:999px!important;
      font-size:clamp(11px,.82vw,13px)!important;line-height:1.15!important;
      border:1px solid transparent;transition:background .2s ease,border-color .2s ease,color .2s ease;
    }
    #ydg-site-header .aurora-links a:hover,
    #ydg-site-header .aurora-links a[aria-current]{
      background:rgba(45,212,191,.10);border-color:rgba(45,212,191,.24);color:#99f6e4!important;
    }
    #ydg-site-header .aurora-config-direct,
    #ydg-site-header .aurora-client{
      flex:0 0 auto!important;white-space:nowrap!important;
      display:inline-flex!important;align-items:center;justify-content:center;
      padding:10px 13px!important;border-radius:999px!important;
      font-size:clamp(10px,.78vw,12px)!important;font-weight:800!important;
      border:1px solid rgba(34,211,238,.52)!important;
      background:linear-gradient(120deg,rgba(8,145,178,.22),rgba(14,116,144,.12))!important;
      color:#a5f3fc!important;box-shadow:inset 0 0 18px rgba(34,211,238,.045);
    }
    #ydg-site-header .aurora-client{border-color:rgba(45,212,191,.5)!important;color:#99f6e4!important}
    #ydg-site-header .ydg-language-strip{display:flex!important;flex:0 0 auto!important;gap:4px!important}
    #ydg-site-header #nav-toggle{display:none!important}
    #ydg-site-header .aurora-links a.ydg-main-about,
    #ydg-site-header .aurora-links a.ydg-main-wear{color:#67e8f9!important}
    .aurora-hero-grid .aurora-price-label{font-weight:800!important;letter-spacing:.02em}
    .aurora-hero-grid .aurora-terms{font-size:.76rem!important;line-height:1.55!important;color:#9aa9bd!important}
    .portfolio-swipe-hint{display:none!important}
    @media(max-width:900px){
      #ydg-site-header .aurora-nav{gap:6px!important;padding:8px 9px!important;min-height:58px}
      #ydg-site-header .aurora-brand img{width:42px!important;height:42px!important}
      #ydg-site-header .aurora-brand small{display:none!important}
      #ydg-site-header #nav-content{overflow:hidden!important;gap:5px!important}
      #ydg-site-header .aurora-links{justify-content:flex-start!important}
      #ydg-site-header .aurora-links a{font-size:10px!important;padding:8px 8px!important}
      #ydg-site-header .aurora-config-direct,#ydg-site-header .aurora-client{font-size:10px!important;padding:8px 9px!important}
      #ydg-site-header .ydg-language-strip{gap:2px!important}
      #ydg-site-header .lang-flag-btn{padding:2px!important}
      #ydg-site-header .lang-flag{width:18px!important;height:13px!important}
    }
    @media(max-width:620px){
      #ydg-site-header .aurora-nav{gap:5px!important}
      #ydg-site-header .aurora-brand img{width:34px!important;height:34px!important}
      #ydg-site-header .aurora-brand .ydg-wordmark{font-size:11px!important}
      #ydg-site-header .aurora-links{gap:2px!important}
      #ydg-site-header .aurora-links a{font-size:9px!important;padding:7px 6px!important}
      #ydg-site-header .aurora-config-direct,#ydg-site-header .aurora-client{font-size:9px!important;padding:7px 7px!important}
      #ydg-site-header .ydg-language-strip{display:none!important}
    }
    @media(max-width:430px){
      #ydg-site-header .aurora-brand span{display:none!important}
      #ydg-site-header .aurora-nav{padding-left:7px!important;padding-right:7px!important}
      #ydg-site-header .aurora-links a{font-size:8.5px!important;padding:7px 5px!important}
      #ydg-site-header .aurora-config-direct,#ydg-site-header .aurora-client{font-size:8.5px!important;padding:7px 6px!important}
    }
  `;
  document.head.appendChild(style);

  const nav = document.querySelector('#ydg-site-header .aurora-nav');
  const menu = document.getElementById('nav-content');
  const brand = document.getElementById('ydg-brand-home');
  if (nav && menu && brand) {
    const links = menu.querySelector('.aurora-links');
    const flags = menu.querySelector('#ydg-language-strip');
    const configure = nav.querySelector('.aurora-config-direct') || menu.querySelector('a[href="#configurador"]');
    const client = nav.querySelector('.aurora-client') || nav.querySelector('a[href*="ydg-client-portal"]');
    if (links) {
      // One horizontal navigation row: preserve the existing labels and add the two content sections.
      links.querySelector('a[href="#incluye"]')?.remove();
      const services = links.querySelector('a[data-aurora="services"]');
      if (services) services.href = '#servicios-web';
      const addLink = (href, label, cls) => {
        let a = links.querySelector('a[href="' + href + '"]');
        if (!a) { a = document.createElement('a'); a.href = href; a.textContent = label; a.className = cls || ''; links.appendChild(a); }
        return a;
      };
      addLink('#capacidades', 'Quién soy', 'ydg-main-about');
      addLink('#tienda', 'YDG Wear', 'ydg-main-wear');
      // Keep the two action tabs distinct in turquoise, but in the same row.
      if (configure && !links.contains(configure)) links.appendChild(configure);
      if (client && !links.contains(client)) links.appendChild(client);
      if (flags) menu.appendChild(flags);
      menu.classList.remove('hidden');
      menu.classList.add('flex');
      menu.removeAttribute('style');
      nav.appendChild(menu);
      menu.style.order = '2';
      links.style.order = '1';
      if (flags) flags.style.order = '3';
    }
    nav.querySelector('#nav-toggle')?.remove();
  }

  const copy = {
    es: {
      label: 'creación + servicio anual',
      terms: '99 € para iniciar el proyecto: creación, diseño y desarrollo de tu web. Los 100 €/año corresponden al servicio anual: dominio .es o .com, alojamiento web (hosting), certificado SSL y mantenimiento técnico para que tu web siga funcionando. Incluye cambios menores ilimitados durante los 12 meses.'
    },
    en: {
      label: 'website creation + annual service',
      terms: '€99 to start the project: website creation, design and development. The €100/year annual service covers a .es or .com domain, web hosting, SSL and technical maintenance to keep your website running. Unlimited minor changes are included during the 12-month service period.'
    },
    fr: {
      label: 'création du site + service annuel',
      terms: '99 € pour démarrer le projet : création, design et développement du site. Les 100 €/an couvrent le domaine .es ou .com, l’hébergement, le certificat SSL et la maintenance technique. Modifications mineures illimitées pendant les 12 mois.'
    },
    it: {
      label: 'creazione del sito + servizio annuale',
      terms: '99 € per avviare il progetto: creazione, design e sviluppo del sito. I 100 €/anno comprendono dominio .es o .com, hosting, certificato SSL e manutenzione tecnica. Modifiche minori illimitate durante i 12 mesi.'
    },
    de: {
      label: 'Website-Erstellung + Jahresservice',
      terms: '99 € zum Start des Projekts: Erstellung, Design und Entwicklung der Website. Die 100 €/Jahr umfassen eine .es- oder .com-Domain, Hosting, SSL und technische Wartung. Unbegrenzte kleinere Änderungen während der 12 Monate.'
    }
  };
  const applyPrice = () => {
    const lang = (document.documentElement.lang || 'es').slice(0,2);
    const c = copy[lang] || copy.es;
    const label = document.querySelector('.aurora-price-label');
    const terms = document.querySelector('.aurora-terms');
    const expiry = document.querySelector('.aurora-expiry');
    if (label) label.textContent = c.label;
    if (terms) terms.textContent = c.terms;
    if (expiry) expiry.textContent = lang === 'es' ? 'Promoción disponible hasta el 31/12/2026' :
      lang === 'en' ? 'Launch offer available until 31/12/2026' :
      lang === 'fr' ? 'Offre de lancement jusqu’au 31/12/2026' :
      lang === 'it' ? 'Promozione disponibile fino al 31/12/2026' : 'Angebot verfügbar bis 31.12.2026';
  };
  applyPrice();
  window.addEventListener('ydg-language-change', applyPrice);
})();
