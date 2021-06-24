import { Action } from '@ngrx/store';
import { Donations } from '../models/donations.model';

export enum DonationsActionTypes {
  DONATIONS_QUERY = '[Donations] Query',
  DONATIONS_LOADED = '[Donations] Fetched',

  DONATIONS_ADD_QUERY = '[Donations] Added',
  DONATIONS_EDITED = '[Donations] Edited',
  DONATIONS_DELETED = '[Donations] Deleted',

  DONATIONS_ERROR = '[Donations] Error'
}

export class DonationsQuery implements Action {
  readonly type = DonationsActionTypes.DONATIONS_QUERY;

  constructor(public payload: { date: any }) {}
}

export class DonationsLoaded implements Action {
  readonly type = DonationsActionTypes.DONATIONS_LOADED;

  constructor(public payload: { donations: Donations[] }) {}
}

export class DonationsAddQuery implements Action {
  readonly type = DonationsActionTypes.DONATIONS_ADD_QUERY;

  constructor(public payload: { donations: Donations }) {}
}

export class DonationsEdited implements Action {
  readonly type = DonationsActionTypes.DONATIONS_EDITED;

  constructor(public payload: { donations: Donations }) {}
}

export class DonationsDeleted implements Action {
  readonly type = DonationsActionTypes.DONATIONS_DELETED;

  constructor(public payload: { uuid: string }) {}
}

export class DonationsError implements Action {
  readonly type = DonationsActionTypes.DONATIONS_ERROR;

  constructor(public payload: { error: any }) {}
}

export type DonationsActions =
  | DonationsQuery
  | DonationsLoaded
  | DonationsAddQuery
  | DonationsEdited
  | DonationsDeleted
  | DonationsError;
