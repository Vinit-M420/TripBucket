
export type ModalStore = {
    isEditTripOpen: boolean;    
    isDeleteTripOpen: boolean;

    editingTripId: string | null;
    deletingTripId: string | null;

    openEditTrip: (open: boolean, tripId: string | null) => void;
    openDeleteTrip: (open: boolean, tripId: string | null) => void;
}