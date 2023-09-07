<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      {{ model }}
      {{ isValid }}

      {{selectedModel}}

      <SingleFormBuilder v-model="model"
        :rows="mRows"
        :is-valid.sync="isValid"
        :selected-rows.sync="selectedRows"
        @selected-model="selectedModel = $event"
      />

      <h4>MultiForm</h4>

      {{multiModel}}
      {{isValidM}}
      {{selectedModelM}}

      <MultiFormBuilder
        :addButtonOptions="addButtonOptions"
        :rows="mRows2"
        :is-multi-form-valid.sync="isValidM"
        @selected-model="selectedModelM = $event"
        v-model="multiModel"
      ></MultiFormBuilder>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { VTextField, VSelect } from 'vuetify/lib/components';
import { SingleFormBuilder, MultiFormBuilder } from './components/FormBuilder';

console.log('new features');

export default Vue.extend({
  name: 'App',

  components: {
    SingleFormBuilder,
    MultiFormBuilder,
  },

  data: () => ({
    model: {
      name: 'Test',
    },
    multiModel: [{ name: 'name2', select: 3, select2: [1, 2] }, { name: 'name22', select: 1, select2: [3] }],
    isValid: false,
    selectedRows: [],
    isValidM: false,
    selectedModel: {},
    selectedModelM: [],
  }),
  computed: {
    mRows() {
      return [
        {
          selectable: true,
          elements: [
            {
              name: 'name', component: VTextField, cols: 6, props: { label: 'Name', rules: [(v: string) => v?.length > 3] },
            },
            {
              name: 'email', component: VTextField, cols: 5, props: { label: 'Email', disabled: this.model.name === 'Test' }, tooltip: { content: '12' },
            },
          ],
        },
        {
          selectable: true,
          elements: [
            {
              name: 'name3', component: VTextField, cols: 5, props: { label: 'Name2' },
            },

          ],
        },
      ];
    },
    mRows2() {
      return [
        {
          elements: [
            {
              name: 'name', component: VTextField, cols: 6, props: { label: 'Name2', rules: [(v: string) => v?.length > 4] },
            },
            {
              name: 'email2', component: VTextField, cols: 5, props: { label: 'Email2' },
            },
          ],
        },
        {
          elements: [
            {
              name: 'select',
              component: VSelect,
              cols: 6,
              uniqueItems: true,
              props: {
                label: 'select',
                items: [
                  {
                    text: '1',
                    value: 1,
                  },
                  {
                    text: '2',
                    value: 2,
                  },
                  {
                    text: '3',
                    value: 3,
                  },
                ],
              },
            },
            {
              name: 'select2',
              component: VSelect,
              cols: 6,
              props: {
                label: 'select2',
                multiple: true,
                items: [
                  {
                    text: '1',
                    value: 1,
                    disabled: this.multiModel.some((i) => i.name === '1'),
                  },
                  {
                    text: '2',
                    value: 2,
                  },
                  {
                    text: '3',
                    value: 3,
                  },
                  {
                    text: '23',
                    value: 23,
                  },
                  {
                    text: '31',
                    value: 31,
                  },
                  {
                    text: '13',
                    value: 13,
                  },
                ],
              },
            },
          ],
        },
      ];
    },
    addButtonOptions() {
      return {
        position: {
          x: 'start',
          y: 'start',
        },
      };
    },
  },
});
</script>
