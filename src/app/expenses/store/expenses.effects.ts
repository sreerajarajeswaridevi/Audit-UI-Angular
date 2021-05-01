import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ExpensesService } from '../services/expenses.service';
import { ExpensesActionTypes } from './expenses.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Expenses } from '../models/expenses.model';

import * as fromExpenses from './expenses.actions';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { getUser } from '../../auth/store/auth.selectors';

@Injectable()
export class ExpensesEffects {

  constructor(private actions$: Actions, private expensesService: ExpensesService, private store: Store<AppState>) {}

  @Effect()
  query$ = this.actions$.pipe(
    ofType(ExpensesActionTypes.POOJAS_QUERY),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) => this.expensesService.get(user.uid)
      .pipe(
        map((data: any) => {
          const ExpensesData: Expenses[] = data.map((res: any) => {
            const key = res.payload.key;
            const customer: Expenses = res.payload.val();
            return {
              key: key,
              id: customer.id,
              name: customer.name,
              description: customer.description
            };
          });
          return (new fromExpenses.ExpensesLoaded({ Expenses: ExpensesData }));
        }),
        catchError(error => {
          return of(new fromExpenses.ExpensesError({ error }));
        })
      )
    ),
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(ExpensesActionTypes.POOJAS_ADDED),
    map((action: fromExpenses.ExpensesAdded) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.expensesService.add(payload.customer, user.uid))
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(ExpensesActionTypes.POOJAS_EDITED),
    map((action: fromExpenses.ExpensesEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.expensesService.update(payload.customer, user.uid)
    .pipe(
      catchError( error => {
      return of(new fromExpenses.ExpensesError({ error }));
    }))
    )
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(ExpensesActionTypes.POOJAS_DELETED),
    map((action: fromExpenses.ExpensesDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.expensesService.delete(payload.customer, user.uid))
  );
}
