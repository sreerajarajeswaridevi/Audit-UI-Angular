import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
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

}
