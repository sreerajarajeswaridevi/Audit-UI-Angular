import { Action } from '@ngrx/store';
import { User } from 'src/app/auth/models/user.model';

export enum AdminActionTypes {
  GET_USERS_LIST = '[Admin] Get Users List',
  DELETE_USER = '[Admin] DELETE User',
  USERS_LIST_FETCHED = '[Admin] Users list fetched',
  ADD_USER = '[Admin] Add User',

  GET_TEMPLES = '[Admin] Get TEMPLES',
  TEMPLES_LOADED = '[Admin] TEMPLES loaded',
  DELETE_TEMPLES = '[Admin] Delete TEMPLES',
  ADD_TEMPLE_QUERY = '[Admin] Add TEMPLE Query',
  TEMPLE_ADDED = '[Admin] temple added',

  GET_USER_PROJECTS = '[Admin] Get user projects',
  USERS_PROJECTS_LOADED = '[Admin] User projects loaded',
  DELETE_USER_PROJECT = '[Admin] Delete user project',

  GET_USER_CUSTOMERS = '[Admin] Get user customers',
  USERS_CUSTOMERS_LOADED = '[Admin] User customers loaded',
  DELETE_USER_CUSTOMER = '[Admin] Delete user customer',

  ADD_ADMIN_PRIVILEGES = '[Admin] Add admin privileges',
  REMOVE_ADMIN_PRIVILEGES = '[Admin] Remove admin privileges',

  ADMIN_ERROR = '[Admin] Error'
}

export class GetUsersList implements Action {
  readonly type = AdminActionTypes.GET_USERS_LIST;
}

export class DeleteUser implements Action {
  readonly type = AdminActionTypes.DELETE_USER;
  
  constructor(public payload: { user: User }) {}
}

export class AddUser implements Action {
  readonly type = AdminActionTypes.ADD_USER;

  constructor(public payload: { user: User }) {}
}


export class GetTemples implements Action {
  readonly type = AdminActionTypes.GET_TEMPLES;
}

export class DeleteTemples implements Action {
  readonly type = AdminActionTypes.DELETE_TEMPLES;

  constructor(public payload: { templeId: string }) {}
}
export class AddTemple implements Action {
  readonly type = AdminActionTypes.ADD_TEMPLE_QUERY;
  
  constructor(public payload: { temple: any }) {}
}
// export class TempleAdded implements Action {
//   readonly type = AdminActionTypes.TEMPLE_ADDED;

//   constructor(public payload: { temple: any }) {}
// }
export class TemplesLoaded implements Action {
  readonly type = AdminActionTypes.TEMPLES_LOADED;

  constructor(public payload: { temples: any[] }) {}
}


export class UsersListFetched implements Action {
  readonly type = AdminActionTypes.USERS_LIST_FETCHED;

  constructor(public payload: { usersList: any[] }) {}
}

export class GetUserProjects implements Action {
  readonly type = AdminActionTypes.GET_USER_PROJECTS;

  constructor(public payload: { uid: string }) {}
}

export class DeleteUserProject implements Action {
  readonly type = AdminActionTypes.DELETE_USER_PROJECT;

  constructor(public payload: { userId: string, projectId: string}) {}
}

export class AdminError implements Action {
  readonly type = AdminActionTypes.ADMIN_ERROR;

  constructor(public payload: { error: any }) {}
}

export type AdminActions =
  | GetUsersList
  | DeleteUser
  | UsersListFetched
  | GetTemples
  | AddTemple
  // | TempleAdded
  | DeleteTemples
  | TemplesLoaded
  | AdminError
