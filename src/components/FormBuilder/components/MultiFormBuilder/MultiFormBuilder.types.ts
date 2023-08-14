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

export type MultiFormRow = Row<Element & { uniqueItems?: boolean }>;

export type VModel = Array<Record<string, unknown>>;
