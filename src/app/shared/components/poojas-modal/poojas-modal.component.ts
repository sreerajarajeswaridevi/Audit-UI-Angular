import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { NewPoojaResponse, Poojas, starSigns } from 'src/app/poojas/models/poojas.model';
// import { MDBModalRef } from 'angular-bootstrap-md';
// import { Poojas } from '../../../poojas/models/poojas.model';
// import { Subject } from 'rxjs';
// import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-poojas-modal',
  templateUrl: './poojas-modal.component.html',
  styleUrls: ['./poojas-modal.component.scss']
})
export class PoojasModalComponent implements OnInit {
  @ViewChild('poojasForm', { static: true }) poojasForm: NgForm;
  
  pooja: Poojas = {};
  poojasData: Subject<Poojas> = new Subject();
  heading: string;
  price: number;
  starSigns = starSigns;
  response: NewPoojaResponse  = {
    phoneNumber: '',
    address: '',
    persons: [],
    totalPrice: 0
  }

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  onClose() {
    this.modalRef.hide();
  }

  onSave() {
    if (this.poojasForm.valid && this.response.persons.length > 0) {
      this.poojasData.next(this.response);
      this.modalRef.hide();
    } else {
      const controls = this.poojasForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
    }
  }

  selectStar(star: string) {
    this.pooja.star = star;
  }

  deletePooja(item: any) {
    this.response.persons.splice(this.response.persons.indexOf(item), 1);
  }

  addPerson() {
    this.response.persons.push(this.poojasForm.value);
    this.response.totalPrice += this.price;
    this.poojasForm.reset();
  }
}
