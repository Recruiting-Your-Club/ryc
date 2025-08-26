export interface ErrorDialogProps {
    open: boolean;
    handleClose: () => void;
    errorStatusCode?: number;
    content?: string;
    subContent?: string;
}
