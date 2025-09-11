export type ContentDropDownType = {
  tripId: string | null;
  contentId: number;
  toggleEditContent: boolean;
  setToggleAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleEditContent: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDropdownId: React.Dispatch<React.SetStateAction<number | null>>;
  refreshContent: () => Promise<void>;
};