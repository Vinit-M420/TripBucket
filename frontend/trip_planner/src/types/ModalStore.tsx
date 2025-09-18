
export type ModalStore = {
    isEditTripOpen: boolean;    
    isDeleteTripOpen: boolean;
    isEditContentOpen: boolean;
   
    editingTripId: string | null;
    deletingTripId: string | null;
    // editingContentId: number | null;

    openEditTrip: (open: boolean, tripId: string | null) => void;
    openDeleteTrip: (open: boolean, tripId: string | null) => void;
    openEditContent: (open: boolean) => void;
}