import { PoojaList, PoojaTypes } from '../models/poojas.model';

export interface PoojasState {
    poojaList: PoojaList[] | null;
    poojaTypes: PoojaTypes[] | null;
    isLoading: boolean;
    isListLoading: boolean;
    error: any;
}

export const PoojasInitialState: PoojasState = {
    poojaTypes: null,
    poojaList: null,
    isLoading: true,
    isListLoading: true,
    error: null
};
