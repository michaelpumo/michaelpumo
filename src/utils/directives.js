import jump from 'jump.js'

function doJump(e) {
  e.preventDefault()

  const { identifier, duration, offset } = e.target

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
      offset
    })
    place.style.removeProperty('position')
  })

  return false
}

const defaults = {
  id: '',
  duration: 500,
  offset: 0
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
  },
  unbind: (el) => {
    el.removeEventListener('click', doJump)
  }
}

export {
  jumpTo
}
