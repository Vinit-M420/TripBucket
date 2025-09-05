export type NavbarState = 'hero' | 'signup' | 'login' | 'profile' | 'content';

export interface NavbarProps {
  navbarState: NavbarState;
  setNavbarState: React.Dispatch<React.SetStateAction<NavbarState>>
}
