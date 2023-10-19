import { createStyleSheet, type Sheet } from "../../../../../teiler/packages/core";
import { useSheetContext } from "./SheetContext";

export const styleSheet = createStyleSheet({})

export function getStyleSheet(): Sheet {
  return useSheetContext() || styleSheet;
}
