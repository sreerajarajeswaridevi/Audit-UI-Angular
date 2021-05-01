import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { Poojas } from 'src/app/poojas/models/poojas.model';
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

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  onClose() {
    this.modalRef.hide();
  }

  onSave() {
    if (this.poojasForm.valid) {
      this.poojasData.next(this.pooja);
      this.modalRef.hide();
    } else {
      const controls = this.poojasForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
    }
  }
}
