function serviceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js', { scope: '/' })
      .then((registration) => {
        console.log('Service Worker Registered')
      })

    navigator.serviceWorker.ready.then((registration) => {
      console.log('Service Worker Ready')
    })
  }
}

export { serviceWorker }
