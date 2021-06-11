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
import { getPoojaTypes } from './poojas.selectors';
import { ToastrService } from 'ngx-toastr';

var moment = require('../../../assets/datepicker/moment.js');

@Injectable()
export class PoojasEffects {

  constructor(
    private actions$: Actions,
    private poojasService: PoojasService,
    private store: Store<AppState>,
    private toastr: ToastrService
    ) {}

  @Effect()
  queryPoojaType$ = this.actions$.pipe(
    ofType(PoojasActionTypes.POOJA_TYPE_QUERY),
    withLatestFrom(this.store.pipe(select(getPoojaTypes))),
    switchMap(([]: any) => this.poojasService.getPoojaTypes()
      .pipe(
        map((list: any) => {
          return (new fromPoojas.PoojaTypesLoaded({ poojas: list.poojaTypesList }));
        }),
        catchError(error => {
          this.toastr.error('Something went wrong. Please try after sometime');
          return of(new fromPoojas.PoojasError({ error }));
        })
      )
    ),
  );

  @Effect()
  queryPoojas$ = this.actions$.pipe(
    ofType(PoojasActionTypes.POOJA_LIST_QUERY),
    map((action: any) => action.payload),
    switchMap((payload) => this.poojasService.getPoojas(payload)
      .pipe(
        map((list: any) => {
          return (new fromPoojas.PoojaListLoaded({ poojaList: list.poojaList }));
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
    ofType(PoojasActionTypes.POOJA_TYPE_ADD_QUERY),
    map((action: fromPoojas.PoojaTypeAddQuery) => action.payload),
    // withLatestFrom(this.store.pipe(select(getPoojaTypes))),
    switchMap((payload: any) => this.poojasService.addPoojaType(payload.poojas)
    .pipe(
      map((list: any) => {
        console.log(list.data);
        return (new fromPoojas.PoojasTypeQuery());
      }),
      catchError(error => {
        this.toastr.error('Something went wrong. Please try after sometime');
        return of(new fromPoojas.PoojasError({ error }));
      })
    ))
  );

  @Effect()
  addPooja$ = this.actions$.pipe(
    ofType(PoojasActionTypes.POOJA_ADD_QUERY),
    map((action: any) => action.payload),
    switchMap((payload: any) => this.poojasService.addPooja(payload.pooja)
    .pipe(
      map((list: any) => {
        console.log(list.data);
        return (new fromPoojas.PoojaListQuery(moment().format('YYYY-MM-DD')));
      }),
      catchError(error => {
        this.toastr.error('Something went wrong. Please try after sometime');
        return of(new fromPoojas.PoojasError({ error }));
      })
    ))
  );

  @Effect()
  edit$ = this.actions$.pipe(
    ofType(PoojasActionTypes.POOJA_TYPE_EDITED),
    map((action: fromPoojas.PoojaTypeEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.poojasService.update(payload.customer, user.temple_code)
    .pipe(
      catchError( error => {
        this.toastr.error('Something went wrong. Please try after sometime');
        return of(new fromPoojas.PoojasError({ error }));
    }))
    )
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofType(PoojasActionTypes.POOJA_TYPE_DELETED),
    map((action: fromPoojas.PoojaTypeDeleted) => action.payload),
    switchMap((pooja: any) => {
      return this.poojasService.deletePoojaType(pooja.pooja_code)
      .pipe(map(() => {
          return (new fromPoojas.PoojasTypeQuery());
          }),
          catchError( (error: any) => {
            this.toastr.error('Something went wrong. Please try after sometime');
            return of(new fromPoojas.PoojasError({ error }))})
        )}
    )
  );
}
