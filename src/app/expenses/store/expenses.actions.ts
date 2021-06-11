import { Action } from '@ngrx/store';
import { Expenses } from '../models/expenses.model';

export enum ExpensesActionTypes {
  EXPENSES_QUERY = '[Expenses] Query',
  EXPENSES_LOADED = '[Expenses] Fetched',

  EXPENSES_ADD_QUERY = '[Expenses] Added',
  EXPENSES_EDITED = '[Expenses] Edited',
  EXPENSES_DELETED = '[Expenses] Deleted',

  EXPENSES_ERROR = '[Expenses] Error'
}

export class ExpensesQuery implements Action {
  readonly type = ExpensesActionTypes.EXPENSES_QUERY;
  
  constructor(public payload: { date: any }) {}
}

export class ExpensesLoaded implements Action {
  readonly type = ExpensesActionTypes.EXPENSES_LOADED;

  constructor(public payload: { expenses: Expenses[] }) {}
}

export class ExpensesAddQuery implements Action {
  readonly type = ExpensesActionTypes.EXPENSES_ADD_QUERY;

  constructor(public payload: { expenses: Expenses }) {}
}

export class ExpensesEdited implements Action {
  readonly type = ExpensesActionTypes.EXPENSES_EDITED;

  constructor(public payload: { expenses: Expenses }) {}
}

export class ExpensesDeleted implements Action {
  readonly type = ExpensesActionTypes.EXPENSES_DELETED;

  constructor(public payload: { uuid: string }) {}
}

export class ExpensesError implements Action {
  readonly type = ExpensesActionTypes.EXPENSES_ERROR;

  constructor(public payload: { error: any }) {}
}

export type ExpensesActions =
  | ExpensesQuery
  | ExpensesLoaded
  | ExpensesAddQuery
  | ExpensesEdited
  | ExpensesDeleted
  | ExpensesError;
