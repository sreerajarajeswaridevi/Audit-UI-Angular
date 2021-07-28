import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
var moment = require('../../assets/datepicker/moment.js');

@Directive({
  selector: '[appDateTransform]'
})
export class DateTransformDirective implements OnChanges {

  @Input() format = "dddd DD/MM/YYYY";
  @Input() date = moment().format('YYYY-MM-DD');
  
  elementRef: ElementRef;

  constructor(elementRef: ElementRef) { 
    this.elementRef = elementRef;
  }

  ngOnChanges() {
    this.elementRef.nativeElement.innerHTML = moment(this.date, 'YYYY-MM-DD').format(this.format)
  }

}
