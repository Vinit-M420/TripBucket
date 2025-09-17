
export type DeleteTripProps = {
  tripId: string | null;
  setToggleDeleteTrip: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  refreshTrips: () => Promise<void>;
};