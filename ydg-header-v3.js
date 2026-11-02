/* YourDesignGPT · Header V3 + visitor scan counter */
(() => {
  'use strict';
  const start = () => {
    const header = document.getElementById('ydg-site-header');
    const nav = header?.querySelector('.aurora-nav');
    const menu = document.getElementById('nav-content');
    const brand = document.getElementById('ydg-brand-home');
    if (!header || !nav || !menu || !brand || nav.dataset.ydgHeaderV3 === '1') return;
    nav.dataset.ydgHeaderV3 = '1';

    const links = menu.querySelector('.aurora-links');
    const flags = menu.querySelector('#ydg-language-strip');
    if (!links) return;

    document.querySelector('.aurora-price-label')?.remove();
    document.querySelector('.aurora-benefits')?.remove();

    const eyebrow = document.querySelector('.aurora-eyebrow[data-aurora="eyebrow"]');
    if (eyebrow && !eyebrow.querySelector('.ydg-eyebrow-ending')) {
      const ending = document.createElement('span');
      ending.className = 'ydg-eyebrow-ending';
      ending.textContent = ' |';
      ending.setAttribute('aria-hidden', 'true');
      eyebrow.appendChild(ending);
    }

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

    const configure = nav.querySelector('a.aurora-config-direct') || menu.querySelector('a.aurora-config-direct');
    const client = nav.querySelector('a.aurora-client') || menu.querySelector('a.aurora-client');
    if (configure) configure.textContent = 'Configura tu web';
    if (client) client.textContent = 'Área de clientes';

    const top = document.createElement('div');
    top.className = 'ydg-header-top-v3';
    const actions = document.createElement('div');
    actions.className = 'ydg-header-actions-v3';
    if (configure) actions.appendChild(configure);
    if (client) actions.appendChild(client);

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'ydg-mobile-toggle-v3';
    toggle.setAttribute('aria-label', 'Abrir menú');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'nav-content');
    toggle.innerHTML = '<span></span><span></span><span></span>';

    const menuRow = document.createElement('div');
    menuRow.className = 'ydg-header-menu-row-v3';
    menuRow.appendChild(menu);
    if (flags && !menu.contains(flags)) menu.appendChild(flags);

    const languageRow = document.createElement('div');
    languageRow.className = 'ydg-mobile-language-v4';
    languageRow.setAttribute('aria-label', 'Idiomas');
    nav.replaceChildren(top, languageRow, menuRow);
    top.append(brand, actions, toggle);

    // The same five real language controls stay visible on mobile.
    // Move them rather than cloning, so event handlers and active language are preserved.
    const placeLanguageStrip = () => {
      if (!flags) return;
      if (window.innerWidth <= 760) {
        if (flags.parentNode !== languageRow) languageRow.appendChild(flags);
      } else if (flags.parentNode !== menu) {
        menu.appendChild(flags);
      }
    };
    placeLanguageStrip();
    nav.classList.add('ydg-header-v3');

    const closeMenu = () => {
      header.classList.remove('ydg-mobile-menu-open-v3');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
    };
    toggle.addEventListener('click', () => {
      const open = !header.classList.contains('ydg-mobile-menu-open-v3');
      header.classList.toggle('ydg-mobile-menu-open-v3', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    links.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
    flags?.addEventListener('click', e => { if (e.target.closest('button')) closeMenu(); });
    window.addEventListener('resize', () => {
      placeLanguageStrip();
      if (window.innerWidth > 760) closeMenu();
    });

    // Logo and wordmark always return to the absolute top, not the main-content anchor.
    brand.setAttribute('href', '#');
    brand.addEventListener('click', e => {
      e.preventDefault();
      closeMenu();
      history.replaceState(null, '', location.pathname + location.search);
      window.scrollTo({ top: 0, left: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });

    const style = document.createElement('style');
    style.id = 'ydg-header-v3-style';
    style.textContent = `
      :root{scroll-padding-top:12px}
      body{padding-top:0!important}
      #ydg-site-header.aurora-header{
        position:sticky!important;top:0!important;z-index:1500!important;width:100%;
        background:rgba(5,11,21,.98)!important;
        -webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);
        border-bottom:1px solid rgba(103,232,249,.17);
        box-shadow:0 9px 28px rgba(0,0,0,.24);
      }
      #ydg-site-header .aurora-nav.ydg-header-v3{
        display:flex!important;flex-direction:column!important;align-items:stretch!important;
        gap:0!important;width:100%;max-width:1540px;margin:0 auto;
        padding:7px clamp(14px,2.2vw,30px)!important;min-height:0!important;
      }
      #ydg-site-header .ydg-header-top-v3{
        display:flex!important;align-items:center!important;justify-content:space-between!important;
        gap:18px!important;min-height:64px!important;width:100%;
      }
      #ydg-site-header .aurora-brand{flex:0 0 auto!important;min-width:0}
      #ydg-site-header .aurora-brand img{width:56px!important;height:56px!important}
      #ydg-site-header .ydg-header-actions-v3{
        display:flex!important;align-items:center!important;justify-content:flex-end!important;
        gap:10px!important;margin-left:auto!important;
      }
      #ydg-site-header .ydg-header-actions-v3 .aurora-config-direct,
      #ydg-site-header .ydg-header-actions-v3 .aurora-client{
        display:inline-flex!important;align-items:center!important;justify-content:center!important;
        white-space:nowrap!important;padding:11px 19px!important;border-radius:999px!important;
        font-size:13px!important;font-weight:850!important;line-height:1.15!important;text-decoration:none!important;
        transition:transform .2s ease,filter .2s ease,box-shadow .2s ease;
      }
      #ydg-site-header .ydg-header-actions-v3 .aurora-config-direct{
        color:#baf6ff!important;border:1px solid rgba(45,212,240,.75)!important;
        background:linear-gradient(110deg,#075985 0%,#0891b2 52%,#38bdf8 100%)!important;
        box-shadow:0 0 18px rgba(34,211,238,.16),inset 0 1px rgba(255,255,255,.16)!important;
      }
      #ydg-site-header .ydg-header-actions-v3 .aurora-client{
        color:#f7eaff!important;border:1px solid rgba(216,180,254,.66)!important;
        background:linear-gradient(110deg,#6b21a8 0%,#9333ea 52%,#db6be9 100%)!important;
        box-shadow:0 0 18px rgba(192,132,252,.18),inset 0 1px rgba(255,255,255,.18)!important;
      }
      #ydg-site-header .ydg-header-actions-v3 a:hover{transform:translateY(-1px);filter:brightness(1.1)}
      #ydg-site-header .ydg-header-menu-row-v3{
        display:flex!important;align-items:center!important;justify-content:center!important;
        width:100%;padding-top:7px;border-top:1px solid rgba(148,163,184,.12);
      }
      #ydg-site-header #nav-content{
        display:flex!important;visibility:visible!important;opacity:1!important;position:static!important;
        flex:1 1 auto!important;min-width:0!important;align-items:center!important;justify-content:center!important;
        gap:16px!important;background:transparent!important;padding:0!important;border:0!important;box-shadow:none!important;
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
      #ydg-site-header .aurora-links a:hover,#ydg-site-header .aurora-links a[aria-current]{
        background:rgba(45,212,191,.13)!important;border-color:rgba(45,212,191,.48)!important;color:#8df4ec!important;
      }
      #ydg-site-header .aurora-links a.ydg-main-about,#ydg-site-header .aurora-links a.ydg-main-wear{color:#67e8f9!important}
      #ydg-site-header .ydg-language-strip{display:flex!important;flex:0 0 auto!important;gap:5px!important}
      #ydg-site-header .lang-flag-btn{padding:4px!important}
      #ydg-site-header .lang-flag{width:20px!important;height:14px!important}
      #ydg-site-header .ydg-mobile-toggle-v3{display:none!important}
      .aurora-hero-grid .aurora-price-label{display:none!important}
      .aurora-eyebrow .ydg-eyebrow-ending{color:#22d3ee;font-weight:900}
      @media(max-width:760px){
        #ydg-site-header .aurora-nav.ydg-header-v3{padding:7px 12px 9px!important}
        #ydg-site-header .ydg-header-top-v3{min-height:48px!important;gap:10px!important}
        #ydg-site-header .aurora-brand img{width:43px!important;height:43px!important}
        #ydg-site-header .aurora-brand small{display:none!important}
        #ydg-site-header .aurora-brand .ydg-wordmark{font-size:clamp(13px,3.8vw,17px)!important}
        #ydg-site-header .ydg-header-actions-v3{
          order:3!important;width:100%!important;margin:0!important;display:flex!important;gap:9px!important;
          padding:5px 0 3px!important;
        }
        #ydg-site-header .ydg-header-actions-v3 a{flex:1 1 50%!important;padding:11px 8px!important;font-size:12px!important}
        #ydg-site-header .ydg-mobile-toggle-v3{
          display:flex!important;flex:0 0 42px!important;width:42px!important;height:40px!important;margin-left:auto!important;
          align-items:center!important;justify-content:center!important;flex-direction:column!important;gap:5px!important;
          border:1px solid rgba(103,232,249,.35)!important;border-radius:12px!important;
          background:rgba(14,35,55,.95)!important;cursor:pointer!important;
        }
        #ydg-site-header .ydg-mobile-toggle-v3 span{
          display:block!important;width:19px!important;height:2px!important;border-radius:2px!important;
          background:#8beaf3!important;transition:transform .2s ease,opacity .2s ease;
        }
        #ydg-site-header.aurora-header.ydg-mobile-menu-open-v3 .ydg-mobile-toggle-v3 span:first-child{transform:translateY(7px) rotate(45deg)}
        #ydg-site-header.aurora-header.ydg-mobile-menu-open-v3 .ydg-mobile-toggle-v3 span:nth-child(2){opacity:0}
        #ydg-site-header.aurora-header.ydg-mobile-menu-open-v3 .ydg-mobile-toggle-v3 span:last-child{transform:translateY(-7px) rotate(-45deg)}
        #ydg-site-header .ydg-header-menu-row-v3{display:none!important;padding:8px 0 3px!important;border-top:1px solid rgba(148,163,184,.13)}
        #ydg-site-header.aurora-header.ydg-mobile-menu-open-v3 .ydg-header-menu-row-v3{display:flex!important}
        #ydg-site-header #nav-content{display:flex!important;flex-direction:column!important;align-items:stretch!important;width:100%!important;gap:8px!important}
        #ydg-site-header .aurora-links{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:7px!important;white-space:normal!important;overflow:visible!important}
        #ydg-site-header .aurora-links a{text-align:center!important;padding:11px 8px!important;font-size:12px!important}
        #ydg-site-header .ydg-language-strip{justify-content:center!important;padding:4px 0!important}
        #ydg-site-header .lang-flag{width:23px!important;height:16px!important}
      }
      @media(prefers-reduced-motion:reduce){#ydg-site-header *{transition:none!important}}
      .ydg-visitor-panel{
        max-width:1080px;margin:42px auto 26px;padding:20px 24px;border:1px solid rgba(45,212,191,.28);
        border-radius:18px;background:linear-gradient(115deg,rgba(7,19,34,.98),rgba(10,27,48,.92));
        box-shadow:0 0 28px rgba(34,211,238,.07);display:flex;align-items:center;justify-content:space-between;gap:18px;
        overflow:hidden;position:relative;
      }
      .ydg-visitor-panel:before{content:'';position:absolute;left:0;right:0;top:0;height:1px;background:linear-gradient(90deg,transparent,#22d3ee,#c084fc,transparent)}
      .ydg-visitor-meta{display:flex;align-items:center;gap:13px;min-width:0}
      .ydg-visitor-icon{width:44px;height:44px;display:grid;place-items:center;border:1px solid rgba(34,211,238,.38);border-radius:12px;color:#67e8f9;background:rgba(8,145,178,.1);flex:none}
      .ydg-visitor-kicker{font-size:10px;letter-spacing:.22em;font-weight:900;color:#67e8f9}
      .ydg-visitor-sub{font-size:11px;color:#94a3b8;margin-top:4px}
      .ydg-visitor-number{font:900 clamp(24px,4vw,34px)/1 ui-monospace,monospace;letter-spacing:.08em;color:#d8faff;text-shadow:0 0 15px rgba(34,211,238,.4);white-space:nowrap}
      .ydg-visitor-live{font-size:9px;letter-spacing:.16em;color:#a7f3d0;display:flex;align-items:center;gap:7px;justify-content:flex-end;margin-top:7px}
      .ydg-visitor-dot{width:7px;height:7px;border-radius:50%;background:#34d399;box-shadow:0 0 10px #34d399;animation:ydgVisitorPulse 1.6s infinite}
      .ydg-visitor-scan{height:2px;width:100%;max-width:210px;margin-top:8px;background:linear-gradient(90deg,transparent,#22d3ee,transparent);background-size:200% 100%;animation:ydgVisitorScan 2.4s linear infinite}
      @keyframes ydgVisitorPulse{50%{opacity:.35;box-shadow:0 0 3px #34d399}}
      @keyframes ydgVisitorScan{to{background-position:-200% 0}}
      @media(max-width:560px){.ydg-visitor-panel{margin:28px 14px 20px;padding:16px;gap:10px}.ydg-visitor-sub{max-width:180px}.ydg-visitor-number{font-size:24px}}
      @media(prefers-reduced-motion:reduce){.ydg-visitor-dot,.ydg-visitor-scan{animation:none!important}}
    `;
    style.textContent += `
      /* Final navigation cleanup */
      @media(min-width:761px){
        #ydg-site-header.aurora-header{
          position:fixed!important;top:0!important;left:0!important;right:0!important;
          width:100%!important;max-width:none!important;z-index:9999!important;
        }
        #ydg-site-header .aurora-nav,
        #ydg-site-header .ydg-header-menu-row-v3,
        #ydg-site-header #nav-content,
        #ydg-site-header .aurora-links{
          overflow:visible!important;overflow-x:visible!important;overflow-y:visible!important;
        }
        #ydg-site-header .aurora-links{flex-wrap:nowrap!important}
      }
      #ydg-site-header,
      #ydg-site-header .aurora-nav,
      #ydg-site-header .ydg-header-menu-row-v3,
      #ydg-site-header #nav-content{
        scrollbar-width:none!important;
      }
      #ydg-site-header::-webkit-scrollbar,
      #ydg-site-header .aurora-nav::-webkit-scrollbar,
      #ydg-site-header #nav-content::-webkit-scrollbar,
      #ydg-site-header .aurora-links::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}
      html,body{overflow-x:hidden!important}
      html{scroll-padding-top:calc(var(--ydg-header-height,110px) + 12px)!important}
      main section[id]{scroll-margin-top:calc(var(--ydg-header-height,110px) + 12px)!important}
      /* FAQ: remove the redundant grey chevron; keep the right-hand plus control */
      #faq .faq-question .faq-icon,
      #faq .faq-question svg{display:none!important}
      #faq .faq-question{justify-content:flex-start!important}
    `;
    style.textContent += "\n      /* Mobile V4: avoid competing fixed/grids and give every control a dedicated row.\n         Overrides legacy responsive CSS loaded ahead of this stylesheet. */\n      @media(max-width:760px){\n        html body #ydg-site-header.aurora-header{\n          position:sticky!important;top:0!important;left:auto!important;right:auto!important;\n          width:100%!important;max-width:100%!important;z-index:9999!important;\n          padding:0!important;margin:0!important;overflow:visible!important;\n          background:rgba(5,11,21,.98)!important;\n        }\n        html body{padding-top:0!important;overflow-x:clip!important}\n        html body #ydg-site-header .aurora-nav.ydg-header-v3{\n          display:flex!important;flex-direction:column!important;align-items:stretch!important;\n          flex-wrap:nowrap!important;gap:0!important;width:100%!important;\n          padding:6px 12px 8px!important;margin:0!important;\n          grid-template-columns:none!important;\n        }\n        html body #ydg-site-header .ydg-header-top-v3{\n          display:grid!important;grid-template-columns:minmax(0,1fr) 44px!important;\n          grid-template-rows:auto auto!important;align-items:center!important;\n          gap:7px 9px!important;min-height:0!important;width:100%!important;\n        }\n        html body #ydg-site-header .ydg-header-top-v3 .aurora-brand{\n          grid-column:1!important;grid-row:1!important;\n          display:flex!important;align-items:center!important;min-width:0!important;\n          max-width:100%!important;overflow:hidden!important;white-space:nowrap!important;\n          margin:0!important;order:initial!important;\n        }\n        html body #ydg-site-header .ydg-header-top-v3 .aurora-brand img{\n          flex:0 0 40px!important;width:40px!important;height:40px!important;\n        }\n        html body #ydg-site-header .ydg-header-top-v3 .aurora-brand>span{\n          min-width:0!important;max-width:100%!important;overflow:hidden!important;\n          text-overflow:ellipsis!important;display:block!important;\n        }\n        html body #ydg-site-header .aurora-brand .ydg-wordmark{\n          display:block!important;font-size:clamp(13px,3.7vw,17px)!important;\n          line-height:1.2!important;white-space:nowrap!important;\n        }\n        html body #ydg-site-header .ydg-header-top-v3 .ydg-mobile-toggle-v3{\n          grid-column:2!important;grid-row:1!important;display:flex!important;\n          position:static!important;order:initial!important;margin:0!important;\n          width:44px!important;min-width:44px!important;height:44px!important;\n          flex:0 0 44px!important;justify-self:end!important;\n          align-items:center!important;justify-content:center!important;\n          border:1px solid rgba(103,232,249,.4)!important;\n          border-radius:12px!important;background:#10273d!important;\n          color:#d3faff!important;visibility:visible!important;opacity:1!important;\n          cursor:pointer!important;z-index:2!important;\n        }\n        html body #ydg-site-header .ydg-header-top-v3 .ydg-header-actions-v3{\n          grid-column:1/-1!important;grid-row:2!important;\n          display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;\n          width:100%!important;min-width:0!important;margin:0!important;\n          padding:0!important;gap:8px!important;order:initial!important;\n        }\n        html body #ydg-site-header .ydg-header-actions-v3 a.aurora-config-direct,\n        html body #ydg-site-header .ydg-header-actions-v3 a.aurora-client{\n          display:flex!important;box-sizing:border-box!important;min-width:0!important;\n          width:100%!important;max-width:100%!important;min-height:42px!important;\n          padding:9px 7px!important;margin:0!important;white-space:normal!important;\n          text-align:center!important;font-size:clamp(10px,2.85vw,12px)!important;\n          line-height:1.2!important;overflow-wrap:anywhere!important;\n          border-radius:11px!important;\n        }\n        html body #ydg-site-header .ydg-mobile-language-v4{\n          display:flex!important;justify-content:center!important;align-items:center!important;\n          width:100%!important;min-width:0!important;max-width:100%!important;\n          padding:5px 0 2px!important;margin:0!important;\n          border-bottom:1px solid rgba(103,232,249,.13)!important;\n        }\n        html body #ydg-site-header .ydg-mobile-language-v4 #ydg-language-strip{\n          display:flex!important;justify-content:center!important;align-items:center!important;\n          flex-wrap:nowrap!important;gap:clamp(5px,2.4vw,12px)!important;\n          width:auto!important;max-width:100%!important;margin:0!important;padding:0!important;\n          background:transparent!important;\n        }\n        html body #ydg-site-header .ydg-mobile-language-v4 .lang-flag-btn{\n          display:flex!important;align-items:center!important;justify-content:center!important;\n          flex:0 0 36px!important;width:36px!important;min-width:36px!important;\n          height:29px!important;padding:4px!important;visibility:visible!important;\n        }\n        html body #ydg-site-header .ydg-mobile-language-v4 .lang-flag{\n          width:25px!important;height:17px!important;max-width:25px!important;\n        }\n        html body #ydg-site-header .ydg-header-menu-row-v3{\n          display:flex!important;position:static!important;width:100%!important;\n          min-width:0!important;max-width:100%!important;overflow:visible!important;\n          padding:6px 0 0!important;margin:0!important;border:0!important;\n          background:transparent!important;\n        }\n        html body #ydg-site-header #nav-content,\n        html body #ydg-site-header #nav-content.hidden{\n          display:flex!important;position:static!important;visibility:visible!important;\n          opacity:1!important;transform:none!important;width:100%!important;min-width:0!important;\n          flex:1 1 auto!important;max-width:100%!important;gap:0!important;\n          padding:0!important;margin:0!important;background:transparent!important;\n          border:0!important;box-shadow:none!important;\n        }\n        html body #ydg-site-header .aurora-links{\n          display:flex!important;flex-wrap:nowrap!important;justify-content:flex-start!important;\n          align-items:center!important;gap:7px!important;white-space:nowrap!important;\n          grid-template-columns:none!important;overflow-x:auto!important;overflow-y:hidden!important;\n          scrollbar-width:none!important;-webkit-overflow-scrolling:touch!important;\n          width:100%!important;min-width:0!important;max-width:100%!important;\n          scroll-snap-type:x proximity!important;padding:1px 0 4px!important;\n        }\n        html body #ydg-site-header .aurora-links::-webkit-scrollbar{display:none!important}\n        html body #ydg-site-header .aurora-links a{\n          display:flex!important;flex:0 0 auto!important;align-items:center!important;\n          justify-content:center!important;min-height:38px!important;\n          white-space:nowrap!important;font-size:11px!important;\n          line-height:1.1!important;padding:9px 12px!important;\n          margin:0!important;scroll-snap-align:start!important;\n        }\n        html body #ydg-site-header.ydg-mobile-menu-open-v3 .ydg-header-menu-row-v3{\n          background:#08192b!important;border:1px solid rgba(103,232,249,.3)!important;\n          padding:10px!important;border-radius:13px!important;\n        }\n        html body #ydg-site-header.ydg-mobile-menu-open-v3 .aurora-links{\n          display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;\n          gap:8px!important;overflow:visible!important;white-space:normal!important;\n          max-height:min(47dvh,410px)!important;overflow-y:auto!important;\n          scroll-snap-type:none!important;\n        }\n        html body #ydg-site-header.ydg-mobile-menu-open-v3 .aurora-links a{\n          white-space:normal!important;text-align:center!important;\n          width:100%!important;min-width:0!important;overflow-wrap:anywhere!important;\n          font-size:12px!important;padding:11px 8px!important;\n        }\n      }\n      @media(max-width:360px){\n        html body #ydg-site-header .aurora-nav.ydg-header-v3{padding-left:8px!important;padding-right:8px!important}\n        html body #ydg-site-header .ydg-header-actions-v3 a.aurora-config-direct,\n        html body #ydg-site-header .ydg-header-actions-v3 a.aurora-client{font-size:10px!important}\n        html body #ydg-site-header .ydg-mobile-language-v4 .lang-flag-btn{\n          flex-basis:32px!important;width:32px!important;min-width:32px!important;\n        }\n      }\n      @media(min-width:761px){html body #ydg-site-header .ydg-mobile-language-v4{display:none!important}}\n";
    style.textContent += "\n      /* Mobile V5: compact 3-column navigation, no horizontal clipping. */\n      @media(max-width:760px){\n        html body #ydg-site-header .ydg-header-menu-row-v3,\n        html body #ydg-site-header.ydg-mobile-menu-open-v3 .ydg-header-menu-row-v3 {\n          display:block!important;width:100%!important;max-width:100%!important;\n          padding:7px 0 2px!important;margin:0!important;\n          border:0!important;background:transparent!important;\n        }\n        html body #ydg-site-header .aurora-links,\n        html body #ydg-site-header.ydg-mobile-menu-open-v3 .aurora-links {\n          display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;\n          grid-auto-flow:row!important;align-items:stretch!important;\n          gap:7px!important;max-height:none!important;overflow:visible!important;\n          scroll-snap-type:none!important;white-space:normal!important;\n          width:100%!important;max-width:100%!important;min-width:0!important;\n          padding:0!important;margin:0!important;\n        }\n        html body #ydg-site-header .aurora-links a,\n        html body #ydg-site-header.ydg-mobile-menu-open-v3 .aurora-links a{\n          display:flex!important;align-items:center!important;justify-content:center!important;\n          width:100%!important;min-width:0!important;max-width:100%!important;\n          min-height:40px!important;padding:9px 5px!important;\n          white-space:normal!important;overflow-wrap:break-word!important;\n          text-align:center!important;font-size:clamp(10px,2.9vw,12px)!important;\n          line-height:1.2!important;border-radius:10px!important;\n          margin:0!important;\n        }\n        /* Seventh navigation destination stays available, centered as a full-width tile. */\n        html body #ydg-site-header .aurora-links a:nth-child(7):last-child{\n          grid-column:1/-1!important;\n        }\n      }\n";
    document.head.appendChild(style);

    // Honest local counter: increments once per new browser session on this device.
    // Replace with a shared analytics counter when a site-wide provider is connected.
    const storageKey = 'ydg_local_visit_sequence_v1';
    let count = 1;
    try {
      count = Number(localStorage.getItem(storageKey) || '0');
      if (!sessionStorage.getItem('ydg_counted_this_session')) {
        count += 1;
        localStorage.setItem(storageKey, String(count));
        sessionStorage.setItem('ydg_counted_this_session', '1');
      }
      if (!Number.isFinite(count) || count < 1) count = 1;
    } catch (_) { count = 1; }

    if (!document.querySelector('.ydg-visitor-panel')) {
      const panel = document.createElement('section');
      panel.className = 'ydg-visitor-panel';
      panel.setAttribute('aria-label','Contador visual de visitas');
      panel.innerHTML = `
        <div class="ydg-visitor-meta">
          <div class="ydg-visitor-icon" aria-hidden="true">⌁</div>
          <div><div class="ydg-visitor-kicker">YDG // LIVE TRAFFIC SCAN</div>
          <div class="ydg-visitor-sub">Actividad de navegación · contador local de este dispositivo</div>
          <div class="ydg-visitor-scan" aria-hidden="true"></div></div>
        </div>
        <div style="text-align:right;flex:none">
          <div class="ydg-visitor-kicker">VISITANTE Nº</div>
          <div class="ydg-visitor-number" data-ydg-visitor-number>000001</div>
          <div class="ydg-visitor-live"><span class="ydg-visitor-dot"></span> SYSTEM ONLINE</div>
        </div>`;
      const footer = document.querySelector('footer');
      if (footer) footer.parentNode.insertBefore(panel, footer);
      else document.body.appendChild(panel);
      const number = panel.querySelector('[data-ydg-visitor-number]');
      const target = String(count).padStart(6,'0');
      const end = Number(target);
      const duration = 900;
      const begin = performance.now();
      const animate = now => {
        const p = Math.min(1,(now-begin)/duration);
        const eased = 1-Math.pow(1-p,3);
        number.textContent = String(Math.floor(end*eased)).padStart(6,'0');
        if (p<1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }

    // Keep document flow intact while the desktop header is fixed to the viewport.
    let headerSpacer = document.getElementById('ydg-header-fixed-spacer');
    if (!headerSpacer) {
      headerSpacer = document.createElement('div');
      headerSpacer.id = 'ydg-header-fixed-spacer';
      headerSpacer.setAttribute('aria-hidden','true');
      header.parentNode.insertBefore(headerSpacer,header);
    }

    // Recalculate anchor offsets using the actual header height.
    const measure = () => {
      const h = Math.ceil(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--ydg-header-height',h+'px');
      headerSpacer.style.height = '0px';
      headerSpacer.style.display = 'none';
      document.querySelectorAll('main section[id]').forEach(el => { el.style.scrollMarginTop = (h+12)+'px'; });
    };
    measure();
    if ('ResizeObserver' in window) new ResizeObserver(measure).observe(header);
    else window.addEventListener('resize',measure);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
