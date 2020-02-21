function colophon() {
  const common = [
    'display: inline-block',
    'font-size: 12px;',
    'font-weight: bold',
    'padding: 8px 10px',
    'line-height: normal'
  ]

  const heading = [
    ...common,
    'font-size: 14px',
    'background: #fff',
    'color: #2e304b',
    'padding-left: 0',
    'border-radius: 5px'
  ].join(';')

  const title = [
    ...common,
    'background: #2e304b',
    'color: #fd8e8e',
    'border-radius: 5px 0 0 5px'
  ].join(';')

  const description = [
    ...common,
    'background: #fd8e8e',
    'color: #2e304b',
    'border-radius: 0 5px 5px 0'
  ].join(';')

  const footer = [
    ...common,
    'font-weight: normal',
    'background: #fff',
    'color: #828393',
    'padding-left: 0',
    'border-radius: 5px'
  ].join(';')

  const wave = String.fromCodePoint(0x1f44b)

  console.log('%cSince you wanted to know...', heading)
  console.log('%cFramework%cGridsome (Vue.js)', title, description)
  console.log('%cContent Management%cPrismic (GraphQL)', title, description)
  console.log('%cHosting%cNetlify (+ functions)', title, description)
  console.log('%cThanks for stopping by my portfolio ' + wave, footer)
}

export {
  colophon
}
