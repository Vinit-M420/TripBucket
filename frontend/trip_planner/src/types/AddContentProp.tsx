export type AddContentProp = {
    toggleAddContent: boolean;
    tripId: string;
    setToggleAddContent: React.Dispatch<React.SetStateAction<boolean>>;
    refreshContent: () => Promise<void>;
    onClose: () => void, toggleAddTrip:boolean , 
}