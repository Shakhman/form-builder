export type Element = {
  component: string | Vue,
  name: string,
  cols: number,
  tooltip?: {
    icon: string,
    content: ''
  },
  class?: string,
  style?: string,
  props: Record<string, unknown>,
}

export type Row<E = Element> = {
  selectable?: boolean,
  elements: E[],
}

export type Gaps = [number, number?];

export type VModel = Record<string, unknown>;
