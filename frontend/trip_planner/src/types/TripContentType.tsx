import type { NavbarState } from './navbarstate';

export type TripContentType = {
    tripId: string;
    tripName: string | null;
    setNavbarState: (state: NavbarState) => void;
};
