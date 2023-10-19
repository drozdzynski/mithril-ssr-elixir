import m from "mithril";

type Context<T> = {
  id: number,
  state: () => T | undefined;
  Provider: () => {
    view: (
      vnode: m.Vnode<T>
    ) => (m.ChildArrayOrPrimitive | m.Vnode<unknown, unknown> | undefined)[];
  };
};

export const useContext = <T>(context: Context<T>): T | undefined => context.state();

export default function createContext<T>(
  defaultValue: T | undefined
): Context<T> {
  let providedContext = defaultValue;

  const id = Math.random()

  const state = (): T | undefined => {
    return providedContext
  };

  const Provider = () => {
    return {
      view: (vnode: m.Vnode<T>) => {
        providedContext = vnode.attrs;

        return [
          vnode.children,

          m({
            view: () => {}
          })
        ];
      }
    };
  };

  return {
    state,
    Provider,
    id
  }
}
