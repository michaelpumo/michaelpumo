function init () {
  window.addEventListener('load', () => {
    window.setTimeout(() => {
      const html = document.querySelector('html')
      html.classList.remove('is-loading')
    }, 500)
  })
}

export default init
