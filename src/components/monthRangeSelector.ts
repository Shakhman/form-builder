import { Vue, Component } from 'vue-property-decorator';

type DateRangeItem = {
  value: number;
  text: string;
  disabled?: boolean;
};

@Component
export default class MonthRangeSelectorMixin extends Vue {
  public startMonthNumber = 1;

  public endMonthNumber = 1;

  public dates = [
    {
      monthNumber: 1,
      month: 'M1',
      monthName: 'Oct',
      year: '2021',
    },
    {
      monthNumber: 2,
      month: 'M2',
      monthName: 'Nov',
      year: '2021',
    },
  ];

  public createDateRangeItem = (
    value: number, text: string,
  ): DateRangeItem => ({ value, text, disabled: false });

  get dateRangeItems(): DateRangeItem[] {
    return this.dates.map(
      (month: any) => this.createDateRangeItem(month.monthNumber, this.getMonthText(month)),
    );
  }

  public getMonthText = (month: any) => `${month.month}: ${month.monthName} ${month.year}`;
}
