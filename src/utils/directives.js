import jump from 'jump.js'

function doJump(e) {
  e.preventDefault()

  const { identifier, duration, offset, callback } = e.target

  if (!identifier.length) {
    return
  }

  const place = document.querySelector(`#${identifier}`)

  if (!place) {
    return
  }

  place.style.position = 'static'

  window.requestAnimationFrame(() => {
    jump(place, {
      duration,
      offset,
      callback: () => {
        callback()
      }
    })
    place.style.removeProperty('position')
  })

  return false
}

const defaults = {
  id: '',
  duration: 500,
  offset: 0,
  callback: () => {}
}

const jumpTo = {
  bind: (el, binding) => {
    const properties = {
      ...defaults,
      ...binding.value
    }

    el.identifier = properties.id
    el.duration = properties.duration
    el.offset = properties.offset
    el.callback = properties.callback

    el.addEventListener('click', doJump)
  },
  update(el, binding) {
    const properties = {
      ...defaults,
      ...binding.value
    }

    el.identifier = properties.id
    el.duration = properties.duration
    el.offset = properties.offset
    el.callback = properties.callback
  },
  unbind: (el) => {
    el.removeEventListener('click', doJump)
  }
}

export {
  jumpTo
}
