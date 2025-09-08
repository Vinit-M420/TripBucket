export type EditContentProp = {
    tripId: string;
    contentId: number | null;
    toggleEditContent: boolean;
    setToggleEditContent: React.Dispatch<React.SetStateAction<boolean>>;
    refreshContent: () => Promise<void>;
    onClose: () => void
}