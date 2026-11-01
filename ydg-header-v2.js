/* YourDesignGPT · Header V2: premium desktop navigation and compact mobile menu */
(() => {
  'use strict';
  const header = document.getElementById('ydg-site-header');
  const nav = header?.querySelector('.aurora-nav');
  const menu = document.getElementById('nav-content');
  const brand = document.getElementById('ydg-brand-home');
  if (!header || !nav || !menu || !brand || nav.dataset.ydgHeaderV2 === '1') return;
  nav.dataset.ydgHeaderV2 = '1';

  const links = menu.querySelector('.aurora-links');
  const flags = menu.querySelector('#ydg-language-strip');
  if (!links) return;

  // Remove the redundant price caption: the exact split is explained in the small print.
  document.querySelector('.aurora-price-label')?.remove();

  // Remove the three repeated benefit cards from the homepage.
  document.querySelector('.aurora-benefits')?.remove();

  // Add the requested closing vertical bar to the hero eyebrow.
  const eyebrow = document.querySelector('.aurora-eyebrow[data-aurora="eyebrow"]');
  if (eyebrow) {
    eyebrow.classList.add('ydg-eyebrow-closed');
    eyebrow.setAttribute('data-ydg-eyebrow-closed', 'true');
  }

  // Keep the existing navigation items and destinations, without duplicates.
  links.querySelector('a[href="#incluye"]')?.remove();
  const services = links.querySelector('a[data-aurora="services"]');
  if (services) { services.href = '#servicios-web'; services.textContent = 'Servicios'; }
  const ensureLink = (href, label, cls) => {
    let a = links.querySelector('a[href="' + href + '"]');
    if (!a) {
      a = document.createElement('a');
      a.href = href;
      a.textContent = label;
      a.className = cls || '';
      links.appendChild(a);
    }
    return a;
  };
  const about = ensureLink('#capacidades', 'Quién soy', 'ydg-main-about');
  const wear = ensureLink('#tienda', 'YDG Wear', 'ydg-main-wear');
  about.textContent = 'Quién soy';
  wear.textContent = 'YDG Wear';

  const configure = menu.querySelector('a.aurora-config-direct') || nav.querySelector('a.aurora-config-direct');
  const client = menu.querySelector('a.aurora-client') || nav.querySelector('a.aurora-client');
  if (configure) configure.textContent = 'Configura tu web';
  if (client) client.textContent = 'Área de clientes';

  // Rebuild only the header's layout wrappers, reusing the original anchors and language controls.
  const top = document.createElement('div');
  top.className = 'ydg-header-top';
  const mobileToggle = document.createElement('button');
  mobileToggle.type = 'button';
  mobileToggle.className = 'ydg-mobile-toggle';
  mobileToggle.setAttribute('aria-label', 'Abrir menú');
  mobileToggle.setAttribute('aria-expanded', 'false');
  mobileToggle.setAttribute('aria-controls', 'nav-content');
  mobileToggle.innerHTML = '<span></span><span></span><span></span>';

  const actions = document.createElement('div');
  actions.className = 'ydg-header-actions';
  if (configure) actions.appendChild(configure);
  if (client) actions.appendChild(client);

  const menuRow = document.createElement('div');
  menuRow.className = 'ydg-header-menu-row';
  menuRow.appendChild(menu);
  if (flags && !menu.contains(flags)) menu.appendChild(flags);

  // Clear the old nav layout, then insert the brand, CTAs, mobile toggle and one menu row.
  nav.replaceChildren(top, menuRow);
  top.append(brand, actions, mobileToggle);
  nav.classList.add('ydg-header-v2');

  const closeMobileMenu = () => {
    header.classList.remove('ydg-mobile-menu-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-label', 'Abrir menú');
  };
  mobileToggle.addEventListener('click', () => {
    const open = !header.classList.contains('ydg-mobile-menu-open');
    header.classList.toggle('ydg-mobile-menu-open', open);
    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  links.addEventListener('click', e => {
    if (e.target.closest('a')) closeMobileMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeMobileMenu();
  });

  const style = document.createElement('style');
  style.id = 'ydg-header-v2-style';
  style.textContent = `
    #ydg-site-header.aurora-header{
      position:sticky!important;top:0!important;z-index:1200!important;width:100%;
      background:rgba(5,11,21,.97)!important;
      -webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);
      border-bottom:1px solid rgba(103,232,249,.17);
      box-shadow:0 9px 28px rgba(0,0,0,.24);
    }
    #ydg-site-header .aurora-nav.ydg-header-v2{
      display:flex!important;flex-direction:column!important;align-items:stretch!important;
      gap:0!important;width:100%;max-width:1540px;margin:0 auto;
      padding:8px clamp(14px,2.2vw,30px)!important;min-height:0!important;
    }
    #ydg-site-header .ydg-header-top{
      display:flex!important;align-items:center!important;justify-content:space-between!important;
      gap:18px!important;min-height:62px!important;width:100%;
    }
    #ydg-site-header .aurora-brand{flex:0 0 auto!important;min-width:0}
    #ydg-site-header .aurora-brand img{width:58px!important;height:58px!important}
    #ydg-site-header .ydg-header-actions{
      display:flex!important;align-items:center!important;justify-content:flex-end!important;
      gap:10px!important;margin-left:auto!important;
    }
    #ydg-site-header .ydg-header-actions .aurora-config-direct,
    #ydg-site-header .ydg-header-actions .aurora-client{
      display:inline-flex!important;align-items:center!important;justify-content:center!important;
      white-space:nowrap!important;padding:11px 19px!important;border-radius:999px!important;
      font-size:13px!important;font-weight:850!important;line-height:1.15!important;
      text-decoration:none!important;transition:transform .2s ease,filter .2s ease,box-shadow .2s ease;
    }
    #ydg-site-header .ydg-header-actions .aurora-config-direct{
      color:#baf6ff!important;border:1px solid rgba(45,212,240,.75)!important;
      background:linear-gradient(110deg,#075985 0%,#0891b2 52%,#38bdf8 100%)!important;
      box-shadow:0 0 18px rgba(34,211,238,.16),inset 0 1px rgba(255,255,255,.16)!important;
    }
    #ydg-site-header .ydg-header-actions .aurora-client{
      color:#f7eaff!important;border:1px solid rgba(216,180,254,.66)!important;
      background:linear-gradient(110deg,#6b21a8 0%,#9333ea 52%,#db6be9 100%)!important;
      box-shadow:0 0 18px rgba(192,132,252,.18),inset 0 1px rgba(255,255,255,.18)!important;
    }
    #ydg-site-header .ydg-header-actions a:hover{transform:translateY(-1px);filter:brightness(1.1)}
    #ydg-site-header .ydg-header-menu-row{
      display:flex!important;align-items:center!important;justify-content:center!important;
      width:100%;padding-top:7px;border-top:1px solid rgba(148,163,184,.12);
    }
    #ydg-site-header #nav-content{
      display:flex!important;visibility:visible!important;opacity:1!important;
      position:static!important;flex:1 1 auto!important;min-width:0!important;
      align-items:center!important;justify-content:center!important;gap:16px!important;
      background:transparent!important;padding:0!important;border:0!important;box-shadow:none!important;
    }
    #ydg-site-header #nav-content.hidden{display:flex!important}
    #ydg-site-header .aurora-links{
      display:flex!important;align-items:center!important;justify-content:center!important;
      flex:1 1 auto!important;min-width:0!important;gap:clamp(6px,.85vw,13px)!important;
      white-space:nowrap!important;overflow-x:auto!important;scrollbar-width:none!important;
    }
    #ydg-site-header .aurora-links::-webkit-scrollbar{display:none}
    #ydg-site-header .aurora-links a{
      flex:0 0 auto!important;white-space:nowrap!important;padding:10px clamp(12px,1.25vw,19px)!important;
      border-radius:999px!important;font-size:12px!important;line-height:1.15!important;
      border:1px solid rgba(71,111,147,.32)!important;background:rgba(15,35,57,.78)!important;
      color:#d7e5f5!important;transition:all .2s ease;
    }
    #ydg-site-header .aurora-links a:hover,
    #ydg-site-header .aurora-links a[aria-current]{
      background:rgba(45,212,191,.13)!important;border-color:rgba(45,212,191,.48)!important;
      color:#8df4ec!important;
    }
    #ydg-site-header .aurora-links a.ydg-main-about,
    #ydg-site-header .aurora-links a.ydg-main-wear{color:#67e8f9!important}
    #ydg-site-header .ydg-language-strip{display:flex!important;flex:0 0 auto!important;gap:5px!important}
    #ydg-site-header .lang-flag-btn{padding:4px!important}
    #ydg-site-header .lang-flag{width:20px!important;height:14px!important}
    #ydg-site-header .ydg-mobile-toggle{display:none!important}
    .aurora-hero-grid .aurora-price-label{display:none!important}
    .aurora-hero-grid .aurora-eyebrow.ydg-eyebrow-closed::after{
      content:' |';display:inline-block;margin-left:3px;color:#22d3ee;font-weight:900;
    }
    @media(max-width:760px){
      #ydg-site-header .aurora-nav.ydg-header-v2{padding:7px 12px 9px!important;gap:0!important}
      #ydg-site-header .ydg-header-top{min-height:48px!important;gap:10px!important;flex-wrap:wrap!important}
      #ydg-site-header .aurora-brand img{width:43px!important;height:43px!important}
      #ydg-site-header .aurora-brand small{display:none!important}
      #ydg-site-header .aurora-brand .ydg-wordmark{font-size:clamp(13px,3.8vw,17px)!important}
      #ydg-site-header .ydg-header-actions{
        order:3!important;width:100%!important;margin:0!important;display:flex!important;
        gap:9px!important;padding:3px 0 5px!important;
      }
      #ydg-site-header .ydg-header-actions a{flex:1 1 50%!important;padding:11px 8px!important;font-size:12px!important}
      #ydg-site-header .ydg-mobile-toggle{
        display:flex!important;flex:0 0 42px!important;width:42px!important;height:40px!important;
        margin-left:auto!important;align-items:center!important;justify-content:center!important;
        flex-direction:column!important;gap:5px!important;border:1px solid rgba(103,232,249,.35)!important;
        border-radius:12px!important;background:rgba(14,35,55,.95)!important;cursor:pointer!important;
      }
      #ydg-site-header .ydg-mobile-toggle span{
        display:block!important;width:19px!important;height:2px!important;border-radius:2px!important;
        background:#8beaf3!important;transition:transform .2s ease,opacity .2s ease;
      }
      #ydg-site-header.aurora-header.ydg-mobile-menu-open .ydg-mobile-toggle span:first-child{transform:translateY(7px) rotate(45deg)}
      #ydg-site-header.aurora-header.ydg-mobile-menu-open .ydg-mobile-toggle span:nth-child(2){opacity:0}
      #ydg-site-header.aurora-header.ydg-mobile-menu-open .ydg-mobile-toggle span:last-child{transform:translateY(-7px) rotate(-45deg)}
      #ydg-site-header .ydg-header-menu-row{
        display:none!important;padding:8px 0 3px!important;border-top:1px solid rgba(148,163,184,.13);
      }
      #ydg-site-header.aurora-header.ydg-mobile-menu-open .ydg-header-menu-row{display:flex!important}
      #ydg-site-header #nav-content{
        display:flex!important;flex-direction:column!important;align-items:stretch!important;
        width:100%!important;gap:8px!important;
      }
      #ydg-site-header .aurora-links{
        display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;
        gap:7px!important;white-space:normal!important;overflow:visible!important;
      }
      #ydg-site-header .aurora-links a{
        text-align:center!important;padding:11px 8px!important;font-size:12px!important;
      }
      #ydg-site-header .ydg-language-strip{justify-content:center!important;padding:4px 0!important}
      #ydg-site-header .lang-flag{width:23px!important;height:16px!important}
    }
    @media(max-width:390px){
      #ydg-site-header .ydg-header-actions a{font-size:11px!important;padding:10px 5px!important}
      #ydg-site-header .aurora-brand .ydg-wordmark{font-size:12px!important}
    }
    @media(prefers-reduced-motion:reduce){
      #ydg-site-header *{transition:none!important}
    }
  `;
  document.head.appendChild(style);
  // Ensure all anchors in the single menu scroll to the right section and the fixed header remains usable.
  document.querySelectorAll('main section[id]').forEach(section => {
    section.style.scrollMarginTop = '150px';
  });
})();
