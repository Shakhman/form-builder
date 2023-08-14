import {
  Component, Vue, Prop,
} from 'vue-property-decorator';

const defaultGaps = [16, 10];

type Gaps = [number, number?]

@Component({
  data() {
    return {
      defaultGaps,
    };
  },
})
export default class SharedCommonProps extends Vue {
  @Prop({ default: true }) readonly isValid!: boolean;

  @Prop({ default: false }) readonly disabled!: boolean

  @Prop({ default: () => defaultGaps }) readonly gaps!: Gaps;

  public getDefaultGaps = () => defaultGaps
}
