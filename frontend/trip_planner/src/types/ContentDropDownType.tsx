export type ContentDropDownType = {
  tripId: string;
  contentId: number;
  toggleEditContent: boolean;
  // setSelectedContentId: React.Dispatch<React.SetStateAction<number | null>>;
  setToggleEditContent: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDropdownId: React.Dispatch<React.SetStateAction<number | null>>;
  refreshContent: () => Promise<void>;
};