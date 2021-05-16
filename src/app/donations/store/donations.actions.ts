import { Action } from '@ngrx/store';
import { Donations } from '../models/donations.model';

export enum DonationsActionTypes {
  POOJAS_QUERY = '[Donations] Query',
  POOJAS_LOADED = '[Donations] Fetched',

  POOJAS_ADDED = '[Donations] Added',
  POOJAS_EDITED = '[Donations] Edited',
  POOJA_DELETE_QUERY = '[Donations] Deleted',

  POOJAS_ERROR = '[Donations] Error'
}

export class DonationsQuery implements Action {
  readonly type = DonationsActionTypes.POOJAS_QUERY;
}

export class DonationsLoaded implements Action {
  readonly type = DonationsActionTypes.POOJAS_LOADED;

  constructor(public payload: { Donations: Donations[] }) {}
}

export class DonationsAdded implements Action {
  readonly type = DonationsActionTypes.POOJAS_ADDED;

  constructor(public payload: { donations: Donations }) {}
}

export class DonationsEdited implements Action {
  readonly type = DonationsActionTypes.POOJAS_EDITED;

  constructor(public payload: { donations: Donations }) {}
}

export class DonationsDeleted implements Action {
  readonly type = DonationsActionTypes.POOJA_DELETE_QUERY;

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
