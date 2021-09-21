import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appToFixed]'
})
export class ToFixedDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) {
  }
  
  ngAfterViewInit() {
    this.elementRef.nativeElement.innerHTML = `₹ ${(+(this.elementRef.nativeElement.innerHTML.replace('₹',''))).toFixed(2)}`;
  }
}
