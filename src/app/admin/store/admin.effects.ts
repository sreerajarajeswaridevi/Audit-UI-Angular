import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromAdmin from './../store/admin.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AdminService } from '../services/admin.service';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AdminEffects {

  constructor(
    private actions$: Actions, 
    private adminService: AdminService,
    private toastr: ToastrService
    ) { }

  @Effect()
  getUsersList$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.GET_USERS_LIST),
    switchMap( () => this.adminService.getUsersList()
      .pipe(
        map( (users: any) => {
          const usersList: any[] = users.userList.map((res: any) => {
            return {
              ...res,
              avatar: 'https://img.icons8.com/bubbles/2x/user-male.png',
              isAdmin: res.role === 'admin'
            };
          });
          return (new fromAdmin.UsersListFetched({ usersList }));
        }),
        catchError( (error: any) => {
          this.toastr.error('Something went wrong. Please try after sometime');
          return of(new fromAdmin.AdminError({ error }))})
      )
    )
  );


  @Effect()
  deleteUser$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.DELETE_USER),
    map( (action: fromAdmin.DeleteUser) => action.payload),
    switchMap( (payload: any) => this.adminService.deleteUser(payload.user.username)
      .pipe(map(() => {
        return (new fromAdmin.GetUsersList());
        }),
        catchError( (error: any) => {
          this.toastr.error('Something went wrong. Please try after sometime');
          return of(new fromAdmin.AdminError({ error }))})
      )
    )
  );

  @Effect()
  addUser$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.ADD_USER),
    map( (action: fromAdmin.AddUser) => action.payload),
    switchMap( (payload: any) => this.adminService.addUser(payload.user)
      .pipe(map((res) => {
        console.log('result came', res);
        return (new fromAdmin.GetUsersList());
        }),
        catchError( (error: any) => {
          this.toastr.error('Something went wrong. Please try after sometime');
          return of(new fromAdmin.AdminError({ error }))})
      )
    )
  );

  //  @Effect({ dispatch: false })
  // addAdminPrivileges$ = this.actions$.pipe(
  //   ofType(fromAdmin.AdminActionTypes.ADD_ADMIN_PRIVILEGES),
  //   map( (action: fromAdmin.AddAdminPrivileges) => action.payload),
  //   switchMap( (payload: any) => this.adminService.addAdminPrivileges(payload.userId)
  //     .pipe(
  //       catchError( (error: any) => of(new fromAdmin.AdminError({ error })))
  //     )
  //   )
  // );

  @Effect()
  getTemples$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.GET_TEMPLES),
    switchMap( () => this.adminService.getTempleList()
      .pipe(
        map((data: any) => {
          return (new fromAdmin.TemplesLoaded({ temples: data.templeList }));
        }),
        catchError((error) => {
          this.toastr.error('Something went wrong. Please try after sometime');
          return of(new fromAdmin.AdminError({ error }));
        })
      )
    )
  );

  
  @Effect()
  addTemple$ = this.actions$.pipe(
    ofType(fromAdmin.AdminActionTypes.ADD_TEMPLE_QUERY),
    map((action: fromAdmin.AddTemple) => action.payload),
    switchMap((payload: any) => {
      console.log(payload);
      return this.adminService.addTemple(payload.temple)
    .pipe(
      map((list: any) => {
        console.log(list.data);
        return (new fromAdmin.GetTemples());
      }),
      catchError(error => {
        this.toastr.error('Something went wrong. Please try after sometime');
        return of(new fromAdmin.AdminError({ error }));
      })
    )}
    
    )
  );


  // @Effect({ dispatch: false })
  // deleteUserProject$ = this.actions$.pipe(
  //   ofType(fromAdmin.AdminActionTypes.DELETE_USER_PROJECT),
  //   map( (action: fromAdmin.DeleteUserProject) => action.payload),
  //   switchMap( (payload: any) => this.adminService.deleteUserProject(payload.userId, payload.projectId)
  //     .pipe(
  //       catchError( (error: any) => of(new fromAdmin.AdminError({ error })))
  //     )
  //   )
  // );

  // @Effect()
  // getUserCustomers$ = this.actions$.pipe(
  //   ofType(fromAdmin.AdminActionTypes.GET_USER_CUSTOMERS),
  //   map((action: fromAdmin.GetUserCustomers) => action.payload),
  //   mergeMap( (payload: any) => this.adminService.getUserCustomers(payload.uid)
  //     .pipe(
  //       map((data: any) => {
  //         const customersData: Customer[] = data.map((res: any) => {
  //           const key = res.payload.key;
  //           const customer: Customer = res.payload.val();
  //           return {
  //             key: key,
  //             id: customer.id,
  //             name: customer.name,
  //             description: customer.description
  //           };
  //         });
  //         return (new fromAdmin.UserCustomersLoaded({ uid: payload.uid, userCustomers: customersData }));
  //       }),
  //       catchError(error => of(new fromAdmin.AdminError({ error })))
  //     )
  //   )
  // );

  // @Effect({ dispatch: false })
  // deleteUserCustomer$ = this.actions$.pipe(
  //   ofType(fromAdmin.AdminActionTypes.DELETE_USER_CUSTOMER),
  //   map( (action: fromAdmin.DeleteUserCustomer) => action.payload),
  //   switchMap( (payload: any) => this.adminService.deleteUserCustomer(payload.userId, payload.customerId)
  //     .pipe(
  //       catchError( (error: any) => of(new fromAdmin.AdminError({ error })))
  //     )
  //   )
  // );

  // @Effect({ dispatch: false })
  // addAdminPrivileges$ = this.actions$.pipe(
  //   ofType(fromAdmin.AdminActionTypes.ADD_ADMIN_PRIVILEGES),
  //   map( (action: fromAdmin.AddAdminPrivileges) => action.payload),
  //   switchMap( (payload: any) => this.adminService.addAdminPrivileges(payload.userId)
  //     .pipe(
  //       catchError( (error: any) => of(new fromAdmin.AdminError({ error })))
  //     )
  //   )
  // );

  // @Effect({ dispatch: false })
  // removeAdminPrivileges$ = this.actions$.pipe(
  //   ofType(fromAdmin.AdminActionTypes.REMOVE_ADMIN_PRIVILEGES),
  //   map( (action: fromAdmin.RemoveAdminPrivileges) => action.payload),
  //   switchMap( (payload: any) => this.adminService.removeAdminPrivileges(payload.userId)
  //     .pipe(
  //       catchError( (error: any) => of(new fromAdmin.AdminError({ error })))
  //     )
  //   )
  // );
}
