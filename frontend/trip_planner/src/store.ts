import { create } from "zustand";
import type { NavbarProps, NavbarState } from "./types/navbarstate";
import type { TypeOfAlertInt, AlertState } from "./types/alertstate";

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