import type { NavbarState } from './navbarstate';

export type YourTripsProps = {
    setNavbarState: (state: NavbarState) => void;
    setSelectedTripId: (id: string) => void;
    setSelectedTripName: (id: string) => void;
};
