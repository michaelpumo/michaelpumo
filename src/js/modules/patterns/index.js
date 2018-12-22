import { randNumber, normalizeNumber, degToRad } from '../../utilities/helpers'
import settings from '../../utilities/settings'

class Confetti {
  constructor (selector = 'canvas', color = false, animated = false) {
    this.color = color
    this.animated = animated
    this.amount = (window.innerWidth * window.innerHeight) / (window.innerWidth / 0.06)
    this.width = 6
    this.height = 60
    this.shapes = []
    this.animationFrame = null
    this.playing = true
    this.canvas = document.querySelector(selector)
    this.ctx = this.canvas.getContext('2d')
  }

  drawShape (shape) {
    const shapeX = (shape.width / 2) + shape.x
    const shapeY = (shape.height / 2) + shape.y

    this.ctx.save()
    this.ctx.translate(shapeX, shapeY)
    this.ctx.scale(shape.scale, shape.scale)
    this.ctx.rotate(degToRad(shape.rotate))
    this.ctx.fillStyle = shape.colour
    this.ctx.fillRect(-Math.abs(shape.width / 2), -Math.abs(shape.height / 2), shape.width, shape.height)
    this.ctx.restore()
  }

  setShape (shape, index) {
    const ySpeed = (shape.scale / 4)
    const rSpeed = (shape.scale / 4)

    if (index % 2) {
      shape.rotate = shape.rotate += rSpeed
    } else {
      shape.rotate = shape.rotate -= rSpeed
    }

    if (shape.y > this.canvas.height) {
      shape.y = -Math.abs(shape.height)
      shape.x = randNumber(0, this.canvas.width)
    } else {
      shape.y = shape.y += ySpeed
    }
  }

  placeShapes () {
    if (!this.playing) {
      this.animationFrame = window.requestAnimationFrame(this.placeShapes.bind(this))
      return
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.shapes.forEach((shape, index) => {
      this.drawShape(shape)
      this.setShape(shape, index)
    })

    if (!this.animated) {
      return
    }

    this.animationFrame = window.requestAnimationFrame(this.placeShapes.bind(this))
  }

  createShapes () {
    for (let i = 0; i < this.amount; i += 1) {
      const shapeEl = {
        width: this.width,
        height: this.height,
        x: randNumber(-Math.abs(this.width), window.innerWidth),
        y: randNumber(-Math.abs(this.height), window.innerHeight),
        colour: (this.color) ? settings.colors.find(item => item.name === this.color).value : settings.colors[randNumber(0, settings.colors.length - 1)].value,
        scale: (i % 15) ? normalizeNumber(randNumber(1, 10), 0, 10) : 1.5,
        rotate: randNumber(0, 360),
        xSpeed: randNumber(0, 2)
      }
      this.shapes.push(shapeEl)
    }
    this.placeShapes()
  }

  setCanvasSize () {
    this.canvas.setAttribute('width', window.innerWidth)
    this.canvas.setAttribute('height', window.innerHeight)
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.placeShapes()
  }

  setEvents () {
    // window.addEventListener('resize', () => {
    //   window.cancelAnimationFrame(this.animationFrame)
    //   this.setCanvasSize()
    // })
    this.canvas.addEventListener('click', () => {
      this.playing = !this.playing
    })

    document.addEventListener('visibilitychange', () => {
      this.playing = Boolean(document.visibilityState === 'visible')
    })
  }

  init () {
    this.setEvents()
    this.setCanvasSize()
    this.createShapes()
  }
}

export default Confetti
