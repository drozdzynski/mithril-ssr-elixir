import m from 'mithril';
import store from './store';
import component from './teiler';

const FirstComponent = component<{ test: number }>`
  color: ${({ test }) => (test % 2 === 0 ? 'red' : 'blue')};
`;

const extend = component(FirstComponent)<{}>`
  font-weight: ${({ test }) => (test % 5 === 0 ? 'bold' : 'regular')};
`;

const ComponentWithState: m.ClosureComponent<{ test: string }> = (vnode) => {
  const count = store(0);
  const double = count.value.map((value) => value * 2);

  return {
    oninit: (vnode) => {
      console.log('init a closure component');
    },
    view: (vnode) => {
      return m(
        'div',
        m(FirstComponent, { test: count.value() }, [ m('p', {}, 'abc') ]),
        m(extend, { test: count.value() }, [m('p', {}, 'abc')]),
        m('p', 'Test: ' + count.value() + ' | ' + double()),
        m(
          'button',
          {
            onclick: function () {
              count.update((value) => value + 1);
            },
          },
          'Increment count',
        ),
      );
    },
  };
};

function mount(target, component) {
  addEventListener('DOMContentLoaded', () => m.mount(target, component));
}

export { mount, ComponentWithState as default };
