<template>
  <DateRangeSelectorTooltip
    :width="280"
    :attach="attach"
    :offset-y="true"
    :date-range-items="dateRangeItems"
    :start-date.sync="startMonthNumber"
    :end-date.sync="endMonthNumber"
    :start-field-props="{ label: 'Start month' }"
    :end-field-props="{ label: 'End month' }"
    @date-range-change="changeSelectedMonthRange"
  >
    <template #activator="{ on }">
      <v-select
        v-model="selectedMonthRange"
        multiple
        :items="dates"
        item-value="monthNumber"
        label="Month Range"
        hide-details
        readonly
        @click.native="on.click"
      >
        <template #selection="{ item, index }">
          {{ getMonthText(item) }}
          {{ index === 0 ? '-' : '' }}
        </template>
      </v-select>
    </template>
  </DateRangeSelectorTooltip>
</template>

<script lang="ts">
import {
  Component, Mixins, Prop,
} from 'vue-property-decorator';

import DateRangeSelectorTooltip from '@/components/Base/DateRangeSelectorTooltip.vue';
import MonthRangeSelector from '@/components/monthRangeSelector';

@Component({
  components: {
    DateRangeSelectorTooltip,
  },
  model: {
    prop: 'value',
    event: 'input',
  },
})
export default class MonthlyDateRangeSelector extends Mixins(MonthRangeSelector) {
  @Prop({ required: false, default: 1 }) startMonth!: number;

  @Prop({ required: false, default: 1 }) endMonth!: number;

  @Prop({ default: true }) attach!: boolean;

  @Prop({ default: () => ([]) }) value!: [number, number];

  public selectedMonthRange: number[] = [];

  private initMonths() {
    const [modelStartMonth, modelEndMonth] = this.value;

    const startMonth = modelStartMonth ?? this.startMonth;
    const endMonth = modelEndMonth ?? this.endMonth;

    this.startMonthNumber = startMonth;
    this.endMonthNumber = endMonth;
    this.selectedMonthRange = [startMonth, endMonth];
  }

  public changeSelectedMonthRange(selectedRange: any) {
    this.selectedMonthRange = [selectedRange.selectedStartDate, selectedRange.selectedEndDate];
    this.$emit('month-range-change', selectedRange);
    this.$emit('input', this.selectedMonthRange);
  }

  created() {
    this.initMonths();
  }
}
</script>
