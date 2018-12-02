function domReady (fn) {
  if (document.readyState !== 'loading') {
    fn()
    return
  }
  document.addEventListener('DOMContentLoaded', fn)
}

function randNumber (from, to) {
  // return Math.floor(Math.random() * to) + from;
  return Math.floor(Math.random() * ((to - from) + 1)) + from
}

function normalizeNumber (val, min, max) {
  return (val - min) / (max - min)
}

function degToRad (degrees) {
  return degrees * (Math.PI / 180)
}

function isElementInViewport (el) {
  const rect = el.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export { domReady, randNumber, normalizeNumber, degToRad, isElementInViewport }
