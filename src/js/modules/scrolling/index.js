const html = document.querySelector('html')
let lastPosition = 0

function getCurrentPosition () {
  let currentPosition = window.pageYOffset || document.documentElement.scrollTop
  currentPosition = (currentPosition < 0) ? 0 : currentPosition
  return currentPosition
}

function init () {
  const currentPosition = getCurrentPosition()

  if (currentPosition > lastPosition && lastPosition > 1) {
    html.classList.remove('is-scrolling-up')
    html.classList.add('is-scrolling-down')
  } else {
    html.classList.remove('is-scrolling-down')
    html.classList.add('is-scrolling-up')
  }

  if (window.pageYOffset > 0) {
    html.classList.add('has-scrolled-down')
  } else {
    html.classList.remove('has-scrolled-down')
  }

  // Here we have to check if we're at the bottom of the page.
  // If we are, simply assign lastPosition to its own value, or else the currentPosition.
  // This is due to Safari having an 'overscroll' effect that means we are always going 'up' if we hit the bottom.
  lastPosition = ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) ? lastPosition : currentPosition
}

window.addEventListener('scroll', () => {
  init()
})

export default init
