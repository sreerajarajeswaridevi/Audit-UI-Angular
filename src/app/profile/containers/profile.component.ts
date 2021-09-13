import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../auth/models/user.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { getUser } from '../../auth/store/auth.selectors';
import * as fromAuth from './../../auth/store/auth.actions';
import { getUsersList } from 'src/app/admin/store/admin.selectors';
import { delay, map, take } from 'rxjs/operators';
import * as fromAdmin from '../../admin/store/admin.actions';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { UserModalComponent } from 'src/app/shared/components/user-modal/user-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User | null>;
  public user: User;
  users$: Observable<any>;
  usersListLoading$: Observable<boolean>;
  private modalRef: MDBModalRef;
  pageSize = 'A4';
  duplicatePage = 'same';

  modalConfig = {
    class: 'modal-dialog-centered'
  };

  constructor(private store: Store<AppState>,
    private modalService: MDBModalService
    ) { 
    this.store.select(getUser).subscribe((user: User) => {
      this.user = user;
    })
  }

  ngOnInit() {
    this.user$ = this.store.select(getUser);
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
    if (localStorage.getItem('printerPageSize')) {
      this.pageSize = localStorage.getItem('printerPageSize') + '';
    }
    if (localStorage.getItem('duplicateCopyPage')) {
      this.duplicatePage = localStorage.getItem('duplicateCopyPage') + '';
    }
  }

  updateProfile(userData: any) {
    this.store.dispatch(new fromAuth.UpdateProfile(userData));
  }

  logoutUser(user: User) {
    this.store.dispatch(new fromAuth.LogoutRequested({ user }));
  }

  
  openAddUserModal() {
    this.modalRef = this.modalService.show(
      UserModalComponent,
      {...this.modalConfig,
      data: {
        heading: 'Add User',
        templeList: [{
          temple_name: this.user.temple_name,
          temple_code: this.user.temple_code
        }]
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
    this.openUserDeleteConfirmModal(user);
  }

  setPageSize(size: string) {
    this.pageSize = size;
    localStorage.setItem('printerPageSize', size);
  }

  setDuplicateCopyPage(page: string) {
    this.duplicatePage = page;
    localStorage.setItem('duplicateCopyPage', page);
  }

}
