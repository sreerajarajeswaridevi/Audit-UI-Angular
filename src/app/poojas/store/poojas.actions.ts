import { Action } from '@ngrx/store';
import { Poojas } from '../models/poojas.model';

export enum PoojasActionTypes {
  POOJAS_QUERY = '[Poojas] Query Pooja Types',
  POOJAS_LOADED = '[Poojas] Fetched Pooja Types',

  POOJAS_ADD_QUERY = '[Poojas] Add new Pooja Type',
  POOJAS_ADDED = '[Poojas] Added New Pooja Type',
  POOJAS_EDITED = '[Poojas] Edited Pooja Type',
  POOJA_DELETE_QUERY = '[Poojas] Delete Pooja Type',

  POOJAS_ERROR = '[Poojas] Error'
}

export class PoojasQuery implements Action {
  readonly type = PoojasActionTypes.POOJAS_QUERY;
}

export class PoojasLoaded implements Action {
  readonly type = PoojasActionTypes.POOJAS_LOADED;

  constructor(public payload: { poojas: Poojas[] }) {}
}

export class PoojasAddQuery implements Action {
  readonly type = PoojasActionTypes.POOJAS_ADD_QUERY;

  constructor(public payload: { poojas: any }) {}
}

export class PoojasEdited implements Action {
  readonly type = PoojasActionTypes.POOJAS_EDITED;

  constructor(public payload: { poojas: Poojas }) {}
}

export class PoojasDeleted implements Action {
  readonly type = PoojasActionTypes.POOJA_DELETE_QUERY;

  constructor(public payload: { pooja_code: string }) {}
}

export class PoojasError implements Action {
  readonly type = PoojasActionTypes.POOJAS_ERROR;

  constructor(public payload: { error: any }) {}
}

export class RegisterPooja implements Action {
  readonly type = PoojasActionTypes.POOJAS_ADD_QUERY;

  constructor(public payload: { poojas: any }) {}
}


export type PoojasActions =
  | PoojasQuery
  | PoojasLoaded
  | PoojasAddQuery
  | PoojasEdited
  | PoojasDeleted
  | RegisterPooja
  | PoojasError;
