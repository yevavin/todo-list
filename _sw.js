const staticCacheName = 's-cache-v2'
const dynamicCacheName = 'd-cache-v1'

const assetUrls = [
  './',
  './index.html',
  './offline.html',
  './main.js',
  './css/style.css'
]

self.addEventListener('install', async event => {
  cache = await caches.open(staticCacheName);
//  await cache.addAll(assetUrls);
})

self.addEventListener('activate', async event => {

  // Keeping the last site version

  const cashesKeys = await caches.keys();
  const checkKeys = cashesKeys.map(async key => {
    if (staticCacheName !== key) {
      await caches.delete(key);
    }
  });
  await Promise.all(checkKeys);
  console.log("SW: activate");
})

self.addEventListener('fetch', async event => {
  console.log(`Trying to fetch ${event.request.url}`);
  event.respondWith(checkCache(event.request));
});

async function checkCache(req) {
  const cachedResponse = await caches.match(req);
  return cachedResponse || checkOnline(req);
}

async function checkOnline(req) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const res = await fetch(req);
    await cache.put(req, res.clone());
    return res;
  } catch (error) {
    const cachedRes = await cache.match(req);
    return cachedRes
     ? cachedRes
     : caches.match('./offline.html');
  }
}