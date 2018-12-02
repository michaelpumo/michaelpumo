import { isElementInViewport } from '../../utilities/helpers'

let elements

function isInView () {
  if (!elements) {
    return
  }

  Array.from(elements).forEach(element => {
    if (isElementInViewport(element)) {
      element.classList.add('is-inview')
    }
  })
}

function init () {
  const elementsStore = document.querySelectorAll('[data-inview]')

  if (!elementsStore) {
    return
  }

  elements = elementsStore
  isInView()
}

window.addEventListener('scroll', () => {
  isInView()
})

export default init
