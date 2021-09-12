import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/auth/models/user.model';
import { getUser } from 'src/app/auth/store/auth.selectors';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {
  @Input() user: any;
  @Output() userSelected = new EventEmitter<any>();

  @Output() removeUser = new EventEmitter<any>();

  loggedInUser: User;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(getUser).subscribe((user: User) => {
      this.loggedInUser = user;
    })
  }

  selectUser() {
    this.userSelected.emit(this.user);
  }

  deleteUser() {
    this.removeUser.emit(this.user);
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
