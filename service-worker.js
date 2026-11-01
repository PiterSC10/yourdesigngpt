const CACHE='ydg-v125-network-navigation';
const ASSETS=["./ydg01-jump-08.png","./electricista.html","./ydg01-idle-01.png","./ydg01-jump-07.png","./jetski-gallery-4.webp","./ydg01-jump-05.png","./ydg01-wave-06.png","./favicon-16x16.png","./ydg01-idle-02.png","./ydg01-wave-04.png","./ydg01-wave-03.png","./restaurante.html","./favicon-32x32.png","./jetski-hero-final.webp","./ydg01-wave-07.png","./ydg01-jump-01.png","./webpersonal.html","./ydg01-jump-02.png","./jetski-sunset.webp","./promo-final.css","./ydg01-idle-04.png","./robot-widget.css","./compact-final.css","./ydg01-run-02.png","./jetski-portfolio-cover.webp","./fontanero.html","./jetski-gallery-1.webp","./ydg01-run-03.png","./ydg01-run-01.png","./site.webmanifest","./jetski-ride.webp","./ydg01-wave-01.png","./hotelmalaga.html","./ydg01-jump-10.png","./jetski-hero.webp","./ydg-demo-nav.js","./jetski-tour.webp","./ydg01-jump-04.png","./ibiza-jetski.html","./jetski-group.webp","./ydg01-run-05.png","./ydg01-idle-05.png","./ydg01-clean-v106.png","./favicon.png","./ydg01-run-06.png","./jetski-gallery-3.webp","./estetica.html","./ydg01-wave-02.png","./jetski-gallery-2.webp","./robot-widget.js","./android-chrome-512x512.png","./promo-manager.js","./ydg01-clean-thumb-v106.png","./apple-touch-icon.png","./ydg01-wave-08.png","./ydg01-jump-06.png","./ydg01-run-04.png","./ydg01-wave-05.png","./android-chrome-192x192.png","./ydg01-jump-03.png","./ydg01-idle-03.png","./ydg01-jump-09.png"];
self.addEventListener('install',event=>event.waitUntil((async()=>{try{const cache=await caches.open(CACHE);await cache.addAll(ASSETS)}catch(error){} await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));await self.clients.claim()})()));
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin)return;
 if(request.mode==='navigate'||url.pathname.endsWith('/index.html')||url.pathname==='/'){
  event.respondWith(fetch(request,{cache:'no-store'}));
  return;
 }
 event.respondWith(fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy))}return response}).catch(()=>caches.match(request)));
});