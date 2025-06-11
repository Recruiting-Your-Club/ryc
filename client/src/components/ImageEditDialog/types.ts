export interface ImageEditDialogProps {
    open: boolean;
    handleClose: () => void;
    imageSrc?: string;
    setImageSrc: (imageSrc: string) => void;
}
