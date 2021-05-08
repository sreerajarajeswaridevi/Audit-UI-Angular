import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { starSigns } from 'src/app/poojas/models/poojas.model';
import { AppState } from 'src/app/reducers';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { getIsLoading } from '../store/donations.selectors';
var moment = require('../../../assets/datepicker/moment.js');

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {
  @ViewChild('donationForm', { static: true }) donationForm: NgForm;
  
  
  isLoading$: Observable<boolean>;
  defaultDate = moment();
  startDate = moment();
  endDate = moment().add('30', 'days');
  selectedDate = moment().format('dddd DD/MM/YYYY');
  donation: any = {};
  expenseData: Subject<any> = new Subject();
  heading: string;
  price: number;
  starSigns = starSigns;
  private modalRef: MDBModalRef;

  
  modalConfig = {
    class: 'modal-dialog-centered'
  };

  constructor(
    private store: Store<AppState>,
    private modalService: MDBModalService

  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getIsLoading);
    // this.donationForm.controls.date.setValue(this.defaultDate.format('dddd DD/MM/YYYY'));
  }
  
  datePicked(date: any) {
    this.donationForm.controls.date.setValue(date.format('dddd DD/MM/YYYY'));
  }

  dateClicked(date: any) {
    console.log(date);
  }

  
  onSave() {
    if (this.donationForm.valid) {
      this.openDonationConfirmModal();
      //send to api
    } else {
      const controls = this.donationForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
    }
  }

  selectStar(star: string) {
    this.donation.star = star;
  }
  
  openDonationConfirmModal() {
    this.modalRef = this.modalService.show(
      ConfirmModalComponent,
      this.modalConfig
    );

    this.modalRef.content.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          //api to save conation
        }
      });
  }

}
