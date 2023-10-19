import m from "mithril";
import type Stream from "mithril/stream";
import stream from "mithril/stream";

type Store<T> = {
  set: (initialState: T) => void;
  update: (newValueCallback: (currentValue: T) => T) => void;
  value: Stream<T>
};

const declaration = <T>(initialState: T): Store<T> => {
  const value = stream(initialState);
  return {
    set: (newValue: T) => {
      value(newValue);
      m.redraw();
    },
    update: (newValueCallback: (currentValue: T) => T) => {
      const newValue = newValueCallback(value());
      value(newValue);
      m.redraw();
    },
    value: value,
  };
};

export default declaration;
