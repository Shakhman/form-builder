import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class DialogPropsMixin extends Vue {
  @Prop({ default: false }) readonly value!: boolean;

  @Prop({ default: '' }) readonly title!: string;

  @Prop({ default: 'Ok' }) readonly buttonOkText!: string;

  @Prop({ default: 'Cancel' }) readonly buttonCancelText!: string;

  @Prop({ default: false }) readonly disabledOkButton!: boolean;

  @Prop({ default: false }) readonly disabledCancelButton!: boolean;

  @Prop({ default: () => ({}) }) readonly dialogProps!: Record<string, unknown>;

  @Prop({ default: () => ({}) }) readonly cancelBtnProps!: Record<string, unknown>;

  @Prop({ default: () => ({}) }) readonly okBtnProps!: Record<string, unknown>;

  @Prop({ default: true }) readonly showFooter!: boolean;

  @Prop({ default: true }) readonly showCancelButton!: boolean;

  @Prop({ default: false }) readonly showContentDivider!: boolean;

  @Prop({ default: false }) readonly loading!: boolean | string;

  @Prop({ default: '' }) readonly contentClass!: string;

  get cancelBtnTestID() {
    return this.cancelBtnProps['data-test-id'] || 'base-dialog-cancel-btn';
  }

  get okBtnTestID() {
    return this.okBtnProps['data-test-id'] || 'base-dialog-ok-btn';
  }
}
