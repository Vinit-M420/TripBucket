export type DeleteTripProps = {
  tripId: string | null;
//   toggleEditTrip: boolean;
  setToggleDeleteTrip: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  refreshTrips: () => Promise<void>;
};
