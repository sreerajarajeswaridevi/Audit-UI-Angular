import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { starSigns } from 'src/app/poojas/models/poojas.model';
import { isManager } from '../../auth/store/auth.selectors';
import { AppState } from 'src/app/reducers';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { Donations } from '../models/donations.model';
import { getDonations, getIsLoading } from '../store/donations.selectors';
import * as fromDonations from '../store/donations.actions';


var moment = require('../../../assets/datepicker/moment.js');

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {
  @ViewChild('donationForm', { static: true }) donationForm: NgForm;


  isManager$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  donationDate = moment();
  defaultDate = moment();
  startDate = moment().subtract(60, 'days');
  endDate = moment().add('30', 'days');
  selectedDate = moment();

  donation: any = {
    ist_YYYYMMDD: moment().format('YYYY-MM-DD')
  };
  expenseData: Subject<any> = new Subject();
  heading: string;
  price: number;
  starSigns = starSigns;
  private modalRef: MDBModalRef;

  todaysDonationList: Donations[] = [];


  modalConfig = {
    class: 'modal-dialog-centered'
  };

  get formattedDate() {
    return this.selectedDate.format('dddd DD/MM/YYYY');
  }

  constructor(
    private store: Store<AppState>,
    private modalService: MDBModalService

  ) { }

  ngOnInit(): void {
    this.store.select(getDonations).subscribe((exp: Donations[]) => {
      this.todaysDonationList = exp;
    });
    this.isLoading$ = this.store.select(getIsLoading);
    this.isManager$ = this.store.select(isManager);
    this.store.dispatch(new fromDonations.DonationsQuery(this.selectedDate.format('YYYY-MM-DD')));
  }

  dateClicked(date: any) {
    console.log(date);
  }

  donDatePicked(date: any) {
    this.donationDate = date;
    this.donation.ist_YYYYMMDD = date.format('YYYY-MM-DD');
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
    this.store.dispatch(new fromDonations.DonationsAddQuery(this.donation));
    this.resetForm();
  }
  
  getTotalAmount() {
    if (this.todaysDonationList && this.todaysDonationList.length > 0) {
      return this.todaysDonationList.reduce(((prev, current: any) => +(current.cost) + prev), 0);
    }
    return '0';
  }
  
  selectStar(star: string) {
    this.donation.nakshatram = star;
  }

  resetForm() {
    this.donationForm.reset(); 
    this.donation = {
      ist_YYYYMMDD: moment().format('YYYY-MM-DD')
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
