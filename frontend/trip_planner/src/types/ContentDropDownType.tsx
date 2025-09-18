export type ContentDropDownType = {
  tripId: string | undefined;
  contentId: number;
  setOpenDropdownId: React.Dispatch<React.SetStateAction<number | null>>;
  refreshContent: () => Promise<void>;
};