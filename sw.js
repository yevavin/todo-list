const staticCacheName = 's-app-v1'
let cache = null

// const assetUrls = [
//   'index.html',
//   'main.js',
//   'css/style.css'
// ]

self.addEventListener('install', async event => {
  cache = await caches.open(staticCacheName);
//  await cache.addAll(assetUrls);
})

self.addEventListener('activate', async event => {
  console.log("SW: activate")
})

self.addEventListener('fetch', async event => {
  event.respondWith(cacheFirst(event.request))
})

async function cacheFirst(request) {
  let cached = await caches.match(request)
  if (!cached) {
    cached = await fetch(request)
    await cache.add(request.url)
  }
  return cached
} 