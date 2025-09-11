export type NavbarState = 'hero' | 'signup' | 'login' | 'trip' | 'content' | "public" | "profile";

export interface NavbarProps {
  navbarState: NavbarState;
  setNavbarState: React.Dispatch<React.SetStateAction<NavbarState>>
}
