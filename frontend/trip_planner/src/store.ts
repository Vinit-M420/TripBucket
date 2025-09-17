import { create } from "zustand";
import type { NavbarProps, NavbarState } from "./types/navbarstate";
import type { TypeOfAlertInt, AlertState } from "./types/alertstate";
import type { ModalStore } from "./types/ModalStore";

export const useNavbarStore = create<NavbarProps>((set) => ({
    navbarState: (() => {
        const token = localStorage.getItem("token");
        return token ? "trip" : "hero";
    })(),
      setNavbarState: (state: NavbarState) => set({ navbarState: state }),

}));

export const useHidePassword = create<{
        hidePassword: boolean;
        setHidePassword: () => void }>((set) => 
    ({
        hidePassword: true,
        setHidePassword: () => set((state) => ({ hidePassword: !state.hidePassword }))
}));

export const useTypeofAlertStore = create<TypeOfAlertInt>((set) => ({
    typeOfAlert : null,
    toggleAlert: false,
    setTypeOfAlert: (state: AlertState) => set({ typeOfAlert : state  }),
    setToggleAlert: (alert: boolean) => set({ toggleAlert: alert })
}))


export const useToggleAddStore = create<{
    toggleAddTrip: boolean;
    toggleAddContent: boolean;
    setToggleAddTrip: (add: boolean) => void;
    setToggleAddContent: (add: boolean) => void;
}>((set) => ({
    toggleAddTrip: false,
    toggleAddContent: false,
    setToggleAddTrip: (add: boolean) => set({ toggleAddTrip: add }),
    setToggleAddContent: (add: boolean) => set({ toggleAddContent: add }),
}));

export const useModalStore = create<ModalStore>((set) => ({
    isEditTripOpen: false,   
    isDeleteTripOpen: false,
    
    editingTripId: null,
    deletingTripId: null,

    openEditTrip: (open: boolean, tripId: string | null) => set({ 
        isEditTripOpen: open,
        editingTripId: tripId 
    }),
    openDeleteTrip: (open: boolean, tripId: string | null) => set({ 
        isDeleteTripOpen: open,
        deletingTripId: tripId
    }),
}))