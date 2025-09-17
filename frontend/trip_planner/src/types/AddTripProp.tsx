export type AddTripProp = {
    onClose: () => void, 
    refreshTrips: () => Promise<void>;
}