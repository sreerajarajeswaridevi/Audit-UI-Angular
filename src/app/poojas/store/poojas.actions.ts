import { Action } from '@ngrx/store';
import { Poojas } from '../models/poojas.model';

export enum PoojasActionTypes {
  POOJAS_QUERY = '[Poojas] Query',
  POOJAS_LOADED = '[Poojas] Fetched',

  POOJAS_ADDED = '[Poojas] Added',
  POOJAS_EDITED = '[Poojas] Edited',
  POOJAS_DELETED = '[Poojas] Deleted',

  POOJAS_ERROR = '[Poojas] Error'
}

export class PoojasQuery implements Action {
  readonly type = PoojasActionTypes.POOJAS_QUERY;
}

export class PoojasLoaded implements Action {
  readonly type = PoojasActionTypes.POOJAS_LOADED;

  constructor(public payload: { poojas: Poojas[] }) {}
}

export class PoojasAdded implements Action {
  readonly type = PoojasActionTypes.POOJAS_ADDED;

  constructor(public payload: { poojas: Poojas }) {}
}

export class PoojasEdited implements Action {
  readonly type = PoojasActionTypes.POOJAS_EDITED;

  constructor(public payload: { poojas: Poojas }) {}
}

export class PoojasDeleted implements Action {
  readonly type = PoojasActionTypes.POOJAS_DELETED;

  constructor(public payload: { poojas: Poojas }) {}
}

export class PoojasError implements Action {
  readonly type = PoojasActionTypes.POOJAS_ERROR;

  constructor(public payload: { error: any }) {}
}

export type PoojasActions =
  | PoojasQuery
  | PoojasLoaded
  | PoojasAdded
  | PoojasEdited
  | PoojasDeleted
  | PoojasError;
