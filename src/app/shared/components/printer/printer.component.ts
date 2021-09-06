import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/auth/models/user.model';
import { getUser } from 'src/app/auth/store/auth.selectors';
var moment = require('../../../../assets/datepicker/moment.js');

@Component({
  selector: 'app-printer',
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrinterComponent implements OnInit {

  @Input() type: 'pooja' | 'exponse' | 'donation' | 'report' = 'pooja';
  @Input() size: 'bill' | 'A4' = 'bill';
  @Input() text = '';

  @Input() poojas: any;
  @Input() expense: any;
  @Input() donation: any;
  @Input() report: any;
  @Input() hidden = false;

  @ViewChild('buttonRef', { static: true }) buttonRef: ElementRef; 

  temple: User;

  constructor(private store: Store<any>, private cdr: ChangeDetectorRef) { 
    this.store.select(getUser).subscribe((user: any) => {
      this.temple = user;
    })
  }

  ngOnInit(): void {
  }

  getTotalPrice(poojas: any) {
    return poojas.reduce((a: any, b: any) => b.pooja_price + a, 0)
  }

  getCurrentDate() {
    return moment().format("DD-MM-YYYY HH:mm");
  }

  public print = () => {
    this.cdr.detectChanges();
    this.buttonRef.nativeElement.click();
  }

}
