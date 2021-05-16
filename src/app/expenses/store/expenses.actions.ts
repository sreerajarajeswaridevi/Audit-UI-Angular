import { Action } from '@ngrx/store';
import { Expenses } from '../models/expenses.model';

export enum ExpensesActionTypes {
  POOJAS_QUERY = '[Expenses] Query',
  POOJAS_LOADED = '[Expenses] Fetched',

  POOJAS_ADDED = '[Expenses] Added',
  POOJAS_EDITED = '[Expenses] Edited',
  POOJA_DELETE_QUERY = '[Expenses] Deleted',

  POOJAS_ERROR = '[Expenses] Error'
}

export class ExpensesQuery implements Action {
  readonly type = ExpensesActionTypes.POOJAS_QUERY;
}

export class ExpensesLoaded implements Action {
  readonly type = ExpensesActionTypes.POOJAS_LOADED;

  constructor(public payload: { Expenses: Expenses[] }) {}
}

export class ExpensesAdded implements Action {
  readonly type = ExpensesActionTypes.POOJAS_ADDED;

  constructor(public payload: { expenses: Expenses }) {}
}

export class ExpensesEdited implements Action {
  readonly type = ExpensesActionTypes.POOJAS_EDITED;

  constructor(public payload: { expenses: Expenses }) {}
}

export class ExpensesDeleted implements Action {
  readonly type = ExpensesActionTypes.POOJA_DELETE_QUERY;

  constructor(public payload: { expenses: Expenses }) {}
}

export class ExpensesError implements Action {
  readonly type = ExpensesActionTypes.POOJAS_ERROR;

  constructor(public payload: { error: any }) {}
}

export type ExpensesActions =
  | ExpensesQuery
  | ExpensesLoaded
  | ExpensesAdded
  | ExpensesEdited
  | ExpensesDeleted
  | ExpensesError;
