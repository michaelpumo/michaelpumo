import Vue from 'vue'
import anime from 'animejs'

function doJump(e) {
  e.preventDefault()

  const { identifier, duration, offset, callback, container, easing } = e.target

  if (!identifier.length) {
    return
  }

  const place = document.querySelector(`#${identifier}`)
  const scrollable = document.querySelector(`#${container}`)

  if (!place || !scrollable) {
    return
  }

  // const scrollElement = window.document.scrollingElement || window.document.body || window.document.documentElement

  place.style.position = 'static'

  window.requestAnimationFrame(() => {
    anime({
      targets: scrollable,
      scrollTop: place.offsetTop + offset,
      duration,
      easing,
      complete() {
        callback()
      },
    })
    place.style.removeProperty('position')
  })

  return false
}

const defaults = {
  id: '',
  duration: 500,
  offset: 0,
  callback: () => ({}),
  container: 'Page',
  easing: 'easeInOutQuad',
}

const jumpTo = {
  bind: (el, binding) => {
    const properties = {
      ...defaults,
      ...binding.value,
    }

    el.identifier = properties.id
    el.duration = properties.duration
    el.offset = properties.offset
    el.callback = properties.callback
    el.container = properties.container
    el.easing = properties.easing

    el.addEventListener('click', doJump)
  },
  update(el, binding) {
    const properties = {
      ...defaults,
      ...binding.value,
    }

    el.identifier = properties.id
    el.duration = properties.duration
    el.offset = properties.offset
    el.callback = properties.callback
    el.container = properties.container
    el.easing = properties.easing
  },
  unbind: (el) => {
    el.removeEventListener('click', doJump)
  },
}

Vue.directive('jump-to', jumpTo)
