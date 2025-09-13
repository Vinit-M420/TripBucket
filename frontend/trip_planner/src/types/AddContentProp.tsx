export type AddContentProp = {
    tripId: string | undefined;
    toggleAddContent: boolean;
    setToggleAddContent: React.Dispatch<React.SetStateAction<boolean>>;
    refreshContent: () => Promise<void>;
    onClose: () => void, toggleAddTrip:boolean
}