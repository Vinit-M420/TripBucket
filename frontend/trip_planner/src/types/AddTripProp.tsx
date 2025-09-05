export type AddTripProp = {
    onClose: () => void, toggleAddTrip:boolean , 
    setToggleAddTrip: React.Dispatch<React.SetStateAction<boolean>>;
    refreshTrips: () => Promise<void>;
}