export type AlertState = 'edit' | 'delete' | 'shareurl' | 'coldstart' | null ;

export interface TypeOfAlertInt {
    typeOfAlert : AlertState;
    setTypeOfAlert: (state: AlertState) => void;
    
    toggleAlert: boolean;
    setToggleAlert: (alert: boolean) => void;
}