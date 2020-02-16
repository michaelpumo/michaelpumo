function slugify(text) {
  const special = 'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;'
  const ordinary = 'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------'
  const p = new RegExp(special.split('').join('|'), 'g')

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(p, (c) => ordinary.charAt(special.indexOf(c)))
    .replace(/&/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
    .trim()
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

function randId() {
  return Math.random()
    .toString(36)
    .substring(2, 15)
}

function vh() {
  console.log('Call vh')
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

export {
  slugify,
  linkResolver,
  isObjectEmpty,
  randId,
  vh
}
