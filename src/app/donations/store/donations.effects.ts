import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DonationsService } from '../services/donations.service';
import { DonationsActionTypes } from './donations.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Donations } from '../models/donations.model';

import * as fromDonations from './donations.actions';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { getUser } from '../../auth/store/auth.selectors';

@Injectable()
export class DonationsEffects {

  constructor(private actions$: Actions, private donationsService: DonationsService, private store: Store<AppState>) {}

  @Effect()
  query$ = this.actions$.pipe(
    ofType(DonationsActionTypes.POOJAS_QUERY),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) => this.donationsService.get(user.temple_code)
      .pipe(
        map((data: any) => {
          const DonationsData: Donations[] = data.map((res: any) => {
            const key = res.payload.key;
            const customer: Donations = res.payload.val();
            return {
              key: key,
              id: customer.id,
              name: customer.name,
              description: customer.description
            };
          });
          return (new fromDonations.DonationsLoaded({ Donations: DonationsData }));
        }),
        catchError(error => {
          return of(new fromDonations.DonationsError({ error }));
        })
      )
    ),
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(DonationsActionTypes.POOJAS_ADDED),
    map((action: fromDonations.DonationsAdded) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.donationsService.add(payload.customer, user.temple_code))
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(DonationsActionTypes.POOJAS_EDITED),
    map((action: fromDonations.DonationsEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.donationsService.update(payload.customer, user.temple_code)
    .pipe(
      catchError( error => {
      return of(new fromDonations.DonationsError({ error }));
    }))
    )
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(DonationsActionTypes.POOJAS_DELETED),
    map((action: fromDonations.DonationsDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.donationsService.delete(payload.customer, user.temple_code))
  );
}
