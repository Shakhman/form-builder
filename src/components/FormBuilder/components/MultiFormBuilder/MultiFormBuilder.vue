<template>
  <v-container class="multi-form">
    <v-row>
      <v-col :cols="12" v-bind="addButtonColParams">
        <v-btn
          v-bind="mergedAddButtonOptions.props"
          :disabled="disabled"
          :class="mergedAddButtonOptions.class"
          @click="addMoreHandler"
        >
          <v-icon v-if="mergedAddButtonOptions.icon">{{ mergedAddButtonOptions.icon }}</v-icon>
           {{ mergedAddButtonOptions.text }}
        </v-btn>
      </v-col>
      <v-col :cols="12" :order="2">
        <v-form :value="isMultiFormValid">
          <div v-for="(form, formIndex) in multiFormModel" :key="formIndex" class="form-wrapper">
            <v-divider v-if="formIndex" class="form-divider"></v-divider>
            <v-icon
              v-if="!disabled && multiFormModel.length > deleteCountLimit"
              class="delete-row-icon"
              @click="onDeleteIconClick(formIndex)"
              >mdi-delete</v-icon>
            <SingleFormBuilder
              v-model="multiFormModel[formIndex]"
              :disabled="disabled"
              :rows="multiRows[formIndex]"
              :gaps="gaps"
              :is-valid.sync="isValidForms[formIndex]"
              @selected-model="onSelectedModel($event, formIndex)"
              />
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  Component, Mixins, Prop, Watch,
} from 'vue-property-decorator';
import _ from 'lodash';

import SingleFormBuilder from '../SingleFormBuilder/SingleFormBuilder.vue';
import SharedCommonPropsMixin from '../../shared/mixins/sharedCommonProps';

import {
  MultiFormRow, AddButtonOptions, VModel, MultiFormElement,
} from './MultiFormBuilder.types';

const defaultAddButtonOptions = {
  divider: true,
  position: {
    x: 'start',
    y: 'start',
  },
  icon: 'mdi-plus',
  text: 'Add more',
  props: {
    color: 'primary',
    outlined: true,
  },
};

@Component({
  components: {
    SingleFormBuilder,
  },
})
export default class MultiFormBuilder extends Mixins(SharedCommonPropsMixin) {
  @Prop({ required: true }) readonly value!: VModel

  @Prop({ required: true }) readonly rows!: MultiFormRow[];

  @Prop({ default: 1 }) readonly deleteCountLimit!: number;

  @Prop({ default: () => defaultAddButtonOptions }) readonly addButtonOptions!: AddButtonOptions;

  public isValidForms = [];

  public selectedModel: VModel = [];

  public dynamicProps: any = {};

  private prevValue: VModel = []

  private cachedConditionalProps: any = {};

  public get multiFormModel() {
    return this.value;
  }

  public set multiFormModel(value: VModel) {
    this.$emit('input', value);
  }

  public get isMultiFormValid() {
    return this.value && this.isValidForms.every((valid) => Boolean(valid));
  }

  public get mergedAddButtonOptions() {
    return _.merge(defaultAddButtonOptions, this.addButtonOptions);
  }

  public get addButtonColParams() {
    const { x, y } = this.addButtonOptions.position;

    return {
      order: x === 'start' ? 1 : 3,
      class: [`text-${y}`],
    };
  }

  private initMultiFormModel() {
    return this.rows.reduce((acc, row) => {
      row.elements.forEach((el) => {
        acc[el.name] = '';
      });

      return acc;
    }, {} as Record<string, string>);
  }

  public addMoreHandler() {
    this.multiFormModel.push(this.initMultiFormModel());
  }

  public onSelectedModel(value: Record<string, unknown>, formIndex: number) {
    this.selectedModel[formIndex] = value;
    this.$emit('selected-model', this.selectedModel);
  }

  public onDeleteIconClick(formIndex: number) {
    const model = _.clone(this.multiFormModel);
    model.splice(formIndex, 1);

    this.$emit('input', model);
  }

  @Watch('isMultiFormValid')
  private isValidHandler(value: boolean) {
    this.$emit('update:is-multi-form-valid', value);
  }

  private getConditionalElementProps(element: MultiFormElement, index: number) {
    const args = {
      rowIndex: index,
      prevRowProps: this.prevValue.length ? this.prevValue[index] : null,
      currentRowProps: this.multiFormModel[index],
      element,
    };

    const conditionalElementProps = element.conditionalElementProps(args) || null;

    if (!conditionalElementProps) {
      return null;
    }

    if ('value' in conditionalElementProps) {
      this.multiFormModel[index][element.name] = conditionalElementProps.value;
    }

    const updatedProps = {
      ...element.props,
      ...conditionalElementProps,
    };

    return updatedProps;
  }

  private get multiRows() {
    const multiRows = this.multiFormModel.map((a, index) => this.rows.map((row) => ({
      ...row,
      elements: (row.elements).map((el) => {
        const copiedEl = _.cloneDeep(el);

        const isPrevAndCurrentModelEqual = _.isEqual(
          this.prevValue[index],
          this.multiFormModel[index],
        );

        // console.log(index, this.prevValue[index],
        //   this.multiFormModel[index], isPrevAndCurrentModelEqual);

        if (copiedEl?.conditionalElementProps && !isPrevAndCurrentModelEqual) {
          const updatedProps = this.getConditionalElementProps(copiedEl, index);

          if (updatedProps) {
            this.cachedConditionalProps[index][copiedEl.name] = updatedProps;
          }
        }

        if (!this.cachedConditionalProps[index]) {
          this.cachedConditionalProps[index] = {};

          if (!this.cachedConditionalProps[index][copiedEl.name]) {
            this.cachedConditionalProps[index][copiedEl.name] = {};
          }
        }

        copiedEl.props = {
          ...copiedEl.props,
          ...this.cachedConditionalProps[index][copiedEl.name],
        };

        if (copiedEl.props && 'items' in copiedEl.props && copiedEl.uniqueItems) {
          copiedEl.props.items = (copiedEl.props.items as any[]).map((item) => {
            const copiedMultiFormModel = [...this.multiFormModel];
            copiedMultiFormModel.splice(index, 1);
            const selectedElementValues = copiedMultiFormModel.flatMap((m) => m[el.name]);

            return {
              ...item,
              disabled: selectedElementValues.includes(item.value),
            };
          });
        }

        return copiedEl;
      }),
    })));

    this.prevValue = structuredClone(this.value);

    return multiRows;
  }

  created() {
    if (!this.value.length) {
      this.multiFormModel.push(this.initMultiFormModel());
    }

    this.prevValue = structuredClone(this.value);
  }
}
</script>

<style scoped lang="scss">
.form-wrapper {
  position: relative;

  &:hover {
    .delete-row-icon {
      visibility: visible;
    }
  }
}

.delete-row-icon {
  visibility: hidden;
  position: absolute;
  top: 50%;
  right: 10px;
  cursor: pointer;
}

.form-divider {
  margin: 24px 60px;
}
</style>
