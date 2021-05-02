import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PoojasService } from '../services/poojas.service';
import { PoojasActionTypes } from './poojas.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Poojas } from '../models/poojas.model';

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
    switchMap(([]: any) => this.poojasService.getPoojas()
      .pipe(
        map((list: any) => {
          const PoojasData: Poojas[] = list.data.map((res: any) => {
            return {
              year: res.year,
              id: res.id,
              name: res.name,
              color: res.color,
              pantone_value: res.pantone_value,

              price: 20
            };
          });
          return (new fromPoojas.PoojasLoaded({ poojas: PoojasData }));
        }),
        catchError(error => {
          this.toastr.error('Something went wrong. Please try after sometime');
          return of(new fromPoojas.PoojasError({ error }));
        })
      )
    ),
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(PoojasActionTypes.POOJAS_ADDED),
    map((action: fromPoojas.PoojasAdded) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.poojasService.add(payload.customer, user.temple))
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
