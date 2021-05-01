import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/database';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  selectedUser = new Subject();
  selectedUser$ = this.selectedUser.asObservable();

  getUsersList() {
    
    return of(true);
  }

  getUserProjects(uid: string) {
    return of(uid);
  }

  getUserCustomers(uid: string) {
    return of(uid);
  }

  checkAdminRole(uid: string) {
    return of(uid);
  }

  deleteUserProject(uid: string, projectId: string) {
    return of([uid, projectId]);
  }

  deleteUserCustomer(uid: string, customerId: string) {
    return of([uid, customerId]);

  }

  addAdminPrivileges(uid: string) {
    return of(uid);
  }

  removeAdminPrivileges(uid: string) {
    return of(uid);
  }
}
