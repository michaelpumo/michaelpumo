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

  // const bodyRect = document.body.getBoundingClientRect()
  // const yar = (place.offsetTop + window.scrollY) - bodyRect.top
  // console.log(yar)
  // console.dir(place)
  // e.target.style.pointerEvents = 'none'

  jump(place, {
    duration: duration
    // offset: -Math.abs(window.scrollY)
    // offset: Math.abs(offset + a)
    // callback: () => {
    //   console.log('callbaaa')
    //   e.target.style.pointerEvents = 'auto'
    // }
  })

  return false
}

const defaults = {
  id: '',
  duration: 300,
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
