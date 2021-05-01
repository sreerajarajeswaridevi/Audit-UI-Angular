import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  
  @ViewChild('basicModal', { static: true }) basicModal: any;

  poojas: Poojas = {};

  ngOnInit() {
  }

  onClose() {
    this.basicModal.hide();
  }

  onSave() {
    if (this.poojasForm.valid) {
      // this.poojasData.next(this.poojas);
      this.basicModal.hide();
    } else {
      const controls = this.poojasForm.controls;
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
    }
  }

  public show = () => {
    this.basicModal.show();
  }
}
