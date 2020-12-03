const version = '2.0.0'
const cacheName = `app-${version}`

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(['/']).then(() => self.skipWaiting())
    })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.forEach((key) => {
          if (key !== cacheName) {
            return caches.delete(key)
          }
        })
      )
    })
  )
})
