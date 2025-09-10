export type NavbarState = 'hero' | 'signup' | 'login' | 'profile' | 'content' | "public";

export interface NavbarProps {
  navbarState: NavbarState;
  setNavbarState: React.Dispatch<React.SetStateAction<NavbarState>>
}
