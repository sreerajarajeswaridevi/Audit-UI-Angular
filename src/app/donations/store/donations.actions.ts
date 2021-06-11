import { Action } from '@ngrx/store';
import { Donations } from '../models/donations.model';

export enum DonationsActionTypes {
  POOJA_TYPE_QUERY = '[Donations] Query',
  POOJA_TYPE_LOADED = '[Donations] Fetched',

  POOJA_TYPE_ADDED = '[Donations] Added',
  POOJA_TYPE_EDITED = '[Donations] Edited',
  POOJA_TYPE_DELETED = '[Donations] Deleted',

  POOJAS_ERROR = '[Donations] Error'
}

export class DonationsQuery implements Action {
  readonly type = DonationsActionTypes.POOJA_TYPE_QUERY;
}

export class DonationsLoaded implements Action {
  readonly type = DonationsActionTypes.POOJA_TYPE_LOADED;

  constructor(public payload: { Donations: Donations[] }) {}
}

export class DonationsAdded implements Action {
  readonly type = DonationsActionTypes.POOJA_TYPE_ADDED;

  constructor(public payload: { donations: Donations }) {}
}

export class DonationsEdited implements Action {
  readonly type = DonationsActionTypes.POOJA_TYPE_EDITED;

  constructor(public payload: { donations: Donations }) {}
}

export class DonationsDeleted implements Action {
  readonly type = DonationsActionTypes.POOJA_TYPE_DELETED;

  constructor(public payload: { donations: Donations }) {}
}

export class DonationsError implements Action {
  readonly type = DonationsActionTypes.POOJAS_ERROR;

  constructor(public payload: { error: any }) {}
}

export type DonationsActions =
  | DonationsQuery
  | DonationsLoaded
  | DonationsAdded
  | DonationsEdited
  | DonationsDeleted
  | DonationsError;
