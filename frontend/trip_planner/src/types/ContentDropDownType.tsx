export type ContentDropDownType = {
  tripId: string | undefined;
  contentId: number;
  toggleEditContent: boolean;
  setToggleEditContent: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDropdownId: React.Dispatch<React.SetStateAction<number | null>>;
  refreshContent: () => Promise<void>;
};