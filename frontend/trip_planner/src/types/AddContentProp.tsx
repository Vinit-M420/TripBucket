export type AddContentProp = {
    tripId: string;
    toggleAddContent: boolean;
    
    setToggleAddContent: React.Dispatch<React.SetStateAction<boolean>>;
    refreshContent: () => Promise<void>;
    onClose: () => void, toggleAddTrip:boolean
}