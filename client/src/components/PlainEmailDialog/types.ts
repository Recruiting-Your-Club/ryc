export interface PlainEmailDialogProps {
    open: boolean;
    handleClose: () => void;
    handlePlainEmail: (subject: string, content: string) => void;
}
