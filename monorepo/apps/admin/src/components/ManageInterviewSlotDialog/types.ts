import type { SelectedInterviewSlot } from '@pages/InterviewSchedulePage/types';

export interface ManageInterviewSlotDialogProps {
    mode: 'delete' | 'edit';
    open: boolean;
    handleClose: () => void;
    handlePatchInterviewSlotPeople: (maxPeopleCount: number) => Promise<boolean>;
    handleDeleteInterviewSlot: () => Promise<boolean>;
    selectedInterviewSlot: SelectedInterviewSlot;
}
