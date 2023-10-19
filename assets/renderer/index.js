const toHTML = require("mithril-node-render");
const m = require("mithril");

const SheetContext = require('../../priv/static/assets/node/SheetContext')

const render = async (componentPath) => {
  const component = require(`../../priv/static/assets/node/${componentPath}`)

  const sheet = SheetContext.createStyleSheet()
  const html = await toHTML(m(SheetContext.SheetContextProvider({ sheet }), [
    m(component.default),
    m({
      view: () => {
        return m('style', sheet.dump())
      }
    })
  ]));

  return html;
};

module.exports = render
