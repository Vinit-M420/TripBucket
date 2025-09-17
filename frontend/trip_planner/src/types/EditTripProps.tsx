export type EditTripProps = {
  tripId: string | null;
  toggleEditTrip: boolean;
  setToggleEditTrip: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  refreshTrips: () => Promise<void>;
};
