import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/auth/models/user.model';
import { getUser } from 'src/app/auth/store/auth.selectors';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {
  @Input() users: any[];
  @Output() userSelected = new EventEmitter<any>();
  @Output() addUser = new EventEmitter<any>();
  @Output() deleteUser = new EventEmitter<any>();
  loggedInUser: User;
  cardView = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(getUser).subscribe((user: User) => {
      this.loggedInUser = user;
    })
  }

  onUserSelected(user: any) {
    this.userSelected.emit(user);
  }

  onAddUser(event: any) {
    this.addUser.emit(event);
  }

  onDeleteUser(user: any) {
    this.deleteUser.emit(user);
  }

  trackByFn(index: any) {
    return index;
  }

  getColor(role: string) {
    switch(role) {
      case 'admin':
        return 'red';
        case 'manager':
          return 'orange';
        default:
          return 'blue'
    }
  }

}
