import { Row, Element } from '../SingleFormBuilder/SingleFormBuilder.types';

export type AddButtonPosition = 'start' | 'end';

export type AddButtonOptions = {
  position: {
    x: AddButtonPosition,
    y: AddButtonPosition,
  },
  props: Record<string, unknown>,
  class: string,
  text: string,
  icon: string
}

export type ConditionalElementProps = {
  rowIndex: number;
  prevRowProps: Record<string, unknown>;
  currentRowProps: Record<string, unknown>;
  element: Element
}

export type MultiFormElement = Element & {
  uniqueItems?: boolean;
  conditionalElementProps?: (args: ConditionalElementProps) => Record<string, unknown> | null;
}

export type MultiFormRow = Row<MultiFormElement>

export type VModel = Array<Record<string, unknown>>;
