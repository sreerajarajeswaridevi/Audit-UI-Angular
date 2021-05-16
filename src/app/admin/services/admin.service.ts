import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SHA256 } from 'crypto-js';
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
    const enc = SHA256(user.password).toString();
    return this.http.get(
      `${environment.apiUrl}?api=addUser`,
      { params: {
          "add_username": `${user.username}@${user.temple_code}`,
          "add_password": enc,
          "add_role": user.role,
          "add_email": user.email
        }
      }
    );
  }

  deleteUser(username: string) {
    return this.http.get(
      `${environment.apiUrl}?api=deleteUser`,
      {
        params: {
          'delete_username': username
        }
      }
    );
  }

  getTempleList() {
    return this.http.get(
      `${environment.apiUrl}?api=listTemples`
    );
  }

  addTemple(temple: any) {
    return this.http.get(
      `${environment.apiUrl}?api=addTemple`,
      {
        params: {
          ...temple
        }
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

  addAdminPrivileges(uid: string) {
    return of(uid);
  }

  removeAdminPrivileges(uid: string) {
    return of(uid);
  }
}
