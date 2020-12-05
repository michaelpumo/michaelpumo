function serviceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
    // .then((registration) => {
    // })

    // navigator.serviceWorker.ready.then((registration) => {
    // })
  }
}

export { serviceWorker }
