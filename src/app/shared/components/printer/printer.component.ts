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

  @Input() type = 'pooja';
  @Input() text = '';
  @Input() reportPeriod = '';
  
  @Input() poojas: any;
  @Input() expense: any;
  @Input() donation: any;
  @Input() reports: any;
  @Input() hidden = false;
  
  size = 'bill';

  @ViewChild('buttonRef', { static: true }) buttonRef: ElementRef; 
  @ViewChild('bill', { static: true }) bill: ElementRef; 

  temple: User;
  user: any;

  constructor(private store: Store<any>, private cdr: ChangeDetectorRef) { 
    this.store.select(getUser).subscribe((user: any) => {
      this.temple = user;
    })
    this.size = localStorage.getItem('printerPageSize') || 'bill';
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
    printerWindow.document.write(`
    <html> 
    <style>
    .main-copy,
		.duplicate-copy {
			font-family: sans-serif;
			background-image: linear-gradient(rgba(255, 255, 255, .9), rgba(255, 255, 255, .9)), url(${this.temple.logo});
      background-repeat: no-repeat;
      background-position: center;
      font-size: 12px;
		}

		header {
			max-width: 100% !important;
			word-break: break-word;
		}
    .manthram {
      font-family: cursive;
      font-weight: bold;
      color: darkred;
    }
		.heading {
			font-weight: bold;
			border-bottom: 1px dotted black;
			margin: 5px 10px;
		}

		.report table td {
			border: 1px solid black;
		}

    .report section {
      padding: 20px;
    }

    .main-copy section:nth-child(even) {
      background-color: #e7f9ff;
    }

		td {
			word-break: break-word;
		}

		.report table {
			border-collapse: collapse;
			width: 90%;
			margin-left: 2%;
		}

		.report tr td:first-child {
			min-width: 80px;
		}

		table {
			width: 100%;
      font-size: 12px;
		}

		.address,
		.phone {
			background-color: white;
      color: dimgray;
		}

		header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: 10%;
		}

    header .text {
			display: flex; 
      flex-direction: column;
      justify-content: center; 
      align-items: center; 
      text-align: center;
    }

		.temple-name {
			word-wrap: break-word;
			text-align: center;
			justify-content: center;
			padding: 0;
			margin: 0 0 5px;
			font-size: 20px;
      font-family: cursive;
      font-weight: bolder;
      color: #460146;
		}

		header .icon {
			max-height: 100px;
		}
		.title {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.title span {
			color: white;
			padding: 5px 10px;
			border-radius: 5px;
			margin: 10px 0;
			font-weight: bold;
      background: linear-gradient(90deg, rgba(30,3,144,1) 0%, rgba(121,9,93,1) 100%, rgba(0,212,255,1) 100%);

		}
		.date-receipt {
			display: flex; 
			justify-content: space-around; 
			align-items: center; 
			background-color: #e7f9ff;
      border: 1px solid gray;
		}
		.details {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			width: 100%;
		}
		.details .content{
			display: flex;
			flex-direction: column;
			width: 80%;
		}
		.details .row {
			display: flex;
			margin-bottom: 10px;
		}
		.details .row .value {
			margin-left: 10px;
			border-bottom: 1px dotted black;
			width: 100%;
			display: table;
			padding-left: 20px;
		}
		.details .row .label {
			white-space: pre;
			margin-right: 10px;
		}

		.total-amount {
			border-collapse: collapse;
			background: gainsboro;
			padding: 5px;
		}

		.notes {
			margin-top: 10px;
		}
		.footer {
			background-color: #e7f9ff;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 10px;
			text-align: center;
			font-size: 10px;
		}
    .pooja-table {
      border-collapse: collapse; width: 100%; 
      font-size: 12px;
    }
    .pooja-table td {
      border: 1px solid darkgoldenrod;
      padding: 5px;
    }
		@media print and (max-width: 2in){
			.date-receipt { display: block; }
		}
    ${
      localStorage.getItem('duplicateCopyPage') === 'next' ? `
      .bill-break {
        page-break-after: always;
      }
      `: ``
    }
    
    </style>
    `);
    printerWindow.document.write('<body><div class="main-copy">');
    printerWindow.document.write(content + '</div>');
    if (this.type !== 'report') {
      printerWindow.document.write(`
      <hr class="bill-break"><div class="duplicate-copy">
      <span style="color: gray;
      border: 1px dotted black;
      padding: 5px;">Duplicate copy</span>
      
      ${
        localStorage.getItem('printerPageSize') === 'bill' ? `
        <style>
        html{
          width: 2in;
        }
        header, .date-receipt, .details, .row {
          flex-direction: column;
        }

        .details .content {
          width: 100%;
        }

        .date-receipt {
          align-items: start;
        }

        .db {
          display: inline-block;
        }

        .bt-gray {
          border-top: 1px solid gray;
        }

        .details .row .value {
          margin: 0;
          padding: 0;
          font-weight: bold;
        }

        .row-container {
          border: 1px solid gray;
          padding: 5px;
        }
        
      </style>` : `` 
      }
      `);
      printerWindow.document.write(content);
    }
    printerWindow.document.write('</div></body></html>');
    printerWindow.document.close();
    printerWindow.focus();
    printerWindow.print();
    // printerWindow.onfocus = function () { setTimeout(function () { printerWindow.close(); }, 500); }
  }

}
