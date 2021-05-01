import { Poojas } from '../models/poojas.model';

export interface PoojasState {
    poojas: Poojas[] | null;
    isLoading: boolean;
    error: any;
}

export const PoojasInitialState: PoojasState = {
    poojas: null,
    isLoading: true,
    error: null
};
