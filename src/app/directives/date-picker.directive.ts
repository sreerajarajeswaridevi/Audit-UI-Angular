import { Directive, HostListener, Input, Output, EventEmitter, ElementRef } from '@angular/core';

var moment = require('../../assets/datepicker/moment.js');

@Directive({
  selector: '[rrDatePicker]'
})
export class DatePickerDirective {
  @Input() header = '';
  @Input() date: any;
  @Input() startDate: any;
  @Input() endDate: any;
  @Output() dateSelected = new EventEmitter();
  public picker: any;
  public datePickerTarget: any;
  public retry = 5;



  @HostListener('click', ['$event']) onClick() {
    // console.log(this.datePickerTarget);
    this.datePickerTarget.click();
    if (this.picker) {
      this.picker.open();
      this.setHeader();
    }
  }

  setHeader() {
    // console.log(moment(momentT));
    // // console.log(momentT);
    // const sone =  moment.tz.guess();
    // const timezone = moment.tz(sone).zoneAbbr();
    //   console.log('momo ', timezone);
    setTimeout(() => {
      const headerEl = document.querySelector('.c-datepicker__header-day') as HTMLElement;
      headerEl.innerHTML = this.header + headerEl.innerHTML;
      if (this.header) {
        (document.querySelector('.js-day') as HTMLElement).style.lineHeight = '1.2';
      }
    }, 0);
  }

  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.style.cursor = 'pointer';
    this.init();
  }

  public init() {
    this.datePickerTarget = document.querySelector('.rr-datepicker-trigger') as HTMLElement;
    if (this.datePickerTarget) {
      this.datePickerTarget.addEventListener('createDatePicker', ($ev: any) => {
        const MaterialDatetimePicker = $ev.detail.datePickerRef;
        this.picker = new MaterialDatetimePicker({
          default: this.date || moment(), // Selected Date for date picker between { startDate - endDate }
          startDate: this.startDate || moment().subtract('1', 'month'),
          endDate: this.endDate || moment().add('1', 'month')
        }).on('submit', (date: any) => {
            this.date = date;
            this.dateSelected.emit(date);
          });
      });
    } else if (this.retry > 0) {
      /**
       * Section to retry date picker init 5 times
       * if datepicker JS is not rendered during component init. After 5 tries, it withdraws the directive init.
       */
      setTimeout(() => {
        this.retry--;
        // console.log({retry: this.retry});
        this.init();
      }, 100);
    }
  }
}
