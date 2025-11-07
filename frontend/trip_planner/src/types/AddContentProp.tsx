export type AddContentProp = {
    tripId: string | undefined;
    refreshContent: () => Promise<void>;
    onClose: () => void, 
    toggleAddTrip:boolean
}