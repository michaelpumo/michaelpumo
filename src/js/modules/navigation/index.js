import jump from 'jump.js'

function toggle () {
  const html = document.querySelector('html')
  html.classList.toggle('has-navigation')
}

function activate () {
  const navButton = document.querySelector('#navigation-activate')

  if (!navButton) {
    return
  }

  navButton.addEventListener('click', () => {
    toggle()
  })
}

/* eslint-disable no-mixed-operators */
/* eslint-disable no-cond-assign */
function easeInOutExpo (t, b, c, d) {
  if (t === 0) return b
  if (t === d) return b + c
  if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b
  return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
}
/* eslint-enable no-mixed-operators */
/* eslint-enable no-cond-assign */

function jumpTo (selector) {
  const html = document.querySelector('html')
  jump(selector, {
    duration: 500,
    easing: easeInOutExpo,
    callback: () => {
      if (html.classList.contains('has-navigation')) {
        toggle()
      }
    }
  })
}

function links () {
  const scrollLinks = document.querySelectorAll('[data-scroll]')
  Array.from(scrollLinks).forEach(scrollLink => {
    scrollLink.addEventListener('click', (e) => {
      e.preventDefault()
      jumpTo(scrollLink.getAttribute('href'))
    })
  })
}

function init () {
  activate()
  links()
}

export default init
