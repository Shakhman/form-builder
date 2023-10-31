<template>
  <v-btn
    v-bind="props"
    :class="classes"
    :loading="loading"
    :ripple="{ center: true }"
    v-on="$listeners"
  >
    <slot
      v-for="(_, name) in $slots"
      :slot="name"
      :name="name"
    />
  </v-btn>
</template>

<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-property-decorator';

@Component({
  inheritAttrs: false,
})
export default class BaseButton extends Vue {
  @Prop({ default: 'Primary' }) readonly type!: string;

  @Prop({ default: false }) readonly loading!: boolean | string;

  private get classes() {
    return {
      'thin-grey-border': this.type === 'secondary' && this.$attrs.outlined,
    };
  }

  private get props() {
    return {
      ...this.$attrs,
      color: this.$attrs.color || 'primary',
      text: this.type === 'secondary',
      depressed: true,
    };
  }
}

</script>

<style lang="scss" scoped>
.v-btn--active::before {
  opacity: 0;
}
</style>
