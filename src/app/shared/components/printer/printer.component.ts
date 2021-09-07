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
  @Input() reportPeriod = '';

  @Input() poojas: any;
  @Input() expense: any;
  @Input() donation: any;
  @Input() reports: any;
  @Input() hidden = false;

  @ViewChild('buttonRef', { static: true }) buttonRef: ElementRef; 
  @ViewChild('bill', { static: true }) bill: ElementRef; 

  temple: User;

  constructor(private store: Store<any>, private cdr: ChangeDetectorRef) { 
    this.store.select(getUser).subscribe((user: any) => {
      this.temple = user;
    })
  }

  ngOnInit(): void {
  }

  getTotalPrice(poojas: any, key:string) {
    return poojas.reduce((a: any, b: any) => +(b[key]) + a, 0)
  }

  getCurrentDate() {
    return moment().format("DD-MM-YYYY HH:mm");
  }

  public triggerPrint = () => {
    this.cdr.detectChanges();
    setTimeout(() => {
      this.newWindowPrint(this.bill.nativeElement.innerHTML);
    }, 0);
  }

  newWindowPrint(content: any) {
    const printerWindow = window.open('', '', 'width=2in') as any;
    printerWindow.document.write('<html> <style> header{max-width: 100%!important;} .heading{font-weight: bold; border-bottom: 1px dotted black; margin: 5px 10px;} .report table td {border: 1px solid black} .report table {border-collapse: collapse; width: 90%; margin-left: 2%;} .report tr td:first-child {min-width: 80px;} </style>');
    printerWindow.document.write('<body>');
    printerWindow.document.write(content);
    printerWindow.document.write('</body></html>');
    printerWindow.document.close();
    printerWindow.focus();
    printerWindow.print();
    // setTimeout(function () { 
    //   // printerWindow.navigator.share();
    //  }, 500);
     printerWindow.onfocus = function () { setTimeout(function () { printerWindow.close(); }, 500); }
  }

}
