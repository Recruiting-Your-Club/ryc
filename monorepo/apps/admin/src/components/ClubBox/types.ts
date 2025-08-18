export interface ClubBoxItem {
    id: string;
    title: string;
    content: string;
}
export interface ClubBoxProps {
    data?: ClubBoxItem[];
    isEditMode?: boolean;
    onDataChange?: (updatedData: ClubBoxItem[]) => void;
    onAddItem?: () => void;
    onDeleteItem?: (id: string) => void;
}
