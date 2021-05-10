import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/database';
import { of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  selectedUser = new Subject();
  selectedUser$ = this.selectedUser.asObservable();

  getUsersList() {
    // original users list api call goes here
    return this.http.get(
      `${environment.apiUrl}?api=listUsers`
    );
  }

  // addPooja(temple: any) {
  //   return this.http.post(
  //     `${environment.apiUrl}/users`,
  //     {
  //       ...temple
  //     }
  //   );
  // }

  
  addUser(user: any) {
    return this.http.post(
      `${environment.apiUrl}?api=addUser`,
      // {
      //   ...user
      // }
      {
        "add_username": `${user.username}@${user.temple}`,
        "add_password": user.password,
        "add_role": user.role,
        "add_email": user.email,
      }
    );
  }

  getTempleList() {
    return this.http.get(
      `${environment.apiUrl}?api=listTemples`
    );
  }

  addTemple(temple: any) {
    return this.http.post(
      `${environment.apiUrl}?api=addTemple`,
      {
        ...temple
      }
    );
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

  deleteUser(user: string) {
    console.log('deleted', user);
    return this.http.get(
      `${environment.apiUrl}/users/2`
    );
  }

  addAdminPrivileges(uid: string) {
    return of(uid);
  }

  removeAdminPrivileges(uid: string) {
    return of(uid);
  }
}
