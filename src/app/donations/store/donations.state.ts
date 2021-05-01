import { Donations } from '../models/donations.model';

export interface DonationsState {
    donations: Donations[] | null;
    isLoading: boolean;
    error: any;
}

export const DonationsInitialState: DonationsState = {
    donations: null,
    isLoading: true,
    error: null
};