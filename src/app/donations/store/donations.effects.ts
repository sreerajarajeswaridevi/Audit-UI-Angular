import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DonationsService } from '../services/donations.service';
import { DonationsActionTypes } from './donations.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import * as fromDonations from './donations.actions';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { getUser } from '../../auth/store/auth.selectors';

var moment = require('../../../assets/datepicker/moment.js');
@Injectable()
export class DonationsEffects {

  constructor(private actions$: Actions, private donationsService: DonationsService, private store: Store<AppState>) {}

  
  @Effect()
  query$ = this.actions$.pipe(
    ofType(DonationsActionTypes.DONATIONS_QUERY),
    switchMap((payload: any) => this.donationsService.get(payload)
      .pipe(
        map((data: any) => {
          return (new fromDonations.DonationsLoaded({ donations: data.donationList }));
        }),
        catchError(error => {
          return of(new fromDonations.DonationsError({ error }));
        })
      )
    ),
  );

  @Effect()
  added$ = this.actions$.pipe(
    ofType(DonationsActionTypes.DONATIONS_ADD_QUERY),
    map((action: fromDonations.DonationsAddQuery) => action.payload),
    switchMap((payload: any) => this.donationsService.addDonations(payload)
    .pipe(
      (map(() => {
        return (new fromDonations.DonationsQuery(moment().format('YYYY-MM-DD')));
      })),
      catchError(error => {
        return of(new fromDonations.DonationsError({ error }));
      })
    ))
  );

  @Effect()
  edit$ = this.actions$.pipe(
    ofType(DonationsActionTypes.DONATIONS_EDITED),
    map((action: fromDonations.DonationsEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.donationsService.update(payload.customer, user.temple_code)
    .pipe(
      catchError( error => {
      return of(new fromDonations.DonationsError({ error }));
    }))
    )
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofType(DonationsActionTypes.DONATIONS_DELETED),
    map((action: fromDonations.DonationsDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload]: any) => this.donationsService.deleteExpense(payload.uuid)
    .pipe(
      (map(() => {
        return (new fromDonations.DonationsQuery(moment().format('YYYY-MM-DD')));
      })),
      catchError(error => {
        return of(new fromDonations.DonationsError({ error }));
      })
    ))
  );
}
