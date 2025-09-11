export type AddContentProp = {
    tripId: string | null;
    toggleAddContent: boolean;
    setToggleAddContent: React.Dispatch<React.SetStateAction<boolean>>;
    refreshContent: () => Promise<void>;
    onClose: () => void, toggleAddTrip:boolean
}