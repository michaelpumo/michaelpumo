export default function (doc) {
  switch (doc.type) {
    case 'page':
      return doc.uid === 'home' ? '/' : `/${doc.uid}`
    case 'post':
      return `/posts/${doc.uid}`
    default:
      return `/${doc.uid}`
  }
}
