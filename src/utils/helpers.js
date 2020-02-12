const breakpoint = {
  is(query) {
    const size = query.trim()
    const sizes = {
      xxs: '375px',
      xs: '520px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1440px',
      xxl: '1920px',
      xxxl: '2550px'
    }

    if (Object.prototype.hasOwnProperty.call(sizes, size)) {
      return window.matchMedia(`only screen and (min-width: ${sizes[size]})`).matches
    }

    throw new ReferenceError(
      `The size ${size} is not a valid breakpoint in: ${JSON.stringify(sizes)}`
    )
  }
}

function linkResolver(doc) {
  switch (doc.type) {
    case 'page':
      return doc.uid === 'home' ? '/' : `/${doc.uid}`
    case 'post':
      return `/posts/${doc.uid}`
    default:
      return `/${doc.uid}`
  }
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export {
  breakpoint,
  linkResolver,
  isObjectEmpty
}
