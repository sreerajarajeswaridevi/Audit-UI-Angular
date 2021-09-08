import { Action } from '@ngrx/store';
import { PoojaList, PoojaList as Poojas } from '../models/poojas.model';

export enum PoojasActionTypes {
  POOJA_TYPE_QUERY = '[Pooja Type] Query Pooja Types',
  POOJA_TYPE_LOADED = '[Pooja Type] Fetched Pooja Types',
  POOJA_TYPE_ADD_QUERY = '[Pooja Type] Add new Pooja Type',
  POOJA_TYPE_ADDED = '[Pooja Type] Added New Pooja Type',
  POOJA_TYPE_EDITED = '[Pooja Type] Edited Pooja Type',
  POOJA_TYPE_DELETED = '[Pooja Type] Delete Pooja Type',

  POOJA_LIST_QUERY = '[Pooja Type] Query Pooja List',
  POOJA_LIST_LOADED = '[Pooja Type] Query Pooja Loaded',
  POOJA_REGISTERED = '[Pooja Type] New Pooja Registered',
  POOJA_ADD_QUERY = '[Pooja] Add new Pooja',
  POOJA_ADDED = '[Pooja] Added New Pooja',
  POOJA_DELETED = '[Pooja] Delete Pooja',

  POOJAS_ERROR = '[Poojas] Error'
}

export class PoojasTypeQuery implements Action {
  readonly type = PoojasActionTypes.POOJA_TYPE_QUERY;
}

export class PoojaTypesLoaded implements Action {
  readonly type = PoojasActionTypes.POOJA_TYPE_LOADED;

  constructor(public payload: { poojas: Poojas[] }) {}
}

export class PoojaTypeAddQuery implements Action {
  readonly type = PoojasActionTypes.POOJA_TYPE_ADD_QUERY;

  constructor(public payload: { poojas: any }) {}
}

export class PoojaTypeEdited implements Action {
  readonly type = PoojasActionTypes.POOJA_TYPE_EDITED;

  constructor(public payload: { poojas: Poojas }) {}
}

export class PoojaTypeDeleted implements Action {
  readonly type = PoojasActionTypes.POOJA_TYPE_DELETED;

  constructor(public payload: { pooja_code: string }) {}
}

export class PoojasError implements Action {
  readonly type = PoojasActionTypes.POOJAS_ERROR;

  constructor(public payload: { error: any }) {}
}

export class RegisterPooja implements Action {
  readonly type = PoojasActionTypes.POOJA_ADD_QUERY;

  constructor(public payload: { pooja: any }) {}
}

export class PoojaListQuery implements Action {
  readonly type = PoojasActionTypes.POOJA_LIST_QUERY;

  constructor(public payload: { date: any }) {}
}

export class PoojaListLoaded implements Action {
  readonly type = PoojasActionTypes.POOJA_LIST_LOADED;

  constructor(public payload: { poojaList: PoojaList[] }) {}
}

export class PoojaRegistered implements Action {
  readonly type = PoojasActionTypes.POOJA_REGISTERED;

  constructor(public payload: { response: any }) {}
}


export type PoojasActions =
  | PoojasTypeQuery
  | PoojaTypesLoaded
  | PoojaTypeAddQuery
  | PoojaTypeEdited
  | PoojaTypeDeleted
  | RegisterPooja
  | PoojaRegistered
  | PoojaListQuery
  | PoojaListLoaded
  | PoojasError;
