// import { Project } from 'src/app/projects/models/project.model';

export interface AdminState {
    usersList: any[];
    temples: any[];
    usersListLoading: boolean;
    templesListLoading: boolean;
    // userProjects: any;
    // userProjectsLoading: boolean;
    // userCustomers: any;
    // userCustomersLoading: boolean;
    // error: any;
}

export const adminInitialState: AdminState = {
    usersList: [],
    temples: [],
    usersListLoading: false,
    templesListLoading: false,
    // userProjects: {},
    // userProjectsLoading: false,
    // userCustomers: {},
    // userCustomersLoading: false,
    // error: null
};
