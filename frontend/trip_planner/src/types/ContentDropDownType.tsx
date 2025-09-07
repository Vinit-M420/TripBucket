export type ContentDropDownType = {
  tripId: string;
  contentId: number;
  setOpenDropdownId: React.Dispatch<React.SetStateAction<number | null>>;
  refreshContent: () => Promise<void>;
};
