import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable, of, defer } from 'rxjs';
import { map, switchMap, catchError, tap, take, mergeMap } from 'rxjs/operators';

import * as auth from './../store/auth.actions';
import { mockUser } from '../models/user.model';
// import { GravatarService } from '../../shared/services/gravatar.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  // @Effect()
  // registerAction$ = this.actions$.pipe(
  //   ofType(auth.AuthActionTypes.REGISTER_REQUESTED),
  //   map((action: auth.RegisterRequested) => action.payload),
  //   switchMap(payload =>
  //     this.authService.register(payload.username, payload.password).pipe(
  //       map((res: any) => {
  //         const gravatarUrl = this.gravatarService.getUserGravatar(res.user.username);
  //         const user = {
  //           uid: res.user.temple,
  //           displayName: payload.username || res.user.displayName,
  //           username: res.user.username,
  //           password: res.user.password,
  //           email: res.user.email,
  //           photoUrl: res.user.photoURL || gravatarUrl,
  //           isAdmin: false
  //         };
  //         return user;
  //       }),
  //       switchMap((user: User) => {
  //         return [
  //           new auth.RegisterCompleted(),
  //           new auth.LoginSuccess({ user }),
  //           new auth.SaveUser({ user })
  //         ];
  //       }),
  //       tap(() => { this.router.navigateByUrl(''); }),
  //       catchError(error => {
  //         this.toastr.error('Auth Error. Please try after sometime');
  //         this.authService.clearLocalData();
  //         return of(new auth.AuthError({ error }))
  //       })
  //     )
  //   )
  // );

  @Effect({ dispatch: false })
  saveUser$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.SAVE_USER),
    map((action: auth.SaveUser) => action.payload),
    switchMap((payload: any) => this.authService.saveUser(payload.user.username, payload.user.password, payload.user.role))
  );

  @Effect({ dispatch: false })
  updateOnlineStatus$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.UPDATE_ONLINE_STATUS),
    map((action: auth.UpdateOnlineStatus) => action.payload),
    switchMap((payload: any) => this.authService.updateOnlineStatus(payload.uid, payload.status))
  );

  @Effect()
  checkUserRole$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.CHECK_USER_ROLE),
    map((action: auth.CheckUserRole) => action.payload),
    switchMap(() => this.authService.checkUserRole()
      .pipe(
        map((isAdmin: boolean) => {
          return new auth.UpdateUserRole({ isAdmin });
        }),
          catchError((error: any) => {
            this.toastr.error('Auth Error. Please try after sometime'); 
            return of(new auth.AuthError({ error }))})
      )
    )
  );

  @Effect()
  updateProfile$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.UPDATE_PROFILE),
    map((action: auth.UpdateProfile) => action.payload),
    mergeMap((payload: any) =>
      this.authService.updateProfile(payload.displayName, payload.photoUrl).pipe(
        map(() => {
          const currentUser: any = this.authService.getCurrentUser();
          const updatedUser: any = {
            uid: currentUser.uid || null,
            displayName: currentUser.displayName || null,
            username: currentUser.username || null,
            photoUrl: currentUser.photoURL || null
          };
          return new auth.UpdateProfileSuccess({ user: updatedUser });
        }),
        catchError((error) => {
          this.toastr.error('Auth Error. Please try after sometime');
          return of(new auth.AuthError(error))})
      )
    )
  );


  @Effect()
  loginAction$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.LOGIN_REQUESTED),
    map((action: auth.LoginRequested) => action.payload),
    switchMap(payload => this.authService.login(payload.username, payload.password).pipe(
      map((res: any) => {
        if (res && !res.hasOwnProperty('role')) {
          this.authService.clearLocalData();
          return of(new auth.AuthError({ error: 'Username and password do not match' }));
        }
        const user = {
          temple_name: res.temple_name,
          temple_code: res.temple_code,
          displayName: payload.username,
          photoUrl: mockUser.user.photoUrl,
          isAdmin: res.role === 'admin',
          role: res.role,
          email: res.email,
          username: payload.username,
          password: payload.password
        };
        return new auth.LoginSuccess({ user });
      }),
      map((user: any) => user.payload.user),
      switchMap((user: any) => {
        console.log('login complete');
        console.log({ user });
        this.authService.saveUser(user.username, user.password, user.role);
        return [new auth.LoginSuccess({ user }), new auth.SaveUser({ user }), new auth.CheckUserRole({ isAdmin: user.isAdmin })];
      }),
      tap(() => this.router.navigateByUrl('')),
      catchError(error => { 
        this.toastr.error('Login failed. Please check your username and password.');
        this.authService.clearLocalData(); return of(new auth.AuthError({ error })) })
    )
    )
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.LOGIN_SUCCESS),
    map((action: auth.SaveUser) => action.payload),
    switchMap((payload: any) => {
      return [
        new auth.CheckUserRole({ isAdmin: payload.user.isAdmin })
      ];
    })
  );

  @Effect()
  logoutAction$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.LOGOUT_REQUESTED),
    map((action: auth.LogoutRequested) => action.payload),
    switchMap((payload: any) => {
      console.log('payload', payload);
      return this.authService.logout(payload.user.username)
        .pipe(
          map(() => new auth.LogoutCompleted()),
          tap(() => this.authService.clearLocalData()),
          tap(() => this.router.navigateByUrl('')),
          catchError(error => {
            this.toastr.error('Auth Error. Please try after sometime');
            return of(new auth.AuthError({ error }));
          }
          )
        )
    }
    )
  );

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.GET_USER),
    switchMap(() => this.authService.getUser()
      .pipe(
        take(1),
        map((authData: any) => {
          if (authData) {
            const user = {
              temple_code: authData.temple_code,
              temple_name: authData.temple_name,
              displayName: authData.username,
              photoUrl: authData.photoURL,
              username: authData.username,
              password: authData.password,
              email: authData.email
            };
            return new auth.LoginSuccess({ user });
          } else {
            return new auth.LoginFailed();
          }
        }),
        catchError(error => {
          this.toastr.error('Auth Error. Please try after sometime');
          return of(new auth.AuthError({ error }))})
      )
    )
  );

  @Effect()
  init$: Observable<any> = defer(() => {
    return of(new auth.GetUser());
  });
}
