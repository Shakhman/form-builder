import Vuetify from 'vuetify';
import { VTextField } from 'vuetify/lib/components';

import { createLocalVue, mount } from '@vue/test-utils';
import { SingleFormBuilder } from '@/components/FormBuilder';

const getFakeRows = () => [
  {
    selectable: false,
    elements: [
      {
        name: 'name', component: VTextField, cols: 6, props: { label: 'Name', rules: [(v: string) => v?.length < 3] },
      },
      {
        name: 'email', component: VTextField, cols: 5, props: { label: 'Email', disabled: false }, tooltip: { content: 'Content' },
      },
    ],
  },
  {
    selectable: false,
    elements: [
      {
        name: 'city', component: VTextField, cols: 5, props: { label: 'City' },
      },

    ],
  },
];

describe('SingleFormBuilder', () => {
  const localVue = createLocalVue();
  let vuetify: Vuetify;
  const isValid = true;
  const selectedRows: string[] = [];

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('should work', () => {
    const wrapper = mount(SingleFormBuilder, {
      localVue,
      vuetify,
      propsData: {
        value: [],
        rows: getFakeRows(),
        gaps: 14,
        isValid,
        selectedRows,
      },
    });

    expect(wrapper.exists()).toBeTruthy();
  });
});
