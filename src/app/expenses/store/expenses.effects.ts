import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ExpensesService } from '../services/expenses.service';
import { ExpensesActionTypes } from './expenses.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import * as fromExpenses from './expenses.actions';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { getUser } from '../../auth/store/auth.selectors';

var moment = require('../../../assets/datepicker/moment.js');

@Injectable()
export class ExpensesEffects {

  constructor(private expenseService: ExpensesService,
    private actions$: Actions, private expensesService: ExpensesService, private store: Store<AppState>) {}

  @Effect()
  query$ = this.actions$.pipe(
    ofType(ExpensesActionTypes.EXPENSES_QUERY),
    switchMap((payload: any) => this.expensesService.get(payload)
      .pipe(
        map((data: any) => {
          return (new fromExpenses.ExpensesLoaded({ expenses: data.expensesList }));
        }),
        catchError(error => {
          return of(new fromExpenses.ExpensesError({ error }));
        })
      )
    ),
  );

  @Effect()
  added$ = this.actions$.pipe(
    ofType(ExpensesActionTypes.EXPENSES_ADD_QUERY),
    map((action: fromExpenses.ExpensesAddQuery) => action.payload),
    switchMap((payload: any) => this.expensesService.addExpenses(payload)
    .pipe(
      (map((response: any) => {
        this.expenseService.emitNewExpense(response.receipt_number);
        return (new fromExpenses.ExpensesQuery(moment().format('YYYY-MM-DD')));
      })),
      catchError(error => {
        return of(new fromExpenses.ExpensesError({ error }));
      })
    ))
  );

  @Effect()
  edit$ = this.actions$.pipe(
    ofType(ExpensesActionTypes.EXPENSES_EDITED),
    map((action: fromExpenses.ExpensesEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) => this.expensesService.update(payload.customer, user.temple_code)
    .pipe(
      catchError( error => {
      return of(new fromExpenses.ExpensesError({ error }));
    }))
    )
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofType(ExpensesActionTypes.EXPENSES_DELETED),
    map((action: fromExpenses.ExpensesDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload]: any) => this.expensesService.deleteExpense(payload.uuid)
    .pipe(
      (map(() => {
        return (new fromExpenses.ExpensesQuery(moment().format('YYYY-MM-DD')));
      })),
      catchError(error => {
        return of(new fromExpenses.ExpensesError({ error }));
      })
    ))
  );
}
