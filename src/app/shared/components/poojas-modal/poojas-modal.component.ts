import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { NewPoojaRequest, PoojaTypes, starSigns } from 'src/app/poojas/models/poojas.model';
// import { MDBModalRef } from 'angular-bootstrap-md';
// import { Poojas } from '../../../poojas/models/poojas.model';
// import { Subject } from 'rxjs';
// import { NgForm } from '@angular/forms';
var moment = require('../../../../assets/datepicker/moment.js');
@Component({
  selector: 'app-poojas-modal',
  templateUrl: './poojas-modal.component.html',
  styleUrls: ['./poojas-modal.component.scss']
})
export class PoojasModalComponent implements OnInit {
  @ViewChild('poojasForm', { static: true }) poojasForm: NgForm;

  defaultDate = moment();
  startDate = moment();
  endDate = moment().add('30', 'days');
  selectedDate = moment();
  pooja: PoojaTypes = {};
  poojasData: Subject<NewPoojaRequest> = new Subject();
  heading: string;
  price: number;
  starSigns = starSigns;
  code: string;
  response: NewPoojaRequest  = {
    pooja_code: '',
    phone_number: '',
    address: '',
    bhakthar: [],
    pooja_price: '0',
    ist_YYYYMMDD: this.selectedDate.format('YYYY-MM-DD') 
  }

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.response.pooja_code = this.code;
  }

  onClose() {
    this.modalRef.hide();
  }

  datePicked(date: any) {
    console.log(date);
    this.response.ist_YYYYMMDD = date.format('YYYY-MM-DD');
    this.selectedDate = date; 
  }

  dateClicked(date: any) {
    console.log(date);
  }

  onSave() {
    if (this.response.bhakthar.length > 0) {
      this.poojasData.next(this.response);
      this.modalRef.hide();
    } else {
      const controls = this.poojasForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
    }
  }

  selectStar(star: string) {
    this.pooja.nakshatram = star;
  }

  deleteEntry(item: any) {
    this.response.bhakthar.splice(this.response.bhakthar.indexOf(item), 1);
  }

  addPerson() {
    this.response.bhakthar.push(this.poojasForm.value);
    this.response.pooja_price = `${+(this.price) + +(this.response.pooja_price)}`;
    this.poojasForm.reset();
  }
}
