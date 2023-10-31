<template>
  <v-form v-model="innerIsValid" class="io-form" :style="builderStyles" :disabled="disabled">
    <v-container class="io-form__container pa-0">
      <v-row v-for="(row, rowIndex) in rows" :key="rowIndex" no-gutters>
        <template v-for="(element, elementIndex) in row.elements">
          <v-col :cols="element.cols" :key="element.name">
            <v-checkbox
              v-if="row.selectable && elementIndex === 0"
              :input-value="selectedRows[rowIndex]"
              :value="selectedRows[rowIndex]"
              @change="onSelectRow(rowIndex)"
            />
            <component
              :is="element.component"
              v-model="model[element.name]"
              v-bind="element.props"
              :class="element.class"
              class="mt-0"
              :style="element.style"
              :rules="innerSelectedRows[rowIndex] && element.props?.rules
                ? element.props.rules
                : []"
              :disabled="getDisabledValue(element.props, rowIndex, row.selectable)"
              >
            </component>
            <template v-if="element.tooltip">
              <v-icon>{{ element.tooltip?.icon || defaultTooltipIcon }}</v-icon>
              {{ element.tooltip.content }}
            </template>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import {
  Component, Prop, Mixins,
} from 'vue-property-decorator';
import _ from 'lodash';

import { Row, VModel } from './SingleFormBuilder.types';

import SharedCommonPropsMixin from '../../shared/mixins/sharedCommonProps';

@Component({
  inheritAttrs: false,
})
export default class FormBuilder extends Mixins(SharedCommonPropsMixin) {
  @Prop({ required: true }) readonly value!: VModel

  @Prop({ required: true }) readonly rows!: Row[];

  @Prop({ default: () => ([]) }) readonly selectedRows!: number[];

  public defaultTooltipIcon = 'mdi-information-outline';

  public innerSelectedRows = [];

  public get model(): VModel {
    return this.value;
  }

  public get innerIsValid(): boolean {
    return this.isValid;
  }

  public set innerIsValid(value: boolean) {
    this.$emit('update:is-valid', value);
  }

  private get elementNamesByRowIndex() {
    return this.rows.map((row) => row.elements.map((el) => el.name));
  }

  public get builderStyles() {
    const [gap, rowGap] = this.gaps;
    const [, defaultRowGap] = this.getDefaultGaps();

    return {
      '--gap': `${gap}px`,
      '--row-gap': `${rowGap ?? defaultRowGap}px`,
    };
  }

  private get unselectedCheckboxes() {
    return this.innerSelectedRows.reduce((acc, val, index) => {
      if (!val) {
        acc.push(index);
      }
      return acc;
    }, [] as number[]);
  }

  private get unselectedElements() {
    return this.unselectedCheckboxes.flatMap((i) => this.elementNamesByRowIndex[i]);
  }

  public getDisabledValue(props: VModel, rowIndex: number, selectable: boolean) {
    const { disabled } = props;

    if (selectable) {
      return disabled || !this.innerSelectedRows[rowIndex];
    }

    return disabled || false;
  }

  public onSelectRow(rowIndex: number): void {
    let result = { ...this.model };
    const currentVal = !this.innerSelectedRows[rowIndex];

    this.$set(this.innerSelectedRows, rowIndex, currentVal);

    if (!currentVal) {
      result = _.omit(result, this.unselectedElements);
    }

    this.$emit('selected-model', result);
    this.$emit('update:is-selected-rows', this.innerSelectedRows);
  }
}
</script>

<style scoped lang="scss">
.io-form {
  &__container {
    display: flex;
    flex-direction: column;
    row-gap: var(--row-gap);
  }

  .row {
    gap: var(--gap);
    flex-wrap: nowrap;
    align-items: flex-start;
  }

  .col {
    display: flex;
    align-items: center;
    flex: inherit !important;
  }
}
</style>
