import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  @ViewChild('userForm', { static: true }) userForm: NgForm;

  heading: string;
  user: User = { username: '', password: '', email:'', role: '', temple: ''};

  userData: Subject<User> = new Subject();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  onSave() {
    if (this.userForm.valid) {
      this.userData.next(this.user);
    this.modalRef.hide();
    } else {
      const controls = this.userForm.controls;
      Object.keys(controls).forEach( controlName => controls[controlName].markAsTouched());
    }
  }

}
