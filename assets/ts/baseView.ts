import m from 'mithril'

const baseView = (component, sheet) => {
  return {
    view: (vnode) => [
      m('!doctype[html]'),
      m('html[lang=en]', [
        m('head', [
          // m('title', getTitle(vnode)),
          m('meta[charset=utf-8]'),
          m('script[src=/index.js]')
        ]),
        m('body', [
          m(component),
          m({
            view: () => {
              return m('style', sheet.dump())
            }
          })
        ]),
      ]),
    ]
  }
}

export default baseView