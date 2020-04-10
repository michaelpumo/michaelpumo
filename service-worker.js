const version = '1.0.3'
const cacheName = `app-${version}`

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/'
      ])
        .then(() => self.skipWaiting())
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          return caches.delete(key)
        }
      }))
    })
  )
})
