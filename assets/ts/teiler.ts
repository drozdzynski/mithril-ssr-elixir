import m from 'mithril'
import styled, { component, global, createStyleSheet, type Compile, type Expression, type Style, type Sheet } from '../../../../../teiler/packages/core'
import { getStyleSheet } from './sheet';

type MithrilComponent<Props> = m.ClassComponent<Props> & {
  styles: Array<Style<Props>>
}

const createComponent = <Props>(compile: Compile, tag: string, styles: Array<Style<Props>>): MithrilComponent<Props> => {
  return {
    styles,
    view(vnode) {
      const sheet: Sheet = getStyleSheet()
      return m(tag, {
          className: compile(sheet, styles, vnode.attrs).join(' '),
          ...vnode.attrs
        }, vnode.children)
    }
  }
}

type Component = {
  <Component extends m.ClassComponent<any>>(binded: Component): <Props extends object>(
    string: TemplateStringsArray,
    ...expressions: Expression<Component extends m.ClassComponent<infer P> ? P & Props : Props>[]
  ) => m.ClassComponent<Component extends m.ClassComponent<infer P> ? P & Props : Props>
  <Props>(string: TemplateStringsArray, ...expressions: Expression<Props>[]): m.ClassComponent<Props>
}

function construct(tag: string | null, compile: Compile) {
  const binded = createComponent.bind(null, compile, tag)

  return <Type, Props>(stringOrBinded: TemplateStringsArray, ...expressions: Expression<Props>[]) => {
    return styled<Type, Props>(binded, stringOrBinded, ...expressions)
  }
}

const mithrilComponent: Component = construct('div', component)

const mithrilGlobal: Component = construct(null, global)

export default mithrilComponent
export { mithrilGlobal as global }