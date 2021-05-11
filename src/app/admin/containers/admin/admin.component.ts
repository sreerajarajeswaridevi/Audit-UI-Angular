import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../app/reducers';

import * as fromAdmin from '../../store/admin.actions';
import { Observable } from 'rxjs';
import {
  getTemplesList,
  getUsersList,
  getUsersListLoading
} from '../../store/admin.selectors';
import { User } from '../../../auth/models/user.model';
import { map, delay, take } from 'rxjs/operators';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { Customer } from '../../../customers/models/customer.model';
import { UserModalComponent } from 'src/app/shared/components/user-modal/user-modal.component';
import { getUser } from 'src/app/auth/store/auth.selectors';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private modalService: MDBModalService
  ) {}

  users$: Observable<any>;
  userCustomers$: Observable<Customer[]>;
  usersListLoading$: Observable<boolean>;
  userProjectsLoading$: Observable<boolean>;
  userCustomersLoading$: Observable<boolean>;
  selectedUser$: Observable<any>;
  selectedUser: any;
  uid: any;
  templeList: any;
  isAdmin = false;

  private modalRef: MDBModalRef;

  modalConfig = {
    class: 'modal-dialog-centered'
  };

  ngOnInit() {
    this.users$ = this.store.pipe(
      select(getUsersList),
      delay(0),
      map((users: User[]) => {
        if (!users || (users && users.length === 0)) {
          this.store.dispatch(new fromAdmin.GetUsersList());
        }
        return users;
      })
    );
    this.usersListLoading$ = this.store.select(getUsersListLoading);
    this.store.select(getTemplesList).subscribe((temples: any[]) => {
      this.templeList = temples;
    })
    this.store.select(getUser).subscribe((user: any) => {
      this.isAdmin = user.isAdmin;
    })
  }


  openAddUserModal() {
    this.modalRef = this.modalService.show(
      UserModalComponent,
      {...this.modalConfig,
      data: {
        heading: 'Add User',
        templeList: this.templeList
      }}
    );

    this.modalRef.content.userData
      .pipe(take(1))
      .subscribe((user: User) => {
        if (user) {
          this.store.dispatch(
            new fromAdmin.AddUser({
              user
            })
          );
        }
      });
  }

  openUserDeleteConfirmModal(user: User) {
    this.modalRef = this.modalService.show(
      ConfirmModalComponent,
      this.modalConfig
    );

    this.modalRef.content.confirmation
      .pipe(take(1))
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.store.dispatch(
            new fromAdmin.DeleteUser({ user })
          );
        }
      });
  }

  onDeleteUser(user: User) {
    console.log('user', user)
    this.openUserDeleteConfirmModal(user);
  }

}
