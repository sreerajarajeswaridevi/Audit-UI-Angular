import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PoojasService } from '../services/poojas.service';
import { PoojasActionTypes } from './poojas.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
// import { Poojas } from '../models/poojas.model';

import * as fromPoojas from './poojas.actions';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { getUser } from '../../auth/store/auth.selectors';
import { getPoojas } from './poojas.selectors';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class PoojasEffects {

  constructor(
    private actions$: Actions,
    private poojasService: PoojasService,
    private store: Store<AppState>,
    private toastr: ToastrService
    ) {}

  @Effect()
  query$ = this.actions$.pipe(
    ofType(PoojasActionTypes.POOJAS_QUERY),
    withLatestFrom(this.store.pipe(select(getPoojas))),
    switchMap(([]: any) => this.poojasService.getPoojaTypes()
      .pipe(
        map((list: any) => {
          return (new fromPoojas.PoojasLoaded({ poojas: list.poojaTypesList }));
        }),
        catchError(error => {
          this.toastr.error('Something went wrong. Please try after sometime');
          return of(new fromPoojas.PoojasError({ error }));
        })
      )
    ),
  );

  @Effect()
  addPoojaType$ = this.actions$.pipe(
    ofType(PoojasActionTypes.POOJAS_ADD_QUERY),
    map((action: fromPoojas.PoojasAddQuery) => action.payload),
    // withLatestFrom(this.store.pipe(select(getPoojas))),
    switchMap((payload: any) => this.poojasService.addPoojaType(payload.poojas)
    .pipe(
      map((list: any) => {
        console.log(list.data);
        return (new fromPoojas.PoojasQuery());
      }),
      catchError(error => {
        this.toastr.error('Something went wrong. Please try after sometime');
        return of(new fromPoojas.PoojasError({ error }));
      })
    ))
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(PoojasActionTypes.POOJAS_EDITED),
    map((action: fromPoojas.PoojasEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.poojasService.update(payload.customer, user.temple)
    .pipe(
      catchError( error => {
        this.toastr.error('Something went wrong. Please try after sometime');
        return of(new fromPoojas.PoojasError({ error }));
    }))
    )
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(PoojasActionTypes.POOJAS_DELETED),
    map((action: fromPoojas.PoojasDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.poojasService.delete(payload.customer, user.temple))
  );
}
