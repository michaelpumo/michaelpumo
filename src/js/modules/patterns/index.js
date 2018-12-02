import { randNumber, normalizeNumber, degToRad } from '../../utilities/helpers'
import settings from '../../utilities/settings'

function confetti (selector = 'canvas', color = false, animated = false) {
  const canvas = document.querySelector(selector)
  const ctx = canvas.getContext('2d')
  const options = {
    items: () => (window.innerWidth * window.innerHeight) / (window.innerWidth / 0.06),
    width: 6,
    height: 60,
    colours: settings.colors
  }
  const shapes = []
  let animationFrame = null

  function drawShape (shape) {
    const shapeX = (shape.width / 2) + shape.x
    const shapeY = (shape.height / 2) + shape.y

    ctx.save()
    ctx.translate(shapeX, shapeY)
    ctx.scale(shape.scale, shape.scale)
    ctx.rotate(degToRad(shape.rotate))
    ctx.fillStyle = shape.colour
    ctx.fillRect(-Math.abs(shape.width / 2), -Math.abs(shape.height / 2), shape.width, shape.height)
    ctx.restore()
  }

  function setShape (shape, index) {
    const ySpeed = (shape.scale / 4)
    const rSpeed = (shape.scale / 4)

    if (index % 2) {
      shape.rotate = shape.rotate += rSpeed
    } else {
      shape.rotate = shape.rotate -= rSpeed
    }

    if (shape.y > canvas.height) {
      shape.y = -Math.abs(shape.height)
      shape.x = randNumber(0, canvas.width)
    } else {
      shape.y = shape.y += ySpeed
      // if (index % 2) {
      //   shape.x = shape.x += shape.xSpeed;
      // } else {
      //   shape.x = shape.x -= shape.xSpeed;
      // }
    }
  }

  function placeShapes () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    shapes.forEach((shape, index) => {
      drawShape(shape)
      setShape(shape, index)
    })

    if (!animated) {
      return
    }

    animationFrame = window.requestAnimationFrame(placeShapes)
  }

  function createShapes () {
    for (let i = 0; i < options.items(); i += 1) {
      const shapeEl = {
        width: options.width,
        height: options.height,
        x: randNumber(-Math.abs(options.width), window.innerWidth),
        y: randNumber(-Math.abs(options.height), window.innerHeight),
        colour: (color) ? options.colours.find(item => item.name === color).value : options.colours[randNumber(0, options.colours.length - 1)].value,
        scale: (i % 15) ? normalizeNumber(randNumber(1, 10), 0, 10) : 1.5,
        rotate: randNumber(0, 360),
        xSpeed: randNumber(0, 2)
      }
      shapes.push(shapeEl)
    }
    placeShapes()
  }

  function setCanvasSize () {
    canvas.setAttribute('width', window.innerWidth)
    canvas.setAttribute('height', window.innerHeight)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    placeShapes()
  }

  window.addEventListener('resize', () => {
    window.cancelAnimationFrame(animationFrame)
    setCanvasSize()
  })

  function init () {
    setCanvasSize()
    createShapes()
  }

  init()
}

export default confetti
