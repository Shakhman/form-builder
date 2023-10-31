<template>
  <v-menu
    v-model="internalDropdownOpen"
    :close-on-content-click="false"
    v-bind="$attrs"
  >
    <template #activator="{ on }">
      <slot
        name="activator"
        v-bind="{ on }"
      />
    </template>
    <div
      class="date-range"
      :style="{ width: `${width}px` }"
    >
      <v-autocomplete
        v-model="selectedStartDate"
        :items="startDateItems"
        v-bind="startFieldProps"
        hide-details
        :menu-props="menuProps"
      />
      <v-autocomplete
        v-model="selectedEndDate"
        v-bind="endFieldProps"
        :items="endDateItems"
        hide-details
        :menu-props="menuProps"
        class="mt-8"
      />
      <div class="mt-4 d-flex flex-row justify-end">
        <BaseButton
          type="secondary"
          @click="onCancel"
        >
          CANCEL
        </BaseButton>
        <BaseButton
          type="secondary"
          @click="onSave"
        >
          SAVE
        </BaseButton>
      </div>
    </div>
  </v-menu>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import BaseButton from '@/components/Base/BaseButton.vue';

const defaultStartFieldProps = {
  label: 'Start Week',
};

const defaultEndFieldProps = {
  label: 'End Week',
};

@Component({
  components: {
    BaseButton,
  },
})
export default class DateRangeSelectorTooltip extends Vue {
  @Prop({ default: () => defaultStartFieldProps }) readonly startFieldProps!: Record<string, unknown>;
  @Prop({ default: () => defaultEndFieldProps }) readonly endFieldProps!: Record<string, unknown>;
  @Prop({ default: [], required: true }) readonly dateRangeItems!: { value: number; text: string }[];
  @Prop({ default: '' }) readonly activatorClass!: string;
  @Prop({ required: true }) readonly startDate!: number;
  @Prop({ required: true }) readonly endDate!: number;
  @Prop({ required: false, default: 210 }) readonly width!: number;
  @Prop({ required: false, default: false }) readonly dropdownOpen!: boolean;

  public internalDropdownOpen = this.dropdownOpen;

  private selectedStartDate = 1;
  private selectedEndDate = 1;

  public menuProps = { maxHeight: 204 };

  get startDateItems() {
    return this.dateRangeItems.map((item) => ({ ...item, disabled: item.value > this.selectedEndDate }));
  }

  get endDateItems() {
    return this.dateRangeItems.map((item) => ({ ...item, disabled: item.value < this.selectedStartDate }));
  }

  public onSave() {
    this.$emit('date-range-change', {
      selectedStartDate: this.selectedStartDate,
      selectedEndDate: this.selectedEndDate,
    });
    this.$emit('update:start-date', this.selectedStartDate);
    this.$emit('update:end-date', this.selectedEndDate);

    this.internalDropdownOpen = false;
  }

  public initSelectedDate() {
    this.selectedStartDate = this.startDate;
    this.selectedEndDate = this.endDate;
  }

  public onCancel() {
    this.internalDropdownOpen = false;
  }

  created() {
    this.initSelectedDate();
  }

  @Watch('internalDropdownOpen')
  onDropdownChange(value: boolean) {
    this.$emit('update:dropdown-open', value);

    if (!value) {
      this.initSelectedDate();
    }
  }

  @Watch('startDate')
  onStartDateChange(value: number) {
    this.selectedStartDate = value;
  }

  @Watch('endDate')
  onEndDateChange(value: number) {
    this.selectedEndDate = value;
  }
}
</script>

<style lang="scss" scoped>
.date-range {
  background: #fff;
  padding: 16px;

  ::v-deep .mdi-menu-down {
    cursor: pointer;
  }
}
.date-range-wrapper {
  width: 210px;
}
</style>
