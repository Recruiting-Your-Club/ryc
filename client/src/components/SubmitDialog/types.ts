export interface SubmitDialogProps {
    open: boolean;
    isSubmitting: boolean;
    onConfirm: () => void;
    onClose: () => void;
}
