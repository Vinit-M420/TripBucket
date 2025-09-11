import type { NavbarState } from './navbarstate';

export type TripContentType = {
    tripId: string | null;
    tripName: string | null;
    setNavbarState: (state: NavbarState) => void;
};
