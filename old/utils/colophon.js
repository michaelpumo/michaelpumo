function colophon() {
  const common = [
    'display: inline-block',
    'font-size: 12px;',
    'font-weight: bold',
    'padding: 8px 10px',
    'line-height: 30px',
  ]

  const title = [
    ...common,
    'background: #2e304b',
    'color: #fd8e8e',
    'border-radius: 5px 0 0 5px',
  ].join(';')

  const description = [
    ...common,
    'background: #fd8e8e',
    'color: #2e304b',
    'border-radius: 0 5px 5px 0',
  ].join(';')

  /* eslint-disable */
  console.log('%cFramework%cNuxt.js (Vue.js)', title, description)
  console.log('%cContent Management%cPrismic (Rest API)', title, description)
  console.log('%cHosting%cNetlify (+ functions)', title, description)
  console.log('%cEmail%cSendGrid (API)', title, description)
  /* eslint-enable */
}

export { colophon }
