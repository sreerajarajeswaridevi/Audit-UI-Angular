import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';
// import * as firebase from 'firebase/app';
// import { AngularFireDatabase } from '@angular/fire/database';
import { mockUser } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(username: string, password: string) {
    return of([username, password]);
    // return from(this.afAuth.auth.createUserWithUsernameAndPassword(username, password));
  }

  updateProfile(displayName: string, photoUrl: string) {
    // const userProfile = this.afAuth.auth.currentUser;
    return of([displayName, photoUrl]);
    // if (userProfile) {
    //   return <any>from(userProfile.updateProfile( { displayName: displayName, photoURL: photoUrl }));
    // }
  }

  login(username: string, password: string) {
    return this.http.get(
      `${environment.apiUrl}/login`,
      {
        params: {
          'email': 'eve.holt@reqres.in' || username,
          'password': 'cityslicka' || password
        }
      }
    );
  }


  logout(uid: any) {
    // this.updateOnlineStatus(uid, false);
    // return from(this.afAuth.auth.signOut());
    return of(uid);
  }

  getUser() {
    // const users = this.db.object('users/' + user.uid);
    const data = {
      user: {
        ...mockUser.user,
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
      }
    };
    if (data.user.username && data.user.password) {
      return of(data);
    } else {
      return of(null);
    }
  }

  saveUser(username: string, password: string) {
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
    return of({ username, password });
  }

  clearLocalData() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

  updateOnlineStatus(uid: string, status: boolean) {
    // if (status) {
    //   this.db.database.ref().child('users/' + uid).onDisconnect().update( { isOnline: false });
    // }
    // return from(this.db.object('users/' + uid).update({ isOnline: status }));
    return of([uid, status]);
  }

  checkUserRole(isAdmin: boolean) {
    // return this.db.object('admins/' + uid).valueChanges();
    return of(isAdmin);
  }

  getAuthState() {
    // return this.afAuth.authState;
    return of(null); //modify this for logged in state
  }

  getCurrentUser() {
    // return this.afAuth.auth.currentUser;
    return of(null);
  }
}
