<template>
  <v-dialog
    :ref="ref"
    class="base-dialog"
    v-bind="combinedDialogValues"
    v-on="$listeners"
  >
    <div class="header">
      <div class="text-h6">
        {{ title }}
      </div>
    </div>

    <div class="subtitle">
      <slot
        name="subtitle"
      />
    </div>
    <div class="content-wrapper">
      <slot name="content" />
    </div>
    <div
      v-if="showContentDivider"
      class="content-divider"
    />
    <div
      v-if="showFooter"
      class="footer"
    >
      <slot
        v-if="showCancelButton"
        name="cancel-btn"
      >
        <BaseButton
          v-bind="cancelBtnProps"
          class="mr-4"
          type="secondary"
          :disabled="disabledCancelButton"
          :data-test-id="cancelBtnTestID"
          @click="$emit('click-button-cancel')"
        >
          {{ buttonCancelText }}
        </BaseButton>
      </slot>
      <slot name="ok-btn">
        <BaseButton
          v-bind="okBtnProps"
          type="primary"
          :disabled="disabledOkButton"
          :loading="loading"
          :data-test-id="okBtnTestID"
          @click="$emit('click-button-ok')"
        >
          {{ buttonOkText }}
        </BaseButton>
      </slot>
    </div>
    <template
      v-for="(_, name) in $scopedSlots"
      :slot="name"
      slot-scope="slotData"
    >
      <slot
        :name="name"
        v-bind="slotData"
      />
    </template>
  </v-dialog>
</template>

<script lang="ts">
import {
  Component, Mixins,
} from 'vue-property-decorator';

import DialogPropsMixin from '@/components/dialogProps';
import BaseButton from './BaseButton.vue';

const defaultDialogProps = {
  'overlay-color': 'rgba(0, 0, 0, 0.75)',
  'content-class': 'base-dialog-wrapper',
  'overlay-opacity': 1,
  width: 640,
};

@Component({
  components: {
    BaseButton,
  },
})
export default class BaseDialog extends Mixins(DialogPropsMixin) {
  private ref = 'v-dialog';

  get combinedDialogValues(): Record<string, unknown> {
    const { value } = this.$props;

    return {
      value,
      ...defaultDialogProps,
      ...this.dialogProps,
      ...this.$props,
      ...this.$attrs,
      'content-class': `${defaultDialogProps['content-class']} ${this.showContentDivider ? 'base-dialog-wrapper--divider' : ''} ${this.contentClass}`,
    };
  }
}
</script>

<style scoped lang="scss">
::v-deep  .base-dialog-wrapper {
  background-color: #FDFDFD;
  * {
    font-family: Roboto !important;
  }

  .header {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #fff;
    height: 56px;
    padding: 20px;
    box-shadow: 0px 8px 24px rgba(88, 107, 122, 0.12);
    border-radius: 4px 4px 0px 0px;
  }

  .subtitle {
    padding: 0 20px;
    color: var(--text-color-grey);
  }

  .content-wrapper {
    padding: 30px
  }

  .footer {
    padding: 20px;
    text-align: right;
  }

  .row {
    &.multi-column {
      margin: 0;
      .col, [class*=col-] {
        padding: 0;
        &:not(:last-child) {
          padding-right: 16px;
        }
        &:not(:nth-child(1)) {
          padding-left: 16px;
        }
      }
    }
    & + .row {
      margin-top: 4px;
    }
  }

  &--divider {
    .content-divider {
      width: 100%;
      height: 1px;
      background-color: rgba(33, 33, 33, 0.08);
    }

    .footer {
      padding: 20px !important;
    }
  }
}

</style>
