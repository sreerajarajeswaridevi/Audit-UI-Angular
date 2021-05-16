import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/auth/models/user.model';
import { getUser } from 'src/app/auth/store/auth.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  @ViewChild('userForm', { static: true }) userForm: NgForm;

  heading: string;
  templeList: any[];
  isAdmin = false;
  user: User = { username: '', password: '', email:'', role: ''};

  userData: Subject<User> = new Subject();

  constructor(public modalRef: MDBModalRef, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(getUser).subscribe((user: any) => {
      this.isAdmin = user.isAdmin;
    })

    if (this.templeList.length === 1) {
      this.user.temple_code = this.templeList[0].temple_code;
    }
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
