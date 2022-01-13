function slugify(text) {
  const special =
    'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;'
  const ordinary =
    'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------'
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
  if (typeof obj !== 'object' || obj === null) {
    return true
  }

  return Object.keys(obj).length === 0 && obj.constructor === Object
}

function randId() {
  return Math.random().toString(36).substring(2, 15)
}

function vh() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

function meta(obj) {
  return {
    title: obj.meta_title,
    meta: [
      {
        name: 'description',
        content: obj.meta_description || '',
      },
      {
        name: 'keywords',
        content: obj.meta_keywords || '',
      },
      {
        name: 'author',
        content: obj.meta_author || '',
      },
      {
        property: 'og:title',
        content: obj.meta_title || '',
      },
      {
        property: 'og:description',
        content: obj.meta_description || '',
      },
      {
        property: 'og:image',
        content:
          obj.meta_image &&
          Object.prototype.hasOwnProperty.call(obj.meta_image, 'url')
            ? obj.meta_image.url
            : null,
      },
      {
        property: 'twitter:title',
        content: obj.meta_title || '',
      },
      {
        property: 'twitter:description',
        content: obj.meta_description || '',
      },
      {
        property: 'twitter:image:src',
        content:
          obj.meta_image &&
          Object.prototype.hasOwnProperty.call(obj.meta_image, 'url')
            ? obj.meta_image.url
            : null,
      },
    ],
  }
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace)
}

export { slugify, linkResolver, isObjectEmpty, randId, vh, meta, replaceAll }
