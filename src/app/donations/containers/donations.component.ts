import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { starSigns } from 'src/app/poojas/models/poojas.model';
import { getUser, isManager } from '../../auth/store/auth.selectors';
import { AppState } from 'src/app/reducers';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { Donations } from '../models/donations.model';
import { getDonations, getIsLoading } from '../store/donations.selectors';
import * as fromDonations from '../store/donations.actions';
import { PrinterComponent } from 'src/app/shared/components/printer/printer.component';
import { User } from 'src/app/auth/models/user.model';
import { DonationsService } from '../services/donations.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';


var moment = require('../../../assets/datepicker/moment.js');

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {
  @ViewChild('donationForm', { static: true }) donationForm: NgForm;
  @ViewChild('vanjiForm', { static: true }) vanjiForm: NgForm;
  @ViewChild('festivalForm', { static: true }) festivalForm: NgForm;
  @ViewChild('appPrinter', { static: true }) appPrinter: PrinterComponent;

  isManager$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  user: User;

  donationDate = moment();
  defaultDate = moment();
  startDate = moment().subtract(60, 'days');
  endDate = moment().add('30', 'days');
  selectedDate = moment();
  
  vanjiDate = moment();
  vanjiCopy: any;
  vanji: any;
  
  festivalDate = moment();
  festivalCopy: any;
  festival: any;

  donationCopy: any;
  donation: any = {
    ist_YYYYMMDD: moment().format('YYYY-MM-DD'),
    item: 'cash',
    address: '',
    phone_number: null,
    nakshatram: ''
  };
  expenseData: Subject<any> = new Subject();
  heading: string;
  price: number;
  starSigns = starSigns;
  private modalRef: MDBModalRef;

  todaysDonationList: Donations[] = [];

  frequentItems: Array<string>

  modalConfig = {
    class: 'modal-dialog-centered'
  };

  get formattedDate() {
    return this.selectedDate.format('dddd DD/MM/YYYY');
  }

  constructor(
    private store: Store<AppState>,
    private modalService: MDBModalService,
    private donationsService: DonationsService,
    private idbService: NgxIndexedDBService
  ) { 
    this.initIncomeData();
    this.initFestivalData();
  }

  initIncomeData() {
    this.vanji = {
      ist_YYYYMMDD: moment().format('YYYY-MM-DD'),
      item: 'vanji',
      name: '',
      nakshatram: 'vanji',
      phone_number: 0,
      address: 'Vanji'
    }
  }

  initFestivalData() {
    this.festival = {
      ist_YYYYMMDD: moment().format('YYYY-MM-DD'),
      item: 'festival',
      name: '',
      description: '',
      nakshatram: '',
      phone_number: 0,
      address: ''
    }
  }

  ngOnInit(): void {
    this.store.select(getDonations).subscribe((exp: Donations[]) => {
      this.todaysDonationList = exp;
    });
    this.store.select(getUser).subscribe((user: any) => {
      this.user = user;
    })
    this.donationsService.newDonationAdded.subscribe((receipt_number: string) => {
      const printData = {
        ...this.donationCopy,
        donation_date: this.donationDate.format("DD-MM-YYYY"),
        added_by: this.user.displayName,
        receipt_number: receipt_number
      }
      this.appPrinter.donation = printData;
      // this.appPrinter.triggerPrint();
      this.fetchFrequentItems();
    });

    this.fetchFrequentItems();
    this.isLoading$ = this.store.select(getIsLoading);
    this.isManager$ = this.store.select(isManager);
    this.store.dispatch(new fromDonations.DonationsQuery(this.selectedDate.format('YYYY-MM-DD')));
  }

  fetchFrequentItems() {
    this.idbService
      .getAll('donations')
      .subscribe((items: any) => {
        if (items && items.length > 0) {
          items = items.sort((a: any, b: any) => {
            if (a.frequency > b.frequency) {
              return -1;
            } else if (a.frequency > b.frequency){
              return 1;
            }
            return 0;
          }).splice(0, 5);
          this.frequentItems = items.map((data: any) => data.donationItem);
        }
      });
  }

  anyVanjiExist(donationList: any) {
    return donationList.some((donation: any) => donation.item === 'vanji')
  }
  anyFestivalExist(donationList: any) {
    return donationList.some((donation: any) => donation.item === 'festival')
  }

  dateClicked(date: any) {
    console.log(date);
  }

  donDatePicked(date: any) {
    this.donationDate = date;
    this.donation.ist_YYYYMMDD = date.format('YYYY-MM-DD');
  }

  incDatePicked(date: any) {
    this.vanjiDate = date;
    this.vanji.ist_YYYYMMDD = date.format('YYYY-MM-DD');
  }

  festDatePicked(date: any) {
    this.festivalDate = date;
    this.festival.ist_YYYYMMDD = date.format('YYYY-MM-DD');
  }

  datePicked(date: any) {
    this.selectedDate = date;
    this.store.dispatch(new fromDonations.DonationsQuery(date.format('YYYY-MM-DD')));
  }

  prevDate() {
    this.datePicked(this.selectedDate.subtract('1', 'days'));
  }

  nextDate() {
    this.datePicked(this.selectedDate.add('1', 'days'));
  }

  onSave() {
    const self = this;
    this.donationCopy = JSON.parse(JSON.stringify(this.donation));
    this.store.dispatch(new fromDonations.DonationsAddQuery(this.donationCopy));
    this.idbService
      .getByKey('donations', this.donationCopy.item)
      .subscribe((data) => {
        if (!data) {
          this.idbService.add('donations', {
            donationItem: self.donationCopy.item,
            frequency: 1
          }).subscribe((added: any) => {
            console.log(added, 'added to idb');
          }, ((error: any) => {
            console.log(error);
          }))
        } else {
          this.idbService.update('donations',
          {
            donationItem: self.donationCopy.item,
            frequency: (data as any).frequency + 1
          }, (data as any).key).subscribe((added: any) => {
            console.log(added, 'added to idb');
          }, ((error: any) => {
            console.log(error);
          }))
        }
      });
    this.resetForm();
  }

  onIncomeSave() {
    this.vanjiCopy = JSON.parse(JSON.stringify(this.vanji));
    this.store.dispatch(new fromDonations.DonationsAddQuery(this.vanjiCopy));
    this.resetIncomeForm();
  }
  

  onFestivalSave() {
    this.festivalCopy = JSON.parse(JSON.stringify(this.festival));
    this.store.dispatch(new fromDonations.DonationsAddQuery(this.festivalCopy));
    this.resetFestivalForm();
  }
  
  getTotalAmount() {
    if (this.todaysDonationList && this.todaysDonationList.length > 0) {
      return this.todaysDonationList.reduce(((prev, current: any) => +(current.amount) + prev), 0);
    }
    return '0';
  }
  
  selectStar(star: string) {
    this.donation.nakshatram = this.donation.nakshatram === star ? '' : star; 
  }
  selectfestivalStar(star: string) {
    this.festival.nakshatram = this.festival.nakshatram === star ? '' : star; 
  }

  resetIncomeForm() {
    this.vanjiForm.reset(); 
    this.vanjiForm.controls.item.setValue('vanji');
    this.initIncomeData();
    this.selectedDate = moment();
    this.vanjiDate = moment();
  }

  resetFestivalForm() {
    this.festivalForm.reset(); 
    this.festivalForm.controls.item.setValue('festival');
    this.initFestivalData();
    this.selectedDate = moment();
    this.festivalDate = moment();
  }

  resetForm() {
    this.donationForm.reset(); 
    this.donationForm.controls.item.setValue('cash');
    this.donation = {
      ist_YYYYMMDD: moment().format('YYYY-MM-DD'),
      item: 'cash'
    }
    this.selectedDate = moment();
    this.donationDate = moment();
  }

  onDelete(uuid: string) {
    this.modalRef = this.modalService.show(
      ConfirmModalComponent,
      this.modalConfig
    );

    this.modalRef.content.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.store.dispatch(new fromDonations.DonationsDeleted({ uuid: uuid }));
        }
      });
  }

}
