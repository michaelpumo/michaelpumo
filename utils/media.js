const media = {
  sizes: {
    xxs: 375,
    xs: 520,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1440,
    xxl: 1920,
    xxxl: 2550,
  },
  is(query, range = 'min') {
    const size = query.trim()

    if (Object.prototype.hasOwnProperty.call(this.sizes, size)) {
      if (range === 'min') {
        return window.matchMedia(
          `only screen and (min-width: ${this.sizes[size]}px)`
        ).matches
      }

      return window.matchMedia(
        `only screen and (max-width: ${this.sizes[size] - 1}px)`
      ).matches
    }

    throw new ReferenceError(
      `The size ${size} is not a valid breakpoint in: ${JSON.stringify(
        this.sizes
      )}`
    )
  },
}

export { media }
